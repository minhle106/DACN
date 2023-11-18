import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../stores/reducer/authSlice";

const RequireAuth = ({ children }) => {
  const { userInfo } = useSelector(selectAuth);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (flag && !userInfo) {
      navigate("/unauthorized");
    }
    setFlag(true);
  }, [userInfo]);

  return <div>{children}</div>;
};

export default RequireAuth;
