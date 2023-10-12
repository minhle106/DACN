const LOCAL_ITEM = Object.freeze({
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_INFO: "userInformation",
});

const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const ROLES = ["Employee", "Student", "Company"];
const QUANTITY_EMPLOYEE = [
  "1-10",
  "10-50",
  "50-100",
  "100-200",
  "200-500",
  "500-1000",
  "1000+",
];
const FIELD_OF_WORK = [
  "Information Technology (IT)",
  "Healthcare",
  "Education",
  "Finance",
  "Engineering",
  "Marketing",
  "Sales",
  "Customer Service",
  "Human Resources (HR)",
  "Law",
  "Accounting",
  "Real Estate",
  "Entertainment",
  "Automotive",
  "Social Work",
  "Construction",
  "Psychology",
  "Environmental Science",
  "Architecture",
  "Graphic Design",
];

export { STATUS, ROLES, LOCAL_ITEM, FIELD_OF_WORK, QUANTITY_EMPLOYEE };
