import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PATH } from "../../route/paths";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === PATH.HOME || location.pathname === PATH.ROOT) {
      navigate(PATH.COMMUNITY);
    }
  }, []);

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
