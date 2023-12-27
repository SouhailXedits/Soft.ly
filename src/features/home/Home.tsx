import { Link } from "react-router-dom";
import ProgressComp from "./Components/ProgressComp";





function Home() {
    return (
      <div className=" p-6 flex flex-col gap-6">
        <div>
          <h1 className=" text-3xl font-bold">Your Connections Platform</h1>
        </div>
        <div className=" bg-white rounded-lg p-3 flex justify-around gap-3">
          <div className=" flex items-center border-dashed border-2 border-gray-200 rounded-lg w-full justify-around">
            <img
              src="/url-illustration.png"
              alt=" url illustration"
              className=" max-w-[250px]"
            />
            <div className=" flex gap-4 items-center m-2">
              <p>Make it short</p>
              <Link
                to="/links"
                className=" border border-blue-600 rounded p-1 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
              >
                Go to Link
              </Link>
            </div>
          </div>
          <div className=" flex items-center border-dashed border-2 border-gray-200 rounded-lg w-full justify-around p-2">
            <img
              src="/qr_illustration.png"
              alt=" url illustration"
              className=" max-w-[250px] relative bottom-8"
            />
            <div className=" flex gap-4 items-center m-2">
              <p>Make it Make it scannable</p>
              <Link
                to="/qrcodes"
                className=" border border-blue-600 rounded p-1 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
              >
                Go to QR Codes
              </Link>
            </div>
          </div>
        </div>
        <ProgressComp/>
      </div>
    );
}

export default Home
