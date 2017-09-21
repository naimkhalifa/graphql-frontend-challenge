import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import App from './components/App';

const networkInterface = createNetworkInterface({
  uri: 'https://qwmk4njvp.lp.gql.zone/graphql'
});

const client = new ApolloClient({ networkInterface });

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
};

ReactDOM.render(<Root />, document.getElementById('root'));
