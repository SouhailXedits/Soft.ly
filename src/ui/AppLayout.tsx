import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";
import SideBar from "./SideBar/SideBar";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[50px_1fr_auto] grid-cols-[auto_1fr] ">
      {isLoading && <Loader />}
      <Header />
      <div className="sideBar row-start-1 row-end-3 border border-gray-200 p-2 w-min">
        <SideBar />
      </div>
      <div className="overflow-auto bg-gray-100">
        <main className="mx-auto row-span-2 col-span-2 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
