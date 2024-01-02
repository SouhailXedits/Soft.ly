import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";
import SideBar from "./SideBar/SideBar";
import { useState } from "react";

function AppLayout() {
  const [isOpenSideOpts, setIsOpenSideOpts] = useState(false);
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  function handleShowSideBar() {
    console.log("click");
    setIsOpenSideOpts((prev) => !prev);
  }
  return (
    <div className="grid md:flex mdl:flex-col h-screen grid-rows-[50px_1fr_auto] grid-cols-[auto_1fr] ">
      {isLoading && <Loader />}
      <Header onToggleOpen={handleShowSideBar} />
      {!isOpenSideOpts ? (
        <div className="sideBar row-start-1 row-end-3 border border-gray-200 p-2 w-min md:hidden">
          <SideBar onToggleOpen={function (): void {
            throw new Error("Function not implemented.");
          } } />
        </div>
      ) : (
        ""
      )}
      {isOpenSideOpts ? (
        <div className=" fixed w-screen h-screen bg-white z-50">
          <SideBar onToggleOpen={handleShowSideBar} />
        </div>
      ) : (
        ""
      )}
      <div className="overflow-auto bg-gray-100">
        <main className="mx-auto row-span-2 col-span-2 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
