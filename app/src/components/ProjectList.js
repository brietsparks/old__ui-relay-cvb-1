import React from 'react';
import { gql, graphql } from 'react-apollo';

import { ProjectWithData } from './Project';


export default class ProjectList extends React.Component {

  static fragments = {
    ProjectTrees: gql`
      fragment ProjectTrees on Profile {
        projects {
          ... ProjectFields,
          childProjects {
            ... ProjectFields
          }
        }
      }
      ${ProjectWithData.fragments.ProjectFields}
    `
  };

  render() {

    const projects = this.props.projects.map(project => {
      // console.log(project);
      return <ProjectWithData {...project} key={project.uuid} />
    });

    const style = {
      marginLeft: '20px'
    };

    return (
      <div style={style}>
        {projects}
      </div>
    );
  }

}