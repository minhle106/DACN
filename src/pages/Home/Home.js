import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PATH } from "../../route/paths";
import BgImg from "../../assets/BgNoel.jpg";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === PATH.HOME || location.pathname === PATH.ROOT) {
      navigate(PATH.COMMUNITY);
    }
  }, []);

  /* const bgURL = "../"; */

  return (
    <div>
      <Navbar />
      <div
        className="h-[500px]"
        style={{
          /*  background:
            "#0575E6 -webkit-linear-gradient(to right, #021B79, #0575E6) linear-gradient(to right, #021B79, #0575E6)",
          background: "-webkit-linear-gradient(to right, #021B79, #0575E6)",
          background: "linear-gradient(to right, #021B79, #0575E6)", */
          backgroundImage: `url(${BgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "0px -60px",
        }}
      ></div>
      <div
        className="mb-[24px] px-[48px]"
        style={{
          marginTop: -390,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
