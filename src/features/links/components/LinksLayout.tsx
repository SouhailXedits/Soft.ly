import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ShortenedUrl from "./ShortenedUrl";
import { request } from "graphql-request";

import { useEffect, useRef, useState } from "react";
import { useUser } from "../../auth/useUser";
import { GQL_API_LINK } from "../../../config";
import { getUrls } from "../../../services/apiLinks";
import { ApiResponse, IShortenedUrl } from "../../../types/links";
import { BsCalendar } from "react-icons/bs";
import DateRangePicker from "@/ui/calendars/DateRangePicker";
function LinksLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    dateRange: {} as any,
  });
  const modalRef = useRef<any>(null);
  const { user } = useUser();
  const userId = user?.id;
  const { data } = useQuery<ApiResponse>({
    queryKey: ["urls", { user_id: userId }],
    queryFn: async ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const [, { user_id }] = queryKey;
      const getUrlsQuery = getUrls;

      return request(GQL_API_LINK, getUrlsQuery, {
        user_id,
      });
    },
  });

  // const allUrls = data?.getUrlsWithUserId.reverse() || ([] as any);
  // console.log(allUrls);

  const [filteredUrls, setFilteredUrls] = useState<any[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    if (data && isFilterApplied) {
      const filteredData = data.getUrlsWithUserId.filter((url: any) => {
        const createdAt = new Date(url.created_at);
        const fromDate = new Date(filters.dateRange.from);
        const toDate = new Date(filters.dateRange.to);
        toDate.setDate(toDate.getDate() + 1);
        return createdAt >= fromDate && createdAt < toDate;
      });
      setFilteredUrls(filteredData);
    } else {
      setFilteredUrls(data?.getUrlsWithUserId || []);
    }
  }, [data, filters, isFilterApplied]);

  const handleLinkSelection = (linkId: number) => {
    const updatedSelectedLinks = [...selectedLinks];
    const index = updatedSelectedLinks.indexOf(linkId);

    if (index !== -1) {
      updatedSelectedLinks.splice(index, 1);
    } else {
      updatedSelectedLinks.push(linkId);
    }

    setSelectedLinks(updatedSelectedLinks);
  };

  const handleFilterByDateClick = () => {
    setIsFilterApplied(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsFilterApplied(true);
    setIsModalOpen(false);
  };

  const handleOverlayClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOverlayClick);
    } else {
      document.removeEventListener("mousedown", handleOverlayClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [isModalOpen]);

  function handleChangeDateRange(newDate: any) {
    setFilters({
      ...filters,
      dateRange: newDate,
    });
  }

  function handleApplyFilters() {
    setIsFilterApplied(true);
    closeModal();
  }

  const sorted = filteredUrls.sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return (
    <div className="flex flex-col items-center text-center gap-5 px-4 py-9  w-full max-w-[70rem] mx-auto h-screen">
      <div className=" flex gap-2 justify-start w-full pb-5 border-b-2 ">
        <button
          onClick={handleFilterByDateClick}
          className=" p-2 border rounded flex items-center gap-1 bg-white "
        >
          {" "}
          <BsCalendar /> Filter By Created date
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div ref={modalRef} className="bg-white p-6 rounded-lg">
            <h2>Filter by date :</h2>
            <DateRangePicker
              setdate={handleChangeDateRange}
              defaultSelected={filters.dateRange}
            />
            <button
              className=" p-2 bg-blue-700 hover:bg-blue-400 transition-all text-white rounded"
              onClick={handleApplyFilters}
            >
              apply filters
            </button>
          </div>
        </div>
      )}

      {sorted?.length > 0 ? (
        <div className="flex items-center justify-between w-full ">
          <h2 className="text-3xl font-bold">Links</h2>
        </div>
      ) : (
        ""
      )}

      {sorted?.length > 0 &&
        sorted?.map((Newlink: IShortenedUrl) => (
          <ShortenedUrl
            link={Newlink}
            key={Newlink.id}
            isSelected={selectedLinks.includes(Newlink.id)}
            onSelect={handleLinkSelection}
          />
        ))}
      {sorted?.length === 0 && (
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
    </div>
  );
}

export default LinksLayout;
