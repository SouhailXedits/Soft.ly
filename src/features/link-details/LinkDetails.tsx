import React, { useState } from "react";
import { BsArrowLeftShort, BsGraphUp, BsGripVertical, BsThreeDots } from "react-icons/bs";
import PieChartComp from "./components/PieChartComp";
import BarChartComp from "./components/BarChartComp";
import CountryRow from "./components/CountryRow";
import WorldMap from "./components/WorldMap";
import { getClicksDataByUrl } from "../../services/apiLinks";
import { useQuery } from "@tanstack/react-query";
import {getRandomColor} from '../../utils/helpers'
import { Link, useSearchParams } from "react-router-dom";
import ShorenedUrl from "../links/components/ShortenedUrl";


const LinkDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("countries");
  // const data: DataItem[] = [
  // const { user } = useUser();
  // const userId = user?.id;
  // if (userId === undefined) {
  //   return <div>Loading...</div>;
  // }
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get('id')
  console.log(urlId)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: analyticsData } = useQuery({
    queryKey: ["url-analytics"],
    queryFn: () => getClicksDataByUrl(urlId),
  });

  const devicesObj = analyticsData?.count?.devices;
  let devicesClicks: {
    id: number;
    name: string;
    value: number;
    color: string;
  }[] = [];
  if (devicesObj) {
    devicesClicks = Object.keys(devicesObj).map((device, index) => ({
      id: index + 1,
      name: device.toLowerCase(),
      value: devicesObj[device],
      color: getRandomColor(),
    }));
  }

  const referrersObj = analyticsData?.count?.referrerDomains;
  let referrersClicks: { id: number; name: string; value: number }[] = [];
  if (referrersObj) {
    referrersClicks = Object.keys(referrersObj).map((referrer, index) => ({
      id: index + 1,
      name: referrer.toLowerCase(),
      value: referrersObj[referrer],
    }));
  }

  const countriesObj = analyticsData?.count?.Location;
  let countriesClicks: { id: number; name: string; clicks: number }[] = [];
  if (countriesObj) {
    countriesClicks = Object.keys(countriesObj).map((country, index) => ({
      id: index + 1,
      name: country.toLowerCase(),
      clicks: countriesObj[country],
    }));
  }

  const countryCodes = analyticsData?.count?.country_code || {};

  //   { name: "desktop", value: 100, avg: 167, color: "blue" },
  //   { name: "mobile", value: 150, avg: 367, color: "green" },
  // ];
  // const dataCounties: DataCountry[] = [
  //   { id: 1, name: "Tunisia", clicks: 100 },
  //   { id: 2, name: "Algeria", clicks: 88 },
  //   { id: 3, name: "Libye", clicks: 55 },
  // ];
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderChart = (chartComponent: React.ReactNode, filterby: string) => (
    <div className="flex bg-white p-6 rounded-xl flex-col">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2">
          <button className="text-xl">
            <BsGripVertical />
          </button>
          <h2 className="text-lg font-medium">Clicks+scans {filterby}</h2>
        </div>
        <button className="rounded border p-2">
          <BsThreeDots />
        </button>
      </div>
      {chartComponent}

    </div>
  );

  return (
    <div className="p-5">
      <div className=" p-4 flex-col flex gap-3 sticky top-0 bg-gray-100 z-50">
        <div className=" flex gap-2 justify-start w-full pb-5 border-b-2">
          <Link to="/links" className="flex items-center gap-2 ">
            <BsArrowLeftShort /> Back to list
          </Link>
        </div>
      </div>
      {/* <ShorenedUrl link={}></ShorenedUrl> */}
      <div className="flex w-full gap-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-5">
            <div className="flex bg-white p-6 rounded-xl flex-col">
              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2">
                  <button className="text-xl">
                    <BsGripVertical />
                  </button>
                  <h2 className="text-lg font-medium">
                    Clicks+scans souhail
                  </h2>
                </div>
                <button className="rounded border p-2">
                  <BsThreeDots />
                </button>
              </div>
              souhail
            </div>

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

            {renderChart(
              <div>
                <WorldMap countries={countryCodes} />
              </div>,
              "over time"
            )}
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
                    <p>%</p>
                  </div>
                  {countriesClicks?.map((country) => (
                    <CountryRow key={country.id} country={country} />
                  ))}
                  {/* <DataRow data={data}/> */}
                </div>
              </div>,
              "over time"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkDetails;
