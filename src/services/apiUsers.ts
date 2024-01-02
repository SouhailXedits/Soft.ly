import { GQL_API_LINK } from "@/config";


export const deleteManyUsers = async (userIds: string[]) => {
  try {
    const response = await fetch(GQL_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation DeleteManyUsers($userIds: [String!]!) {
            deleteManyUsers(userIds: $userIds) {
              token
            }
          }
        `,
        variables: {
          userIds,
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return data.data.deleteManyUsers;
    } else {
      throw new Error(data.errors?.[0].message || "Failed to delete users");
    }
  } catch (error) {
    console.error("Error deleting users:", error);
    throw new Error("Failed to delete users");
  }
};
