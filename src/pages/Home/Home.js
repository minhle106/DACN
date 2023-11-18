import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PATH } from "../../route/paths";

const Home = () => {
  const location = useLocation();
  if (location.pathname === PATH.HOME || location.pathname === PATH.HOME1) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-[1rem] mt-[6.5rem]">Welcome</div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-[1rem] mt-[6.5rem] mb-[2rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
