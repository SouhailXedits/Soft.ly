import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ShortenedUrl from "./components/ShortenedUrl";
import { request } from "graphql-request";
import {
  BsBarChartFill,
  BsCalendar,
  BsChatFill,
  BsLockFill,
} from "react-icons/bs";
import { useState } from "react";
import { useUser } from "../auth/useUser";
import { GQL_API_LINK } from "../../config";
import { getUrls } from "../../services/apiLinks";
import { ApiResponse } from "../../types";

// interface UrlData {
//   id: number;
//   created_at: string;
//   longUrl: string;
//   shortUrl: string;
//   title: string;
//   qr_image_url: string;
//   iconFilePath:string;
//   user_id: string;
// }

// interface ApiResponse {
//   getUrlsWithUserId: UrlData[];
// }


function LinksLayout() {
  const [isAllSelected, setIsAllSelected] = useState(false);
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

  if (error) throw new Error(error.message);
  function handleIsAllSeleted() {
    setIsAllSelected((isAllSelected) => !isAllSelected);
    if(allUrls) {
      setSelectedLinks(isAllSelected ? [] : allUrls.map((link) => link.id));
    }
  }
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
    <div className="flex flex-col items-center text-center gap-5 px-4 py-9  w-full max-w-[70rem] mx-auto">
      {allUrls?.length !== 0 ? (
        <>
          <div className=" flex items-center justify-between w-full ">
            <h2 className=" text-3xl font-bold ">Links</h2>
            <div className="flex items-center gap-2">
              <button className=" flex items-center gap-1 text-blue-600">
                <BsChatFill /> Leave Feedback
              </button>
              <button
                className=" flex items-center gap-1  border rounded p-2 disabled:opacity-60 disabled:cursor-not-allowed "
                disabled={true}
              >
                <BsBarChartFill /> Top performing
              </button>
            </div>
          </div>
          <div className=" flex gap-2 justify-start w-full pb-5 border-b-2 ">
            <button className=" p-2 border rounded flex items-center gap-1 bg-white ">
              {" "}
              <BsCalendar /> Filter By Created date
            </button>
            <button className=" p-2 border rounded flex items-center gap-1 bg-white">
              {" "}
              <BsCalendar /> Add filters
            </button>
          </div>
          <div className=" flex gap-2 justify-between w-full">
            <div className=" ml-4 flex items-center gap-5">
              <input
                type="checkbox"
                defaultChecked={isAllSelected}
                onClick={handleIsAllSeleted}
              />
              <p className=" font-light">0 selected</p>
              <button
                disabled={true}
                className=" flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {" "}
                <BsLockFill /> <span>Export</span>
              </button>
              <button
                disabled={selectedLinks.length === 0}
                className=" flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {" "}
                Hide
              </button>
              <button
                disabled={selectedLinks.length === 0}
                className=" flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {" "}
                Tag
              </button>
            </div>
            <button className=" p-2 border rounded flex items-center gap-1 bg-white">
              {" "}
              <BsCalendar /> Add filters
            </button>
          </div>
        </>
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
            className=" max-w-[400px]"
            src="links-list-empty.png"
            alt="links mist image"
          />
          <h2 className=" text-3xl font-bold">
            More clicks are just a link away
          </h2>
          <p className=" text-xl text-gray-700 font-light">
            Shorten long links and get attention by customizing what they say.
            No more bit.ly/3yqawYa, more bit.ly/brands-bitly.
          </p>{" "}
        </>
      )}
      <Link className="btn-primary" to="create">
        Create a short link
      </Link>
      <Link>Learn more</Link>
    </div>
  );
}

export default LinksLayout;
