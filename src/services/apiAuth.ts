import { gql } from "graphql-tag";
import supabase from "./supabase";
import { client } from "../main";
import request from "graphql-request";
import { GQL_API_LINK } from "../config";

interface LoginResult {
  token: string;
}
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



interface LoginResult {
  token: string;
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
        user{
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



export async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if(error) throw new Error(error.message)
  return data
}


// export async function getCurrentUser() {
//   const { data: session } = await supabase.auth.getSession();
//   if (!session.session) return null;

//   const { data, error } = await supabase.auth.getUser();

//   if (error) throw new Error(error.message);
//   return data?.user;
// }

interface ValidateTokenResult {
  validateToken: {
    id: string;
    role: string;
    email: string;
  };
}
export async function getCurrentUser() {
  const getUserQuery = gql`
    query ValidateToken($jwt: String!) {
      validateToken(jwt: $jwt) {
        id
        role
        email
      }
    }
  `;
  const token = localStorage.getItem('token')
  //const endpoint = "https://api.short.softyeducation.com/graphql";
  const variables = {
    jwt: token,
  };
  const data = await request<ValidateTokenResult>(
    GQL_API_LINK,
    getUserQuery,
    variables
  );

  return data?.validateToken;
  
}

export const getUser = gql`
  query ValidateToken {
    validateToken(
      jwt: $jwt
    ) {
      id
      role
      email
    }
  }
`;


// export async function logout() {
//   const { error } = await supabase.auth.signOut();
//   if (error) throw new Error(error.message);
// }
export async function logout() {
  localStorage.removeItem('token')
}




