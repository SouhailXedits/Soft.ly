import gql from "graphql-tag";

import { client } from "../main";
import { API_LINK, GQL_API_LINK } from "../config";
//import { useUser } from "../features/auth/useUser";

export async function getShorterUrl({
  longUrl,
  title,
  userId,
  back_half = "", // Set a default value of an empty string
  tags = [],
}: {
  longUrl: string;
  title: string;
  userId: string;
  back_half?: string; // Make back_half parameter optional
  tags: any; // Specify that tags is an array of strings
}) {
  console.log(tags);

  const user_id = userId;
  console.log(user_id);
  // const mutation = gql`
  //   mutation CreateUrls(
  //     $longUrl: String!
  //     $title: String!
  //     $user_id: String!
  //     $back_half: String!
  //     $tags: [String!]! // Specify that tags is an array of strings and required
  //   ) {
  //     createUrls(
  //       createUrlInput: {
  //         longUrl: $longUrl
  //         title: $title
  //         user_id: $user_id
  //         back_half: $back_half
  //         tags: $tags // Include tags in the mutation input
  //       }
  //     ) {
  //       id
  //       created_at
  //       longUrl
  //       shortUrl
  //       title
  //       qr_image_url
  //       user_id
  //     }
  //   }
  // `;

  const mutation = gql`
    mutation CreateUrls(
      $longUrl: String!
      $title: String!
      $user_id: String!
      $back_half: String!
      $tags: [String!]!
    ) {
      createUrls(
        createUrlInput: {
          longUrl: $longUrl
          title: $title
          user_id: $user_id
          back_half: $back_half
          tags: $tags
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

  console.log(user_id);

  try {
    const result = await client.mutate({
      mutation,
      variables: {
        longUrl,
        title,
        user_id,
        back_half,
        tags,
      },
    });
    console.log(result);
    return result.data;
  } catch (error) {
    console.error("Error during createShortLink mutation:", error);
    throw new Error("Failed to create short link");
  }
}

export const getUrls = gql`
  query GetUrlsWithUserId($user_id: String!) {
    getUrlsWithUserId(id: $user_id) {
      id
      created_at
      longUrl
      shortUrl
      title
      qr_image_url
      back_half
      qr_image_svg
      iconFilePath
      user_id
      totalRequestCount
      tags {
        id
        value
        label
      }
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
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API_LINK}status/count/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch {
    throw new Error("Error fetching clicks data");
  }
}

export async function getClicksDataByUrl(urlId: string | null) {
  const endpoint = `${API_LINK}status/count/url/${urlId}`;
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch {
    throw new Error("Error fetching clicks data");
  }
}

// export const updateUser = async (urlData: any) => {
//   try {
//     const response = await fetch(GQL_API_LINK, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         query: `
//             mutation UpdateUrls($id: String!, $tags: String,$LinksCount: String, $role: String) {
//               updateUrls(
//                   updateUrlsInput: { urlsId: "65b3c14e7f78edf5fff9f0ea", back_half: null, title: null }
//               ) {
//                   id
//                   created_at
//                   longUrl
//                   shortUrl
//                   title
//                   qr_image_url
//                   iconFilePath
//                   user_id
//                   back_half
//                   totalRequestCount
//               }
//           }
//           mutation UpdateUser($id: String!, $password: String,$LinksCount: String, $role: String) {
//             UpdateUser(id: $id, UpdateUser: { password: $password,LinksCount: $LinksCount , role: $role }) {
//               id
//               role
//               LinksCount
//               email
//             }
//           }
//         `,
//         variables: {
//           id: urlData.id,
//           tags: urlData.tags || null,
//           title: urlData.title || null,
//           backHalf: urlData.back_half || null,
//         },
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       return data.data.updateUser;
//     } else {
//       throw new Error(data.errors?.[0].message || "Failed to update user");
//     }
//   } catch (error) {
//     console.error("Error updating user:", error);
//     throw new Error("Failed to update user");
//   }
// };

export const updateUrl = async (urlData: {
  id: string;
  tags?: any;
  title?: string;
  back_half?: string;
}) => {
  try {
    console.log(urlData);
    // const newTags = urlData.tags?.map((tag:any) => (tag.id))
    // console.log(newTags);
    const response = await fetch(GQL_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            mutation UpdateUrls($id: String!, $tags: [String!], $title: String, $back_half: String) {
              updateUrls(
                  updateUrlsInput: {
                      urlsId: $id,
                      title: $title,
                      back_half: $back_half,
                      tags: $tags,
                  }
              ) {
                  id
                  created_at
                  longUrl
                  shortUrl
                  title
                  qr_image_url
                  iconFilePath
                  user_id
                  back_half
                  totalRequestCount
              }
          }
        `,
        variables: {
          id: urlData.id,
          tags: urlData.tags || [],
          title: urlData.title || null,
          back_half: urlData.back_half || null,
        },
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      console.log(data);
      return data.data.updateUser;
    } else {
      console.log(data);
      throw new Error(data.errors?.[0].message || "Failed to update url");
    }
  } catch (error) {
    console.error("Error updating url:", error);
    throw new Error("Failed to update url");
  }
};
