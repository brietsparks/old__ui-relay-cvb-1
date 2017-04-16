import React from 'react';
import { gql, graphql } from 'react-apollo';

import ProjectList from './ProjectList';
import ContributionList from './ContributionList';

export default class Project extends React.Component {

  static fragments = {
    ProjectFields: gql`
      fragment ProjectFields on Project {
        uuid
        title,
        summary,
        ... ContributionList
      }
      ${ContributionList.fragments.contributionList}
    `
  };

  render() {
    console.log(this.props);

    const props = this.props;

    const childProjects = props.childProjects ?
      <ProjectList projects={props.childProjects} /> : null;

    const contributions = props.contributions ?
      <ContributionList contributions={props.contributions} /> : null;

    const style = {
      border: 'solid 1px',
      padding: '20px'
    };

    return (
      <div style={style}>
        <h3>Title: {props.title}</h3>
        <p>Summary: {props.summary}</p>

        { contributions ? <h4>Contributions</h4> : null }
        { contributions }

        { childProjects ? <h4>Projects</h4> : null }
        { childProjects }
      </div>
    );
  }

}