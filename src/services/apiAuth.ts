import { gql } from "graphql-tag";

import { client } from "../main";
import request from "graphql-request";
import { GQL_API_LINK } from "../config";
import { LoginResult, ValidateTokenResult } from "../types/auth";

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const mutation = gql`
    mutation Register($email: String!, $password: String!) {
      register(registerInput: { email: $email, password: $password }) {
        token
      }
    }
  `;

  try {
    const result = await client.mutate<LoginResult>({
      mutation,
      variables: { email, password },
    });
    return result.data;
  } catch (error) {
    console.error("Error during login mutation:", error);
    throw new Error("Login failed");
  }
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const mutation = gql`
    mutation LoginMutation($email: String!, $password: String!) {
      login(loginInput: { email: $email, password: $password }) {
        token
        user {
          id
          email
          role
        }
      }
    }
  `;

  try {
    const result = await client.mutate<LoginResult>({
      mutation,
      variables: { email, password },
    });
    return result.data;
  } catch (error) {
    console.error("Error during login mutation:", error);
    throw new Error("Login failed");
  }
}

export async function getCurrentUser() {
  const getUserQuery = gql`
    query ValidateToken($jwt: String!) {
      validateToken(jwt: $jwt) {
        id
        role
        LinksCount
        email
      }
    }
  `;
  const token = localStorage.getItem("token");
  const variables = {
    jwt: token,
  };
  const data = await request<ValidateTokenResult>(
    GQL_API_LINK,
    getUserQuery,
    variables
  );
  console.log(data);

  return data?.validateToken;
}

export const getUser = gql`
  query ValidateToken {
    validateToken(jwt: $jwt) {
      id
      role
      email
    }
  }
`;

export async function logout() {
  localStorage.removeItem("token");
}
