// @flow

import {Feed} from 'feed';
import idx from 'idx';
import graphql from 'babel-plugin-relay/macro';
import {environment} from './Environment';
import {fetchQuery} from 'react-relay';
import {titleCase} from 'change-case';

import type {RssFeed_QueryResponse} from './__generated__/RssFeed_Query.graphql';

const feedQuery = graphql`
  query RssFeed_Query($owner: String!, $repo: String!)
    @persistedQueryConfiguration(
      accessToken: {environmentVariable: "OG_GITHUB_TOKEN"}
    ) {
    gitHub {
      repository(name: $repo, owner: $owner) {
        name
        nameWithOwner
        owner {
          avatarUrl
        }
        issues(
          first: 20
          orderBy: {direction: DESC, field: CREATED_AT}
          labels: ["publish", "Publish"]
        ) {
          nodes {
            id
            number
            title
            bodyHTML
            createdAt
            assignees(first: 10) {
              nodes {
                id
                name
                url
              }
            }
          }
        }
      }
    }
  }
`;

export async function buildFeed({
  owner,
  repo,
  baseUrl,
}: {
  owner: string,
  repo: string,
  baseUrl: string,
}) {
  const data: RssFeed_QueryResponse = await fetchQuery(environment, feedQuery, {
    owner,
    repo,
  });

  const repository = idx(data, _ => _.gitHub.repository);

  if (!repository) {
    return null;
  }
  const posts = idx(data, _ => _.gitHub.repository.issues.nodes) || [];
  const latestPost = posts[0];

  const feed = new Feed({
    title: titleCase(repository.name),
    description:
      'Keep up to date with the latest product features from OneGraph',
    id: `${baseUrl}/${repository.nameWithOwner}`,
    link: `${baseUrl}/${repository.nameWithOwner}`,
    language: 'en',
    image: repository.owner.avatarUrl,
    favicon: repository.owner.avatarUrl,
    updated: latestPost ? new Date(latestPost.createdAt) : null,
    generator: '',
    feedLinks: {
      json: `${baseUrl}/${repository.nameWithOwner}/feed.json`,
      atom: `${baseUrl}/${repository.nameWithOwner}/feed.atom`,
      rss2: `${baseUrl}/${repository.nameWithOwner}/feed.rss`,
    },
  });

  for (const post of posts) {
    if (post) {
      feed.addItem({
        title: post.title,
        id: post.id,
        link: `${baseUrl}/${repository.nameWithOwner}/post/${post.number}`,
        content: post.bodyHTML,
        author: (post.assignees.nodes || []).map(node =>
          node
            ? {
                name: node.name,
                link: node.url,
              }
            : null,
        ),
        date: new Date(post.createdAt),
      });
    }
  }
  return feed;
}
