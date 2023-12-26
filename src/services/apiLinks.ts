import gql from "graphql-tag";

import supabase from "./supabase";
import { client } from "../main";
import { API_LINK } from "../config";
//import { useUser } from "../features/auth/useUser";

// interface CreateShortLinkResult {
//   id: string;
//   created_at: string;
//   longUrl: string;
//   shortUrl: string;
//   title: string;
//   qr_image_url: string;
//   iconFilePath: string;
//   user_id: string;
// }

export async function getShorterUrl({
  longUrl,
  title,
  userId,
  back_half = "", // Set a default value of an empty string
}: {
  longUrl: string;
  title: string;
  userId: string;
  back_half?: string; // Make back_half parameter optional
}) {
  console.log(longUrl, title, userId, back_half);
  const user_id = userId;
  const mutation = gql`
    mutation CreateUrls(
      $longUrl: String!
      $title: String!
      $user_id: String!
      $back_half: String!
    ) {
      createUrls(
        createUrlInput: {
          longUrl: $longUrl
          title: $title
          user_id: $user_id
          back_half: $back_half
        }
      ) {
        id
        created_at
        longUrl
        shortUrl
        title
        qr_image_url
        user_id
      }
    }
  `;

  try {
    //const result = await client.mutate<CreateShortLinkResult>({
    const result = await client.mutate({
      mutation,
      variables: {
        longUrl,
        title,
        user_id,
        back_half,
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error during createShortLink mutation:", error);
    throw new Error("Failed to create short link");
  }
}

export const deleteLink = async (id: number) => {
  const { error } = await supabase.from("urls").delete().eq("id", id);
  if (error) return error.message;
};

export const getUrls = gql`
  query GetUrlsWithUserId($user_id: String!) {
    getUrlsWithUserId(id: $user_id) {
      id
      created_at
      longUrl
      shortUrl
      title
      qr_image_url
      iconFilePath
      user_id
    }
  }
`;

export const getUrl = gql`
  query Urls {
    urls(id: $id) {
      id
      created_at
      longUrl
      shortUrl
      title
      qr_image_url
      user_id
    }
  }
`;

export async function getClicksData(userId: string | null) {
  try {
    const res = await fetch(`${API_LINK}status/count/${userId}`);
    const data = await res.json();
    return data;
  } catch {
    throw new Error("error on fetching clicks data");
  }
}

export async function getClicksDataByUrl(urlId: string | null) {
  console.log(urlId);
  const endpoint = `${API_LINK}status/count/url/${urlId}`;
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
  } catch {
    throw new Error("error on fetching clicks data");
  }
}
