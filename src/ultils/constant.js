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

const FEATURE = Object.freeze({
  DASHBOARD: "Dashboard",
  AUTHORIZATION_SETTING: "Affiliation Management",
  EMPLOYEE_MANAGEMENT: "Employee Management",
  USER_MANAGEMENT: "User Management",
  COMPANY_INFORMATION: "Company Information",
  REPORT_MANAGEMENT: "Report Management",
});

const ROLE = Object.freeze({
  ADMIN: "Admin",
  EMPLOYEE: "Employee",
  STUDENT: "Student",
  COMPANY: "Company",
  STAFF: "Staff",
});

const LOCATION = Object.freeze({
  // Hà Nội
  BA_DINH: "Ba Đình",
  HOAN_KIEM: "Hoàn Kiếm",
  TAY_HO: "Tây Hồ",
  LONG_BIEN: "Long Biên",
  CAU_GIAY: "Cầu Giấy",
  DONG_DA: "Đống Đa",
  HAI_BA_TRUNG: "Hai Bà Trưng",
  THANH_XUAN: "Thanh Xuân",
  HOANG_MAI: "Hoàng Mai",
  TU_LIEM: "Từ Liêm",
  HA_DONG: "Hà Đông",
  BAC_TU_LIEM: "Bắc Từ Liêm",
  THANH_TRI: "Thanh Trì",
  // Hồ Chí Minh
  QUAN_1: "Quận 1",
  QUAN_2: "Quận 2",
  QUAN_3: "Quận 3",
  QUAN_4: "Quận 4",
  QUAN_5: "Quận 5",
  QUAN_6: "Quận 6",
  QUAN_7: "Quận 7",
  QUAN_8: "Quận 8",
  QUAN_9: "Quận 9",
  QUAN_10: "Quận 10",
  QUAN_11: "Quận 11",
  QUAN_12: "Quận 12",
  BINH_TAN: "Bình Tân",
  BINH_THANH: "Bình Thạnh",
  GO_VAP: "Gò Vấp",
  PHU_NHUAN: "Phú Nhuận",
  TAN_BINH: "Tân Bình",
  TAN_PHU: "Tân Phú",
  THU_DUC: "Thủ Đức",
  BIEN_HOA: "Biên Hòa",
  VUNG_TAU: "Vũng Tàu",

  // Đà Nẵng
  HAI_CHAU: "Hải Châu",
  THANH_KHE: "Thanh Khê",
  SON_TRA: "Sơn Trà",
  NGU_HANH_SON: "Ngũ Hành Sơn",
  CAM_LE: "Cẩm Lệ",
  LIEN_CHIEU: "Liên Chiểu",
  HOA_VANG: "Hòa Vang",
});

const JOB_CONTRACT = Object.freeze({
  PART_TIME: "Part-time",
  FULLTIME: "Full-time",
  CONTRACT: "Contract",
});

const JOB_TYPE = Object.freeze({
  IN_OFFICE: "In Office",
  HYBRID: "Hybrid",
  Remote: "Remote",
});

const JOB_LEVEL = Object.freeze({
  INTENR: "Intern",
  FRESHER: "Fresher",
  JUNIOR: "Junior",
  MIDDLE: "Middle",
  SENIOR: "Senior",
  EXPERT: "Expert",
  LEAD: "Lead",
  CHIEF: "Chief",
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
  "Programming",
  "Data Analysis",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "Machine Learning",
  "Web Development",
  "Mobile App Development",
  "Network Administration",
  "Database Management",
];

const SKILL1 = [
  "Programming",
  "Data Analysis",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "Machine Learning",
  "Web Development",
  "Mobile App Development",
  "Network Administration",
  "Database Management",
];

export {
  LOCATION,
  STATUS,
  ROLE,
  FEATURE,
  LOCAL_ITEM,
  FIELD_OF_WORK,
  QUANTITY_EMPLOYEE,
  JOB_CONTRACT,
  JOB_TYPE,
  JOB_LEVEL,
  SKILL1,
};
