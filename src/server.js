// @flow

import App, {routes} from './App';
import React from 'react';
import {StaticRouter, matchPath} from 'react-router-dom';
import {ServerStyleSheet} from 'styled-components';
import express from 'express';
import {renderToString} from 'react-dom/server';
import {fetchQuery} from 'react-relay';
import {createEnvironment} from './Environment';
import serialize from 'serialize-javascript';
import {RecordSource} from 'relay-runtime';
import RelayQueryResponseCache from './relayResponseCache';
import {buildFeed} from './RssFeed';
import {titleCase} from 'change-case';
import PageContext from './PageContext';

// $FlowFixMe
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

function buildHtml({
  markup,
  styleTags,
  bootstrapData,
  repo,
  owner,
  pageContext,
}) {
  const basePath = repo && owner ? escapeHtml(`/${repo}/${owner}`) : null;
  const bootstrapScript = bootstrapData
    ? `<script>
    window.__RELAY_BOOTSTRAP_DATA__ = JSON.parse(${serialize(
      JSON.stringify(bootstrapData),
      {isJSON: true},
    )})
  </script>`
    : '';
  return `<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="utf-8" />
    ${
      pageContext.favicon
        ? `<link type="image/x-icon" rel="shortcut icon" href="${escapeHtml(
            pageContext.favicon,
          )}" />`
        : `<link type="image/x-icon" rel="shortcut icon" href="/favicon.ico" />`
    }
    ${
      basePath
        ? `<link rel="alternate" type="application/rss+xml" 
          title="RSS Feed" 
          href="${basePath}/feed.rss" />
    <link rel="alternate" 
          href="${basePath}/feed.atom" 
          title="Atom feed" 
          type="application/atom+xml" />`
        : ''
    }
    

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>${escapeHtml(pageContext.title ? pageContext.title : '')}</title>
    ${styleTags ? styleTags : ''}
    ${
      assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
    }
    ${
      process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`
    }
  </head>
  <body>
    <div id="root">${markup ? markup : ''}</div>
    <script>window.__basename__ = '/';</script>
    ${bootstrapScript ? bootstrapScript : ''}
  </body>
</html>`;
}

const SUPPORTED_FEED_EXTENSIONS = ['rss', 'atom', 'json'];

function createApp(basePath: ?string) {
  const appRouter = express.Router();
  appRouter
    .get('/:owner/:repo/feed.:extension', async (req, res) => {
      const {owner, repo, extension} = req.params;
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      if (!SUPPORTED_FEED_EXTENSIONS.includes(extension)) {
        res
          .status(404)
          .send('Unknown feed URL. Try feed.json, feed.rss, or feed.atom');
        return;
      }

      const feed = await buildFeed({owner, repo, baseUrl});
      if (!feed) {
        res.sendStatus(404);
      } else {
        const body =
          extension === 'rss'
            ? feed.rss2()
            : extension === 'atom'
            ? feed.atom1()
            : feed.json1();
        res.set('Cache-Control', 'public, max-age=300, s-maxage=300');
        res.set(
          'Content-Type',
          extension === 'json' ? 'application/json' : 'application/xml',
        );
        res.status(200).send(body);
      }
    })
    .get('/:owner?/:repo?/*', async (req, res) => {
      const {repo, owner} = req.params;
      const pageContext = {};
      try {
        res.set('Cache-Control', 'public, max-age=300, s-maxage=300');
        const recordSource = new RecordSource();
        const cache = new RelayQueryResponseCache({
          size: 250,
          ttl: 1000 * 60 * 10,
        });
        const environment = createEnvironment(recordSource, cache);

        // Prep cache
        for (const routeConfig of routes) {
          const match = matchPath(req.path, routeConfig);
          if (match) {
            // Makes relay put result of the query into the record store
            await fetchQuery(
              environment,
              routeConfig.query,
              routeConfig.getVariables(match),
            );
            break;
          }
        }

        const sheet = new ServerStyleSheet();
        const context = {};

        const markup = renderToString(
          sheet.collectStyles(
            <StaticRouter context={context} location={req.url}>
              <PageContext.Provider
                value={{
                  setTitle: title => {
                    pageContext.title = title;
                  },
                  setFavicon: url => {
                    pageContext.favicon = url;
                  },
                  setDescription: text => {
                    pageContext.description = text;
                  },
                }}>
                <App environment={environment} />
              </PageContext.Provider>
            </StaticRouter>,
          ),
        );
        const styleTags = sheet.getStyleTags();
        if (context.url) {
          res.redirect(context.url);
        } else {
          res.status(200).send(
            buildHtml({
              markup,
              styleTags,
              bootstrapData: recordSource.toJSON(),
              repo,
              owner,
              pageContext,
            }),
          );
        }
      } catch (e) {
        console.error(e);
        res.status(200).send(
          buildHtml({
            markup: null,
            styleTags: null,
            bootstrapData: null,
            basePath,
            repo,
            owner,
            pageContext,
          }),
        );
      }
    });

  const server = express();
  return server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .use(basePath || '/', appRouter);
}

function escapeHtml(str: string): string {
  const match = /["'&<>]/.exec(str);

  if (!match) {
    return str;
  }

  let escape;
  let html = '';
  let index = 0;
  let lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}

export default createApp;
