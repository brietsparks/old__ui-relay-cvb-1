import React from 'react';
import ReactDom from 'react-dom';

import { createNetworkInterface } from 'react-apollo';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import { ProfileWithData } from './components/Profile';

const uri = 'http://localhost:8000/graphql';

const client = new ApolloClient({
  dataIdFromObject: o => o.uuid,
  networkInterface: createNetworkInterface({
    uri: uri,
  }),
});

ReactDom.render(
  <ApolloProvider client={client}>
    <ProfileWithData uuid="1b0fc480-3a83-4531-9207-35a53ae1dfa4"/>
  </ApolloProvider>,
  document.getElementById('app')
);
