import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

const UserProfileLayout = () => {
  return (
    <div className="flex gap-6 bg-gray-100 max-w-7xl mx-auto">
      <div className="sm:w-[30%] w-full h-fit bg-white pb-3">
        <Sidebar />
      </div>
      <div className="bg-white w-full p-4 hidden sm:block">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfileLayout;
