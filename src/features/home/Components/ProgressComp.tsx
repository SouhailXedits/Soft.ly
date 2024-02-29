import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../auth/useUser";
import { ApiResponse } from "../../../types";
import request from "graphql-request";
import { GQL_API_LINK } from "../../../config";
import { getUrls } from "../../../services/apiLinks";
import { useEffect, useState } from "react";

function ProgressComp() {
  const { user } = useUser();
  const [userId, setUserId] = useState(user?.id ?? "");

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, []);

  const { data, error } = useQuery<ApiResponse>({
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

  if (error) console.error(error.message);
  const allUrls = data?.getUrlsWithUserId || [];

  const maxUrls = user?.LinksCount as any;
  const usagePercentage = (allUrls.length / +maxUrls) * 100;


  return (
    <div className=" p-4 flex flex-col gap-2 bg-white rounded-lg">
      <h2 className=" text-xl font-semibold ">Usage this month</h2>
      <div className=" mt-6">
        <p className=" text-md font-medium">Short links and QRs</p>
        {/* progress bar here  */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-gray-600">
                {allUrls.length} of {maxUrls} used
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-500">
                {usagePercentage.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-200 rounded">
            <div
              style={{ width: `${usagePercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressComp;
