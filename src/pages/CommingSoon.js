import React from "react";
import CommingSoonImg from "../assets/CommingSoon.jpg";
import { PATH } from "../route/paths";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveKey } from "../stores/reducer/systemSlice";

const CommingSoon = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="bg-white rounded-lg border shadow px-10 py-10"
      style={{ minHeight: window.innerHeight - 135 }}
    >
      <div className="flex items-center">
        <img src={CommingSoonImg} alt="Comming soon" className="w-[45%]" />
        <div>
          <div className="text-[60px] font-semibold">
            Exciting Features Coming Soon!
          </div>
          <div className="text-[20px] text-gray-400 font-medium mb-6">
            This page is under construction
          </div>
          <Link
            to={PATH.JOB}
            onClick={() => dispatch(setActiveKey("job"))}
            className="px-4 py-2 border rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Explore Jobs Now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommingSoon;
