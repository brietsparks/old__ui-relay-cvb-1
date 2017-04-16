import React from 'react';
import { gql, graphql } from 'react-apollo';

import ProjectList from './ProjectList';

export class Profile extends React.Component {

  render() {

    const data = this.props.data;

    console.log(data);

    const projects = data.profile ?
      <ProjectList projects={data.profile.projects} /> : null;

    return (
      <div>
        {projects}
      </div>
    );
  }
}

const ProfileData = gql`
  query CurrentProfile($uuid: ID!) {
    profile (id: $uuid) {
      uuid,
      ... ProjectTrees
    }
  }
  ${ProjectList.fragments.ProjectTrees}
`;

export const ProfileWithData = graphql(ProfileData, {
  options: ({ uuid }) => ({ variables: { uuid } })
})(Profile);