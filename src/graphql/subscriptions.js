/* eslint-disable */
// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const onCreateTodo = /* GraphQL */ gql`
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
export const onUpdateTodo = /* GraphQL */ gql`
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ gql`
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      status
      createdAt
      updatedAt
    }
  }
`;
