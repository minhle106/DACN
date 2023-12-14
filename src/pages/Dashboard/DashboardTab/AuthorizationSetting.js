import React from "react";
import AffiliationFeature from "../../../features/authorizationSetting/AffiliationSetting";
import RoleFeature from "../../../features/authorizationSetting/RoleSetting";

const AuthorizationSetting = () => {
  return (
    <>
      <AffiliationFeature />
      <br /> <br />
      <RoleFeature />
    </>
  );
};

export default AuthorizationSetting;
