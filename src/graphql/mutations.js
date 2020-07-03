/* eslint-disable */
// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const createTodo = /* GraphQL */ gql`
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ gql`
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ gql`
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      status
      createdAt
      updatedAt
    }
  }
`;
