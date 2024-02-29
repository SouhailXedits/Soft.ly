import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import QrRow from "./QrRow";
// import { useState } from "react";
import request from "graphql-request";
import { useUser } from "../../auth/useUser";
import { GQL_API_LINK } from "../../../config";
import { ApiResponse, UrlData } from "../../../types/links";
import { getUrls } from "@/services/apiLinks";

function QRCodesLayout() {
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
  const allUrls = data?.getUrlsWithUserId || [];
  return (
    <div className="flex flex-col items-center text-center gap-5 px-4 py-9  w-full max-w-[70rem] mx-auto h-screen">
      {allUrls?.length !== 0 ? (
        <div className=" flex items-center justify-between w-full">
          <h2 className=" text-3xl font-bold ">QR Codes</h2>
        </div>
      ) : (
        ""
      )}

      {allUrls?.length !== 0 ? (
        allUrls?.map((qr: UrlData) => <QrRow key={qr.id} qr={qr} />)
      ) : (
        <>
          <img
            className=" max-w-[400px] sm:max-w-[300px]"
            src="qrc-list-empty.png"
            alt="Qr code list empty"
          />
          <h2 className=" text-3xl font-bold">
            Connect your audience with a simple scan
          </h2>
          <p className=" text-xl text-gray-700 font-light">
            Create a QR Code from any short link. Then edit, customize, and
            track your QR Codes here.
          </p>
        </>
      )}
      <Link className="btn-primary" to="/qrcodes/create">
        Create a QR Code
      </Link>
    </div>
  );
}

export default QRCodesLayout;
