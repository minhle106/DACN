const LOCAL_ITEM = Object.freeze({
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_INFO: "userInformation",
});

const STATUS = Object.freeze({
  LOADING: "pending",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
  FETCHING: "fetching",
  PAUSED: "paused",
});

const ROLE = Object.freeze({
  EMPLOYEE: "EMPLOYEE",
  STUDENT: "STUDENT",
  COMPANY: "COMPANY",
});

const GENDER = Object.freeze({
  MALE: "Male",
  FEMALE: "Female",
});

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

const JOB_TYPE = ["Part-time", "Full-time", "Contract"];

export {
  STATUS,
  ROLE,
  GENDER,
  LOCAL_ITEM,
  FIELD_OF_WORK,
  QUANTITY_EMPLOYEE,
  JOB_TYPE,
};
