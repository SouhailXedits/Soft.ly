import React, { useState } from "react";
import { BsGraphUp } from "react-icons/bs";
import PieChartComp from "./components/PieChartComp";
import BarChartComp from "./components/BarChartComp";
import CountryRow from "./components/CountryRow";
// import WorldMap from "./components/WorldMap";
import { getClicksData } from "../../services/apiLinks";
import { useUser } from "../auth/useUser";
import { useQuery } from "@tanstack/react-query";
import { getRandomColor } from "../../utils/helpers";

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("countries");

  const { user } = useUser();
  const userId = user?.id;
  if (userId === undefined) {
    return <div>Loading...</div>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: analyticsData } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => getClicksData(userId),
  });

  if (analyticsData?.count.totalRequestCount === 0)
    return (
      <div className=" w-full h-screen flex items-center justify-center ">
        <p>You have no analytics right now ! *</p>
      </div>
    );


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

  const countriesObj = analyticsData?.count?.country_name;
  let countriesClicks: { id: number; name: string; clicks: number }[] = [];
  if (countriesObj) {
    countriesClicks = Object.keys(countriesObj).map((country, index) => ({
      id: index + 1,
      name: country.toLowerCase(),
      clicks: countriesObj[country],
    }));
  }
  const citiesObj = analyticsData?.count?.Location;
  let citiesClicks: { id: number; name: string; clicks: number }[] = [];
  if (citiesObj) {
    citiesClicks = Object.keys(citiesObj).map((city, index) => ({
      id: index + 1,
      name: city.toLowerCase(),
      clicks: citiesObj[city],
    }));
  }

  // const countryCodes = analyticsData?.count?.country_code || {};


  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderChart = (chartComponent: React.ReactNode, filterby: string) => (
    <div className="flex bg-white p-6 rounded-xl flex-col">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 mb-2">
          {/* <button className="text-xl">
            <BsGripVertical />
          </button> */}
          <h2 className="text-lg font-medium">Clicks+scans {filterby}</h2>
        </div>
        {/* <button className="rounded border p-2">
          <BsThreeDots />
        </button> */}
      </div>
      <div className=" overflow-auto ">{chartComponent}</div>
    </div>
  );

  return (
    <div className="p-5">
      <div className=" p-4 flex-col flex gap-3 sticky top-0 bg-gray-100 z-40">
        <div className=" flex items-center justify-between">
          <h1 className=" text-3xl font-semibold">Analytics</h1>
          {/* <button className=" btn-primary flex items-center gap-1">
            <BsPlusCircle /> Add module
          </button> */}
        </div>
        {/* <div className=" flex gap-2 justify-start w-full pb-5 border-b-2">
          <button className=" p-2 border rounded flex items-center gap-1 bg-white ">
            {" "}
            <BsCalendar /> Filter By Created date
          </button>
          <button className=" p-2 border rounded flex items-center gap-1 bg-white">
            {" "}
            <BsCalendar /> Add filters
          </button>
        </div> */}
      </div>
      <div className="flex 3xl:flex-col w-full gap-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-5">
            {renderChart(
              <div className="flex flex-col gap-2 mt-6">
                <div className="flex flex-col items-center gap-2">
                  <p className="flex items-center gap-2 text-xl font-bold">
                    <BsGraphUp />
                    Dec 17, 2023
                  </p>
                  <p>{analyticsData?.count.totalRequestCount}</p>
                </div>
                {/* <div className="flex flex-col items-center pt-5 border-t gap-2">
                  <p className="flex items-center gap-2 text-xl font-bold">
                    <BsGraphUp />
                    Dec 17, 2023
                  </p>
                  <p>48 clicks + scans</p>
                </div> */}
              </div>,
              "total clicks"
            )}

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
              "by Countries"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
