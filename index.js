/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import Amplify from "aws-amplify";
import awsConfig from "./src/aws-exports";

Amplify.configure({
  ...awsConfig,
  Analytics: {
    disabled: true,
  },
});

import React, { useEffect, useState } from "react";
import { AWSAppSyncClient } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { Auth } from "aws-amplify";
import { ApolloProvider } from "react-apollo";

// const client = new AWSAppSyncClient({
//   url: awsConfig.aws_appsync_graphqlEndpoint,
//   region: awsConfig.aws_appsync_region,
//   auth: {
//     type: awsConfig.aws_appsync_authenticationType,
//     jwtToken: async () =>
//       await Auth.currentSession().then((res) => {
//         if (res && res.idToken && res.idToken.jwtToken) {
//           return res.idToken.jwtToken;
//         }
//       }),
//   },
// });

const AppWithProvider = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const jwtToken = await Auth.currentSession().then((res) => {
      if (res && res.idToken && res.idToken.jwtToken) {
        return res.idToken.jwtToken;
      }
    });
    const _client = new AWSAppSyncClient({
      url: awsConfig.aws_appsync_graphqlEndpoint,
      region: awsConfig.aws_appsync_region,
      auth: {
        type: awsConfig.aws_appsync_authenticationType,
        jwtToken,
      },
    });

    setClient(_client);
  };
  return (
    // <ApolloProvider client={client}>
    //   <App />
    // </ApolloProvider>
    client ? (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    ) : null
  );
};

AppRegistry.registerComponent(appName, () => AppWithProvider);
