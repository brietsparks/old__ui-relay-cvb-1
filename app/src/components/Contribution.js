import React from 'react';
import { gql, graphql } from 'react-apollo';

export default class Contribution extends React.Component {

  static fragments = {
    contributionFields: gql`
      fragment ContributionFields on Contribution {
        uuid,
        title,
        summary
      }
    `
  };

  render() {
    const props = this.props;

    const style = {
      border: 'solid 1px',
      padding: '20px'
    };

    return (
      <div style={style}>
        <h4>Title: {props.title}</h4>
        <p>Summary: {props.summary}</p>
      </div>
    );
  }

}