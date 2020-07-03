/* eslint-disable */
// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const getTodo = /* GraphQL */ gql`
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ gql`
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
