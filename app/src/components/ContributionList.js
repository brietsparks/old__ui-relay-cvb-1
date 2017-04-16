import React from 'react';
import { gql, graphql } from 'react-apollo';

import Contribution from './Contribution';

export default class ContributionList extends React.Component {

  static fragments = {
    contributionList: gql`
      fragment ContributionList on Project {
        contributions {
          ... ContributionFields
        }
      }
      ${Contribution.fragments.contributionFields}
    `
  };

  render() {
    const contributions = this.props.contributions.map(contribution => {
      console.log(contribution);
      return <Contribution {...contribution} key={contribution.uuid} />
    });

    const style = {
      marginLeft: '20px'
    };

    return (
      <div style={style}>
        {contributions}
      </div>
    );
  }

}