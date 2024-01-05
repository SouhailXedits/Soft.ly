import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ShortenedUrl from "./components/ShortenedUrl";
import { request } from "graphql-request";

import { useState } from "react";
import { useUser } from "../auth/useUser";
import { GQL_API_LINK } from "../../config";
import { getUrls } from "../../services/apiLinks";
import { ApiResponse } from "../../types";



function LinksLayout() {
  const [ , setIsAllSelected] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState<number[]>([]);
  const {user} = useUser()
  const userId = user?.id
  const { data, error } = useQuery<ApiResponse>({
    queryKey: ["urls", { user_id: userId }],
    queryFn: async ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const [, { user_id }] = queryKey;
      const getUrlsQuery = getUrls

      return request(GQL_API_LINK, getUrlsQuery, {
        user_id,
      });
    },
  });
  const allUrls = data?.getUrlsWithUserId || [];

  if (error) console.error(error.message);

  const handleLinkSelection = (linkId: number) => {
    const updatedSelectedLinks = [...selectedLinks];
    const index = updatedSelectedLinks.indexOf(linkId);

    if (index !== -1) {
      updatedSelectedLinks.splice(index, 1);
    } else {
      updatedSelectedLinks.push(linkId);
    }

    setSelectedLinks(updatedSelectedLinks);
    setIsAllSelected(updatedSelectedLinks.length === allUrls?.length);
  };

  return (
    <div className="flex flex-col items-center text-center gap-5 px-4 py-9  w-full max-w-[70rem] mx-auto h-screen">
      {allUrls?.length !== 0 ? (
        <div className="flex items-center justify-between w-full ">
          <h2 className="text-3xl font-bold">Links</h2>
        </div>
      ) : (
        ""
      )}

      {allUrls?.length !== 0 ? (
        allUrls?.map(
          (Newlink: {
            id: number;
            created_at: string;
            longUrl: string;
            shortUrl: string;
            title: string;
            iconFilePath: string;
          }) => (
            <ShortenedUrl
              link={Newlink}
              key={Newlink.id}
              isSelected={selectedLinks.includes(Newlink.id)}
              onSelect={handleLinkSelection}
            />
          )
        )
      ) : (
        <>
          <img
            className=" max-w-[400px] sm:max-w-[300px]"
            src="links-list-empty.png"
            alt="links mist image"
          />
          <h2 className="text-3xl font-bold ">
            More clicks are just a link away
          </h2>
          <p className="text-xl font-light text-gray-700 ">
            Shorten long links and get attention by customizing what they say.
          </p>{" "}
        </>
      )}
      <Link className="btn-primary" to="/links/create">
        Create a short link
      </Link>
      <span>Learn more</span>
    </div>
  );
}

export default LinksLayout;
