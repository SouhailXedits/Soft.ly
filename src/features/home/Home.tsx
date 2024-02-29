import { Link } from "react-router-dom";
import ProgressComp from "./Components/ProgressComp";
import HeadingCTA from "./Components/HeadingCTA";

function Home() {
  return (
    <div className=" p-6 flex flex-col gap-6 h-screen">
      <div>
        <h1 className=" text-3xl font-bold">Your Connections Platform</h1>
      </div>
      <div className=" bg-white rounded-lg p-3 flex lg:flex-col justify-around gap-3">
        <HeadingCTA variation="url"/>
        <HeadingCTA variation="qrCode"/>
      </div>
      <ProgressComp />
    </div>
  );
}

export default Home;
