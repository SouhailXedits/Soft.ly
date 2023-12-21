import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";

export async function getShorterUrl(longUrl:string, title:string) {
  console.log(longUrl, title)
  const url = "https://url-shortener-service.p.rapidapi.com/shorten";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "94bf708993msh10cefdba5b272f2p101113jsn8de35d6d3189",
      "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
    },
    body: new URLSearchParams({
      url: longUrl,
    }),
  };
  try {
    const response = await fetch(url, options);
    if(!response.ok) throw new Error('invalid url');
    const result = await response.json();
    console.log(result)
    await setUrl(longUrl, result.result_url, title);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getUrls() {
  const { data: urls, error } = await supabase.from("urls").select("*");
  if (error) {
    console.log(error)
  }
  console.log(urls)
  return urls
 
}

export async function setUrl(NewLongUrl: string, NewShortUrl: string, title: string) {
  const user = await getCurrentUser();
  const { error } = await supabase
  .from("urls")
  .insert([{ longUrl: NewLongUrl, shortUrl: NewShortUrl , title: title, user_id: user?.id}])
  .select();

  if(error) {
    console.log(error)
  }
}

export const deleteLink = async (id: number) => {
  const { error } = await supabase.from("urls").delete().eq("id", id);
  if (error) return error.message;
};