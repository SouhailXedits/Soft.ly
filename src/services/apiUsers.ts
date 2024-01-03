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



export const updateUser = async (userData: any) => {
  try {
    //const [userId, userUpdateData] = Object.entries(userData)[0];
    console.log(userData)

    const response = await fetch(GQL_API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation UpdateUser($id: String!, $password: String, $role: String) {
            UpdateUser(id: $id, UpdateUser: { password: $password, role: $role }) {
              id
              role
              email
            }
          }
        `,
        variables: {
          id: userData.id,
          password: userData.password || null,
          role:userData.role || null,
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return data.data.updateUser;
    } else {
      throw new Error(data.errors?.[0].message || "Failed to update user");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};
