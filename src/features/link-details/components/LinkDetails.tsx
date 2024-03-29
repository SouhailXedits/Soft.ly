import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import PieChartComp from "./PieChartComp";
import BarChartComp from "./BarChartComp";
import CountryRow from "./CountryRow";
import { getClicksDataByUrl, getUrl } from "../../../services/apiLinks";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { GQL_API_LINK } from "@/config";
import request from "graphql-request";
import ShorenedUrl from "../../links/components/ShortenedUrl";
import { getCitiesClicks, getCountriesClicks, getDevicesObj, getReferresClicks } from "@/utils/extractData";

const LinkDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("countries");
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get("id");
  // const queryClient = useQueryClient()
  const { data, isPending } = useQuery<any>({
    queryKey: ["url", urlId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const getUrlQuery = getUrl;

      return request(GQL_API_LINK, getUrlQuery, {
        id: id,
      });
    },
  });

  const { data: analyticsData } = useQuery({
    queryKey: ["url-analytics"],
    queryFn: () => getClicksDataByUrl(urlId),
  });

  const devicesClicks = getDevicesObj(analyticsData);
  const referrersClicks = getReferresClicks(analyticsData);
  const countriesClicks = getCountriesClicks(analyticsData);
  const citiesClicks = getCitiesClicks(analyticsData);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderChart = (chartComponent: React.ReactNode, filterby: string) => (
    <div className="flex bg-white p-6 rounded-xl flex-col items-center">
      <div className="flex gap-2 items-center justify-between self-start">
        <div className="flex gap-2 mb-3 ">
          {/* <button className="text-xl">
            <BsGripVertical />
          </button> */}
          <h2 className="text-lg font-medium">Clicks+scans {filterby}</h2>
        </div>
        {/* <button className="rounded border p-2">
          <BsThreeDots />
        </button> */}
      </div>
      <div className=" w-full self-center overflow-auto ">{chartComponent}</div>
    </div>
  );

  const link = data?.urls[0];

  return (
    <div className="p-5 flex flex-col items-center">
      <div className="flex flex-col w-full gap-4 max-w-[70rem] items-center">
        <div className=" self-start">
          <Link to="/links" className="flex items-center gap-2 ">
            <BsArrowLeftShort /> Back to list
          </Link>
        </div>
        <div className="flex flex-col w-full">
          <div>
            {!isPending && (
              <ShorenedUrl
                link={link}
                isSelected={false}
                onSelect={() => console.log()}
              />
            )}
          </div>
          <div className="flex flex-col gap-5">
            {/* <div className="flex bg-white p-6 rounded-xl flex-col">
              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2">
                  <h2 className="text-lg font-medium">
                    Clicks+scans on Short link
                  </h2>
                </div>
                <button className="rounded border p-2">
                  <BsThreeDots />
                </button>
              </div>
              <div>
                <WorldMap countries={countryCodes} />
              </div>
              
            </div> */}

            {/* {renderChart(
              <div className="pt-5 mt-5">
                <LineChartComp data={data} />
              </div>,
              "over time"
            )} */}
            {/* 
            {renderChart(
              <div className="flex flex-col gap-2 mt-6">
                <div className="flex flex-col items-center gap-2">
                  <p className="flex items-center gap-2 text-xl font-bold">
                    <BsGraphUp />
                    Dec 17, 2023
                  </p>
                  <p>48 clicks + scans</p>
                </div>
                <div className="flex flex-col items-center pt-5 border-t gap-2">
                  <p className="flex items-center gap-2 text-xl font-bold">
                    <BsGraphUp />
                    Dec 17, 2023
                  </p>
                  <p>48 clicks + scans</p>
                </div>
              </div>,
              "over time"
            )} */}

            {/* {renderChart(
              <div>
                <WorldMap countries={countryCodes} />
              </div>,
              "in world map"
            )} */}
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-5">
            {renderChart(
              <div>
                <PieChartComp data={devicesClicks} />
              </div>,
              "device clicks"
            )}

            {renderChart(
              <div className="mt-8">
                <BarChartComp data={referrersClicks} />
              </div>,
              "referrer"
            )}

            {renderChart(
              <div>
                <div className="bg-gray-300 flex items-center rounded-full p-1 justify-between gap-1 mt-4 mb-8">
                  <button
                    className={` rounded-full p-2 w-full ${
                      activeTab === "countries" ? "bg-white" : ""
                    }`}
                    onClick={() => handleTabChange("countries")}
                  >
                    Countries
                  </button>
                  <button
                    className={` rounded-full p-2 w-full ${
                      activeTab === "cities" ? "bg-white" : ""
                    }`}
                    onClick={() => handleTabChange("cities")}
                  >
                    Cities
                  </button>
                </div>
                <div className=" flex flex-col gap-3">
                  <div className="flex justify-between text-gray-500">
                    <p>#</p>
                    <p className=" basis-[50%]">
                      {activeTab === "cities" ? "Cities" : "Countries"}
                    </p>
                    <p>Click + Scan</p>
                    {/* <p>%</p> */}
                  </div>
                  {activeTab === "cities"
                    ? citiesClicks?.map((country) => (
                        <CountryRow key={country.id} country={country} />
                      ))
                    : countriesClicks?.map((country) => (
                        <CountryRow key={country.id} country={country} />
                      ))}

                  {/* <DataRow data={data}/> */}
                </div>
              </div>,
              "by countries"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkDetails;
