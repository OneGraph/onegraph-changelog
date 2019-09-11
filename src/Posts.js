// @flow

import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import {createPaginationContainer, type RelayProp} from 'react-relay';
import Post, {PostBox} from './Post';
import type {Posts_repository} from './__generated__/Posts_repository.graphql';
import LoadingSpinner from './loadingSpinner';
import idx from 'idx';
import {Box, Text, Heading, Paragraph, Anchor} from 'grommet';
import GitHubLoginButton from './GitHubLoginButton';
import UserContext from './UserContext';

type Props = {|
  relay: RelayProp,
  repository: Posts_repository,
|};

// TODO: pagination. Can do pages or infinite scroll
const Posts = ({relay, repository}: Props) => {
  const {login, isLoggedIn} = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const scheduledRef = React.useRef(false);
  const handleScroll = React.useCallback(() => {
    if (!scheduledRef.current) {
      scheduledRef.current = true;
      window.requestAnimationFrame(() => {
        scheduledRef.current = false;
        if (
          window.innerHeight +
            idx(document, _ => _.documentElement.scrollTop) >=
          (idx(document, _ => _.documentElement.offsetHeight) || 0) - 500
        ) {
          if (!isLoading && !relay.isLoading() && relay.hasMore()) {
            setIsLoading(true);
            relay.loadMore(10, x => {
              setIsLoading(false);
            });
          }
        }
      });
    }
  }, [relay, isLoading, setIsLoading]);
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const posts = repository.issues.edges || [];

  if (!posts.length) {
    return (
      <PostBox>
        <Box pad="medium">
          <Heading level={3}>
            There are no posts for {repository.nameWithOwner}...
          </Heading>
          <Text size="small">
            <p>
              ...but you can change that if you are a collaborator on the repo!
            </p>
            <p>
              This blog is built on GitHub issues. It automatically pulls any
              issue from the{' '}
              <Anchor
                rel="noopener noreferrer"
                target="_blank"
                href={repository.url}>
                {repository.nameWithOwner}
              </Anchor>{' '}
              repo that has a <code>publish</code> tag.
            </p>
            <p>
              <Anchor
                rel="noopener noreferrer"
                target="_blank"
                href={`https://github.com/${repository.nameWithOwner}/issues/new`}>
                Create a new issue
              </Anchor>
              , give it the <code>publish</code> tag, then come back here and
              refresh to see your new blog post.
            </p>
            <p>
              We provide a default GitHub auth that caches requests to avoid
              rate limits.{' '}
              {isLoggedIn
                ? "You're logged in with GitHub, so your requests will bypass the cache."
                : 'You can log in with your GitHub credentials to bypass the cache.'}
            </p>
            {isLoggedIn ? null : (
              <p>
                <GitHubLoginButton onClick={login} />
              </p>
            )}
          </Text>
        </Box>
      </PostBox>
    );
  }

  return (
    <Box>
      {posts.map(e =>
        e && e.node ? <Post key={e.node.id} post={e.node} /> : null,
      )}
      {isLoading ? (
        <Box
          align="center"
          margin="medium"
          style={{
            maxWidth: 704,
          }}>
          <LoadingSpinner width="48px" height="48px" />
        </Box>
      ) : null}
    </Box>
  );
};

export default createPaginationContainer(
  Posts,
  {
    repository: graphql`
      fragment Posts_repository on GitHubRepository
        @argumentDefinitions(
          count: {type: "Int", defaultValue: 10}
          cursor: {type: "String"}
          orderBy: {
            type: "GitHubIssueOrder"
            defaultValue: {direction: DESC, field: CREATED_AT}
          }
        ) {
        nameWithOwner
        url
        issues(
          first: $count
          after: $cursor
          orderBy: $orderBy
          labels: ["publish", "Publish"]
        ) @connection(key: "Posts_posts_issues") {
          edges {
            node {
              id
              ...Post_post
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.repository && props.repository.issues;
    },
    getVariables(props, {count, cursor}, fragmentVariables) {
      return {
        repo: props.repository.name,
        owner: props.repository.owner.login,
        count: count,
        cursor,
        orderBy: fragmentVariables.orderBy,
      };
    },

    query: graphql`
      query PostsPaginationQuery(
        $repo: String!
        $owner: String!
        $count: Int!
        $cursor: String
        $orderBy: GitHubIssueOrder
      )
        @persistedQueryConfiguration(
          accessToken: {environmentVariable: "OG_GITHUB_TOKEN"}
        ) {
        gitHub {
          repository(name: $repo, owner: $owner) {
            ...Posts_repository
              @arguments(count: $count, cursor: $cursor, orderBy: $orderBy)
          }
        }
      }
    `,
  },
);
