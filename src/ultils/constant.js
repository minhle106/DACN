const LOCAL_ITEM = Object.freeze({
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_INFO: "userInfo",
});

const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const ROLES = ["Employee", "Student", "Company"];

export { STATUS, ROLES, LOCAL_ITEM };
