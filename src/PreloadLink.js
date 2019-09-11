// @flow

import React from 'react';
import {Link, matchPath} from 'react-router-dom';
import {routes} from './App';
import {fetchQuery} from 'react-relay';
import {environment} from './Environment';

async function runQueryForLink(to) {
  for (const routeConfig of routes) {
    const match = matchPath(to, routeConfig);
    if (match) {
      // Puts the query into the store
      fetchQuery(
        environment,
        routeConfig.query,
        routeConfig.getVariables(match),
      );
      break;
    }
  }
}

export default function PreloadLink(props: any) {
  const preload = () => {
    runQueryForLink(props.to);
  };
  return <Link onClick={preload} onMouseOver={preload} {...props} />;
}
