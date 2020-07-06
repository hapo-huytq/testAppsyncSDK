/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { withAuthenticator } from "aws-amplify-react-native";
import { graphql, compose } from "react-apollo";
import { buildSubscription } from "aws-appsync";
// import { listTodos } from "./src/graphql/queries";
// import { createTodo } from "./src/graphql/mutations";
import { onCreateTodo } from "./src/graphql/subscriptions";
import { graphqlMutation } from "aws-appsync-react";
import gql from "graphql-tag";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

const listTodos = gql`
  query ListTodos {
    listTodos {
      items {
        id
        name
      }
    }
  }
`;

let CreateTodo = gql`
  mutation createTodo($name: String!) {
    createTodo(input: { name: $name }) {
      id
      name
      description
      status
      createdAt
      updatedAt
    }
  }
`;

const TodoSubscription = gql`
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      status
      createdAt
      updatedAt
    }
  }
`;

const errorHandler = (e, isFatal) => {
  Alert.alert(
    "Unexpected error",
    `
    Error:${isFatal ? "Fatal:" : ""} ${e.name} ${e.message}
    XXXCVXCV
    `,
    [
      {
        test: "OK",
      },
    ]
  );
};
setJSExceptionHandler(errorHandler, true);

function App(props) {
  const [listTodo, setListTodo] = useState([]);
  const [todoText, setTodoText] = useState("");
  useEffect(() => {
    try {
      props.data.subscribeToMore(
        buildSubscription(TodoSubscription, listTodos)
      );
    } catch (error) {
      console.log("errrorororo", error);
    }
  }, []);

  useEffect(() => {
    if (props.data && props.data.listTodos) {
      setListTodo(props.data.listTodos.items);
      console.log("props.data.listTodos.items", props.data.listTodos.items);
    }
  }, [props.data.listTodos]);

  const createNewTodo = async () => {
    if (!todoText) return;
    try {
      props.createTodo({
        name: todoText,
        updatedAt: "2020-07-03T07:57:40.896Z",
      });
      setTodoText("");
    } catch (error) {
      console.log("errrorrrr:", error);
    }
  };

  function Item({ title }) {
    return (
      <View
        style={{
          backgroundColor: "yellow",
          borderWidth: 1,
          borderColor: "green",
          padding: 3,
        }}
      >
        <Text style={{ color: "white" }}>{title}</Text>
      </View>
    );
  }

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setTodoText(text)}
        value={todoText}
      />
      <TouchableOpacity
        onPress={createNewTodo}
        style={{ backgroundColor: "red", padding: 10, width: 100 }}
      >
        <Text>Add To Do</Text>
      </TouchableOpacity>
      <View>
        <Text>List Todos:</Text>
      </View>
      <FlatList
        data={listTodo}
        extraData={listTodo}
        renderItem={({ item }) => <Item title={item.name} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const AppWithData = compose(
  graphql(listTodos, {
    options: {
      fetchPolicy: "cache-and-network",
    },
    props: ({ data }) => ({
      todos: data.listTodos ? data.listTodos.items : [],
      data,
    }),
  }),
  graphqlMutation(CreateTodo, listTodos, "Todo")
)(App);

export default withAuthenticator(AppWithData, { includeGreetings: true });
