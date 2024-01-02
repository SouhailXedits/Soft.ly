
import { GraphQLClient, gql } from "graphql-request";
//import { client } from "../main";
import { GQL_API_LINK } from "../config";



const client = new GraphQLClient(
  GQL_API_LINK
);

// export const deleteLink = async (id: string): any => {
export const deleteLink = async (id: string) => {
  const DELETE_URLS_MUTATION = gql`
    mutation DeleteUrls($id: String!) {
      deleteUrls(id: $id)
    }
  `;

  try {
    const response = await client.request(DELETE_URLS_MUTATION, { id });
    console.log(response);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be caught by the error handler in useMutation
  }
};


export const getQrCodes = gql`
  query AllUrls {
    allUrls {
      id
      created_at
      shortUrl
      longUrl
      title
      qr_image_url
      user_id
    }
  }
`;
