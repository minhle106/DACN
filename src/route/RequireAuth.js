import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectAuth, setAuthorized } from "../stores/reducer/authSlice";
import { PATH } from "./paths";
import { useQuery } from "@tanstack/react-query";
import { getAuthorized } from "../stores/reducer/userSlice";
import { FEATURE } from "../ultils/constant";

const RequireAuth = ({ children }) => {
  const { userInfo, authorized } = useSelector(selectAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const { data: authorizedData } = useQuery({
    queryKey: ["authorized"],
    queryFn: () => getAuthorized(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (flag && !userInfo) {
      navigate(PATH.UNAUTHORIZED);
    }
    setFlag(true);
  }, [userInfo]);

  useEffect(() => {
    if (authorizedData) {
      const authorized = {};
      authorizedData.listContent.map(
        (item) =>
          (authorized[`${item.featureName}`] = {
            featureId: item.featureId,
            create: item.createFeature,
            read: item.readFeature,
            update: item.updateFeature,
            delete: item.deleteFeature,
          })
      );
      dispatch(setAuthorized(authorized));
    }
  }, [authorizedData]);

  /*  useEffect(() => {
    if(authorized){
      switch (location.pathname) {
        case PATH.AUTHORIZATION_SETTING:
          if(authorized[FEATURE])
        case PATH.DASHBOARD:
        case PATH.EMPLOYEE_MANAGEMENT:
        case PATH.POSTED_JOB:
      }
    }
  }, [authorized]); */

  return <div>{children}</div>;
};

export default RequireAuth;
