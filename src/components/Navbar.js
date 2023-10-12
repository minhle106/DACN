import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/loginSignUp/loginSignUpSlice";
import { notification } from "antd";
import { selectAuth } from "../stores/reducer/authSlice";

const Navbar = () => {
  const styleLink = `px-4 text-lg hover:border-b-2 border-gray-500 flex items-center`;
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, userInfo } = useSelector(selectAuth);

  return (
    <div className="flex h-[4.5rem] shadow fixed w-full bg-white top-0 z-10">
      <div className="container mx-auto px-[4.5rem] flex justify-between items-center h-full">
        <div className="">
          <img
            className="w-[8rem]"
            src="https://1000logos.net/wp-content/uploads/2021/12/Glassdoor-Logo.png"
            alt="logo"
          />
        </div>
        <div className="h-full flex">
          <Link
            to="/community"
            onClick={() => setActive("community")}
            className={
              active === "community"
                ? styleLink + " font-semibold border-b-2"
                : styleLink
            }
          >
            Community
          </Link>
          <Link
            to="/jobs"
            onClick={() => setActive("job")}
            className={
              active === "job"
                ? styleLink + " font-semibold border-b-2"
                : styleLink
            }
          >
            Job
          </Link>
          <Link
            to="/companies"
            onClick={() => setActive("company")}
            className={
              active === "company"
                ? styleLink + " font-semibold border-b-2"
                : styleLink
            }
          >
            Company
          </Link>
          <Link
            to="/reviews"
            onClick={() => setActive("review")}
            className={
              active === "review"
                ? styleLink + " font-semibold border-b-2"
                : styleLink
            }
          >
            Review
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center gap-5">
            <div>{userInfo?.fullName}</div>
            <div
              onClick={() => {
                dispatch(logout());
                notification.success({
                  message: "Success",
                  description: "Logout successful!",
                });
              }}
              className="cursor-pointer px-4 py-2 rounded border-2 border-black hover:text-white hover:bg-black font-semibold"
            >
              Logout
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <Link
              to="/login"
              className="px-4 py-2 bg-black font-semibold text-white hover:text-black me-4 rounded hover:bg-gray-200 hover:border-2 hover:border-black"
            >
              <i className="bi bi-box-arrow-in-right me-2b text-xl bg-black bg-transparent me-2"></i>
              Login
            </Link>
            <Link
              to="sign-up"
              className="px-4 py-2 rounded border-2 border-black hover:text-white hover:bg-black font-semibold"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
