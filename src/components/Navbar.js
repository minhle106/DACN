import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { logout, selectAuth } from "../stores/reducer/authSlice";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { PATH } from "../route/paths";
import { CustomButton } from "./StyledComponent";
import { ROLE } from "../ultils/constant";

const Navbar = () => {
  const styleLink = `px-4 text-lg hover:border-b-2 border-gray-500 flex items-center`;
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, userInfo } = useSelector(selectAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const notAllowAcessBoard = [ROLE.EMPLOYEE, ROLE.STUDENT, ROLE.STAFF];

  useEffect(() => {
    if (location.pathname === PATH.COMMUNITY) {
      setActive("community");
    } else if (location.pathname === PATH.JOB) {
      setActive("job");
    } else if (location.pathname === PATH.COMPANY) {
      setActive("company");
    }
  }, []);

  return (
    <div className="flex h-[4.5rem] shadow fixed w-full bg-white top-0 z-10">
      <div className="container mx-auto px-[1rem] flex justify-between items-center h-full">
        <div className="">
          <img
            className="w-[10rem]"
            src="https://wallpapercave.com/wp/wp8864237.png"
            alt="logo"
          />
        </div>
        <div className="h-full flex">
          <Link
            to={PATH.COMMUNITY}
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
            to={PATH.JOB}
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
            to={PATH.COMPANY}
            onClick={() => setActive("company")}
            className={
              active === "company"
                ? styleLink + " font-semibold border-b-2"
                : styleLink
            }
          >
            Company
          </Link>

          {userInfo?.roles &&
            !userInfo?.roles.some((role) =>
              notAllowAcessBoard.includes(role)
            ) && (
              <Link
                to="/dashboard"
                onClick={() => setActive("dashboard")}
                className={
                  active === "dashboard"
                    ? styleLink + " font-semibold border-b-2"
                    : styleLink
                }
              >
                Dashboard
              </Link>
            )}
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-5">
            <div>{userInfo?.fullName}</div>
            <CustomButton
              onClick={() => {
                dispatch(logout());
                notification.success({
                  message: "Success",
                  description: "Logout successful!",
                });
              }}
              className="flex items-center bg-black font-semibold text-white hover:text-black me-4 hover:bg-gray-200 hover:border-black"
            >
              <LogoutOutlined className="me-2b text-xl bg-black bg-transparent me-2" />

              <div>Logout</div>
            </CustomButton>
          </div>
        ) : (
          <div className="flex items-center">
            <CustomButton
              onClick={() => {
                navigate(PATH.LOGIN);
                setActive("");
              }}
              className="flex items-center bg-black font-semibold text-white hover:text-black me-4 hover:bg-gray-200 hover:border hover:border-black"
            >
              <LoginOutlined className="me-2b text-xl bg-black bg-transparent me-2"></LoginOutlined>
              <div>Login</div>
            </CustomButton>
            <CustomButton
              onClick={() => {
                navigate(PATH.SIGN_UP);
                setActive("");
              }}
              className="!border-black hover:text-white hover:bg-black font-semibold"
            >
              Sign Up
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
