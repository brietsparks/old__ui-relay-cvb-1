import React from 'react';
import { gql, graphql } from 'react-apollo';

import ProjectList from './ProjectList';
import ContributionList from './ContributionList';

export class Project extends React.Component {

  constructor() {
    super();

    this.state = {
      title: '',
      summary: ''
    }
  }

  componentWillMount() {
    this.setState({
      'title': this.props.title || '',
      'summary': this.props.summary || ''
    });
  }

  render() {
    console.log(this);

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
        <button onClick={() => props.removeProject(props.uuid)}>Remove</button>
        <h3>
          Title:
          {/*{this.props.title}*/}
          <input value={this.state.title} onChange={this.handleChange.bind(this,'title')} />
        </h3>
        <p>
          Summary:
          {/*{this.props.summary}*/}
          <input value={this.state.summary} onChange={this.handleChange.bind(this,'summary')} />
        </p>


        { contributions ? <h4>Contributions</h4> : null }
        { contributions }

        { childProjects ? <h4>Projects</h4> : null }
        { childProjects }
      </div>
    );
  }

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

  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  handleRemove() {
    this.props.removeProject({variables: {projectId: this.props.project.id}})
      .then(this.props.afterChange)
  }

}

const removeProject = gql`
  mutation removeProject($projectId: ID!) {
    removeProject(projectId: $projectId)
  }
`;

export const ProjectWithData = graphql(removeProject, {
  props: ({ mutate }) => ({
    removeProject: (projectId) => mutate({variables: { projectId }})
  })
})(Project);