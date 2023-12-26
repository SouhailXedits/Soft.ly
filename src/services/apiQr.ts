
import { GraphQLClient, gql } from "graphql-request";
//import { client } from "../main";
import { GQL_API_LINK } from "../config";

// export const GenerateQR = async (NewUrl: string, title: string) => {
//   console.log("✅", title);
//   try {
//     const data = await QRCode.toDataURL(NewUrl);
//     await setQRCode({ NewQr: data, NewLongUrl: NewUrl, NewTitle: title });
//     console.log("after");
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export async function GenerateQR({
//   longUrl,
//   title,
//   userId,
//   back_half,
// }: {
//   longUrl: string;
//   title: string;
//   userId: string;
//   back_half: string;
// }) {
//   console.log(longUrl, title, userId, back_half);
//   const user_id = userId;
//   const mutation = gql`
//     mutation CreateUrls(
//       $longUrl: String!
//       $title: String!
//       $user_id: String!
//       $back_half: String!
//     ) {
//       createUrls(
//         createUrlInput: {
//           longUrl: $longUrl
//           title: $title
//           user_id: $user_id
//           back_half: $back_half
//         }
//       ) {
//         id
//         created_at
//         longUrl
//         shortUrl
//         title
//         qr_image_url
//         user_id
//       }
//     }
//   `;

//   try {
//     const result = await client.mutate<CreateShortLinkResult>({
//       mutation,
//       variables: {
//         longUrl,
//         title,
//         user_id,
//         back_half,
//       },
//     });
//     return result.data;
//   } catch (error) {
//     console.error("Error during createShortLink mutation:", error);
//     throw new Error("Failed to create short link");
//   }
// }

// async function setQRCode({
//   NewQr,
//   NewLongUrl,
//   NewTitle,
// }: {
//   NewQr: string;
//   NewLongUrl: string;
//   NewTitle?: string;
// }): Promise<void> {
//   console.log(NewQr, NewLongUrl, NewTitle);
//   const user = await getCurrentUser();
//   console.log(user);
//   const { error } = await supabase
//     .from("qr-codes")
//     .insert([
//       {
//         qrImageUrl: NewQr,
//         longUrl: NewLongUrl,
//         title: NewTitle,
//         user_id: user?.id,
//       },
//     ])
//     .select();
//   if (error) {
//     console.log(error);
//   }
// }

// export async function getQrCodes() {
//   const { data, error } = await supabase.from("qr-codes").select("*");
//   if (error) {
//     console.log(error);
//   }
//   console.log(data);
//   return data;
// }
// export const deleteQrCode = async (id: number) => {
//   const { error } = await supabase
//     .from("qr-codes")
//     .delete()
//     .eq("id", id);
//   if(error) return error.message
// };

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
