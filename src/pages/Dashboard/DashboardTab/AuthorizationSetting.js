import React from "react";
import AffiliationTable from "../../../features/affiliationSetting/AffiliationSetting";
import RoleTable from "../../../features/roleSetting/RoleSetting";

const AuthorizationSetting = () => {
  return (
    <>
      <AffiliationTable />
      <br /> <br />
      <RoleTable />
    </>
  );
};

export default AuthorizationSetting;
