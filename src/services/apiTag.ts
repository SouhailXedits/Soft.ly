import { API_LINK } from "@/config";

export async function getAllUserTags(userId: string) {
  console.log(`${API_LINK}tag/user/${userId}`);
  const res = await fetch(`${API_LINK}tags/user/${userId}`);
  const data = await res.json();
  console.log(data);
  if (res.ok) {
    console.log(data);
    return data;
  }
  throw new Error(data.message);
}


export const createTag = async (tag: {user_id: string, value: string, label: string}) => {
    
  try {
    const response = await fetch(`${API_LINK}tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
  }
};

