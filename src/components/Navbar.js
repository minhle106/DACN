import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { logout, selectAuth } from "../stores/reducer/authSlice";
import { LogoutOutlined } from "@ant-design/icons";
import { PATH } from "../route/paths";
import { CustomButton } from "./StyledComponent";
import { ROLE } from "../ultils/constant";
import JobCascadeLogo from "../assets/images/JobCascadeLogo.png";
import { selectSystem, setActiveKey } from "../stores/reducer/systemSlice";
import UserDropDown from "./UserDropdown";

const Navbar = () => {
  const { activeKey } = useSelector(selectSystem);
  const dispatch = useDispatch();
  const { isLoggedIn, userInfo } = useSelector(selectAuth);
  const location = useLocation();

  const notAllowAcessBoard = [ROLE.EMPLOYEE, ROLE.STUDENT, ROLE.STAFF];
  const styleLink = `px-4 text-lg hover:border-b-2 border-gray-500 flex items-center`;

  useEffect(() => {
    if (location.pathname === PATH.COMMUNITY) {
      dispatch(setActiveKey("community"));
    } else if (location.pathname === PATH.JOB) {
      dispatch(setActiveKey("job"));
    } else if (location.pathname === PATH.COMPANY) {
      dispatch(setActiveKey("company"));
    }
  }, []);

  return (
    <div className="h-[68px] shadow fixed w-full bg-white top-0 z-10 px-[42px]">
      <div className="flex justify-between items-center h-full">
        <div className="flex gap-[50px] items-center h-full">
          <img className="w-[10rem]" src={JobCascadeLogo} alt="Logo" />
          <div className="h-full flex">
            <Link
              to={PATH.COMMUNITY}
              onClick={() => dispatch(setActiveKey("community"))}
              className={
                activeKey === "community"
                  ? styleLink + " font-semibold border-b-2"
                  : styleLink
              }
            >
              <span className="text-xl">Community</span>
            </Link>
            <Link
              to={PATH.JOB}
              onClick={() => dispatch(setActiveKey("job"))}
              className={
                activeKey === "job"
                  ? styleLink + " font-semibold border-b-2"
                  : styleLink
              }
            >
              <span className="text-xl">Explore Jobs</span>
            </Link>
            <Link
              to={PATH.COMPANY}
              onClick={() => dispatch(setActiveKey("company"))}
              className={
                activeKey === "company"
                  ? styleLink + " font-semibold border-b-2"
                  : styleLink
              }
            >
              <span className="text-xl">Company Reviews</span>
            </Link>
            {isLoggedIn && (
              <Link
                to={PATH.CV_BUILDER}
                onClick={() => dispatch(setActiveKey("cvbuider"))}
                className={
                  activeKey === "cvbuider"
                    ? styleLink + " font-semibold border-b-2"
                    : styleLink
                }
              >
                <span className="text-xl">CV Builder</span>
              </Link>
            )}

            {userInfo?.roles &&
              !userInfo?.roles.some((role) =>
                notAllowAcessBoard.includes(role)
              ) && (
                <Link
                  to="/dashboard"
                  onClick={() => dispatch(setActiveKey("dashboard"))}
                  className={
                    activeKey === "dashboard"
                      ? styleLink + " font-semibold border-b-2"
                      : styleLink
                  }
                >
                  <span className="text-xl">Dashboard</span>
                </Link>
              )}
          </div>
        </div>

        {isLoggedIn ? (
          <UserDropDown />
        ) : (
          <div className="h-full flex gap-[15px]">
            <Link
              to={PATH.LOGIN}
              onClick={() => dispatch(setActiveKey("login"))}
              className={
                activeKey === "login"
                  ? styleLink + " font-semibold border-b-2"
                  : styleLink
              }
            >
              <span className="text-xl text-blue-900 font-semibold">Login</span>
            </Link>
            <Link
              to={PATH.SIGN_UP}
              onClick={() => dispatch(setActiveKey("register"))}
              className={
                activeKey === "register"
                  ? styleLink + " font-semibold border-b-2"
                  : styleLink
              }
            >
              <span className="text-xl text-blue-900 font-semibold">
                Register
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
