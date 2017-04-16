import React from 'react';
import { gql, graphql } from 'react-apollo';

import Project from './Project';


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
      ${Project.fragments.ProjectFields}
    `
  };

  render() {

    const projects = this.props.projects.map(project => {
      console.log(project);
      return <Project {...project} key={project.uuid} />
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