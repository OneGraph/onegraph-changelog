import React from 'react';
import {Anchor, Box, Heading, Text, Paragraph} from 'grommet';
import PageContext from './PageContext';
import PreloadLink from './PreloadLink';

function P(props) {
  return <Paragraph fill style={{fontSize: 16}} {...props} />;
}

export default function Home(props: any) {
  const {setTitle, setFavicon} = React.useContext(PageContext);
  setTitle('OneBlog—Build a Blog on top of GitHub Issues');
  setFavicon('/favicon-32x32.png');
  return (
    <Box pad={{horizontal: 'medium'}} margin="medium" style={{maxWidth: 704}}>
      <Heading level={2}>
        GitHub Issues as the Ideal Publishing Platform?
      </Heading>

      <P>
        We wanted to build a product changelog to tell our customers about
        updates to{' '}
        <Anchor href="https://onegraph.com" target="_blank">
          OneGraph
        </Anchor>
        . We started listing some of the features it should have.
      </P>
      <P>We needed</P>
      <Text style={{fontSize: 16}}>
        <ul>
          <li>
            a familiar authoring interface that would allow us to quickly get
            our thoughts on paper
          </li>
          <li>
            everyone on the team to be able to easily create posts and make
            edits
          </li>
          <li>
            multiple authors on the post, to show off everyone who worked on a
            feature
          </li>
          <li>
            reactions and comments, so our users could tell us what they thought
            of new features
          </li>
        </ul>
      </Text>

      <P>
        It started to seem like a lot of work, but then we realized that GitHub
        issues have all of the features we want. As software engineers, we
        couldn't be more familiar with the interface, it supports markdown and
        images, anybody on the team can create and edit them, it has reactions
        and comments, and we can even "assign" an issue to multiple people to
        indicate who worked on a new feature.
      </P>
      <P>
        The result is{' '}
        <Anchor target="_blank" href="https://www.onegraph.com/changelog">
          onegraph.com/changelog
        </Anchor>
        , backed by the GitHub issues on{' '}
        <Anchor
          target="_blank"
          rel="noreferrer nofollow"
          href="https://github.com/onegraph/onegraph-changelog/issues?utf8=✓&q=is%3Aissue+label%3Apublish+">
          onegraph/onegraph-changelog
        </Anchor>
        .
      </P>
      <P>
        <img style={{maxWidth: '100%'}} src="/changelog_screenshot.png" />
      </P>
      <Heading level={4}>Try it out with your repo</Heading>
      <P>
        This site is set up to create a blog from the GitHub issues on any repo.
        Just replace github.com in your repo's url with oneblog.web.app. For
        example,{' '}
        <Anchor href="/onegraph/onegraph-changelog">
          https://github.com/onegraph/onegraph-changelog
        </Anchor>{' '}
        maps to{' '}
        <Anchor href="/onegraph/onegraph-changelog">
          https://oneblog.web.app/onegraph/onegraph-changelog
        </Anchor>
      </P>

      <P style={{display: 'flex', justifyContent: 'center'}}>
        <video
          src="/example.mp4"
          controls
          width="404px"
          height="720px"
          style={{maxWidth: '100%'}}
        />
      </P>

      <P>
        To prevent just anyone from publishing new posts on your repo, only
        issues with a "Publish" tag appear on the site. You need to have write
        access to a repo to add tags, so only contributors can add new posts.
      </P>

      <Heading level={4}>Examples</Heading>
      <Text style={{fontSize: 16}}>
        <ul>
          <li>
            <PreloadLink to="/onegraph/onegraph-changelog">
              OneGraph's Product Changelog
            </PreloadLink>
          </li>
        </ul>
      </Text>
      <P>
        Send a note to{' '}
        <a href="mailto:oneblog@onegraph.com">oneblog@onegraph.com</a> and we'll
        include you in the list of examples.
      </P>

      <P>
        You can also email us at{' '}
        <a href="mailto:oneblog@onegraph.com">oneblog@onegraph.com</a> if you
        want to move the blog to your own domain.
      </P>
      <Heading level={4}>How it works</Heading>
      <P>
        The site is powered by <Anchor href="https://relay.dev">Relay</Anchor>,
        a GraphQL client with great support for persisted queries. We rely on
        OneGraph's persisted GraphQL queries to fetch data from GitHub because
        it supports attaching an auth to the query. Without the ability to
        attach an auth, we would have to require users to log in to GitHub to
        see the posts.
      </P>
      <P>
        The persisted queries also limit the data that logged-out users can
        fetch from GitHub. In this case, they can only access issues on a
        particular repo.
      </P>
      <P>
        View the code at{' '}
        <Anchor href="https://github.com/OneGraph/onegraph-changelog">
          OneGraph/onegraph-changelog
        </Anchor>{' '}
        on GitHub.
      </P>
    </Box>
  );
}
