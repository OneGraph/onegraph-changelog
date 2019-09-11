// @flow

import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import {createFragmentContainer} from 'react-relay';
import {Box, Heading} from 'grommet';
import Link from './PreloadLink';
import {titleCase} from 'change-case';
import PageContext from './PageContext';

import type {Header_repository} from './__generated__/Header_repository.graphql';

const Header = ({repository}: {repository: Header_repository}) => {
  const title = titleCase(repository.name);
  const avatarUrl = repository.owner.avatarUrl;
  const description = repository.description;
  const {setTitle, setFavicon, setDescription} = React.useContext(PageContext);

  setTitle(title);
  setFavicon(avatarUrl);
  description && setDescription(description);

  return (
    <Box
      gridArea="header"
      direction="row"
      align="center"
      justify="between"
      pad={{horizontal: 'medium', vertical: 'medium'}}
      wrap={true}>
      <Box align="center" direction="row">
        <img
          src={avatarUrl}
          style={{
            width: '72px',
            height: '72px',
            marginRight: 18,
            borderRadius: '50%',
          }}
        />
        <Heading level={2}>
          <Link
            style={{color: 'inherit'}}
            to={`/${repository.owner.login}/${repository.name}`}>
            {title}
          </Link>
        </Heading>
      </Box>
    </Box>
  );
};

export default createFragmentContainer(Header, {
  repository: graphql`
    fragment Header_repository on GitHubRepository {
      name
      description
      owner {
        avatarUrl(size: 192)
        login
      }
    }
  `,
});
