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
  ADMIN: "Admin",
  EMPLOYEE: "Employee",
  STUDENT: "Student",
  COMPANY: "Company",
  STAFF: "Staff",
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
  "Information Technology (IT)",
  "Graphic Design & Multimedia",
  "Finance & Banking",
  "Healthcare",
  "Education & Training",
  "Services & Tourism",
  "Energy & Environment",
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

const SKILL2 = [
  "Graphic Design",
  "User Interface (UI) Design",
  "Animation",
  "Video Editing",
  "3D Modeling",
  "Multimedia Production",
  "Typography",
  "Branding",
  "User Experience (UX) Design",
  "Adobe Creative Suite",
];

const SKILL3 = [
  "Financial Analysis",
  "Risk Management",
  "Investment Banking",
  "Accounting",
  "Fintech",
  "Blockchain",
  "Financial Modeling",
  "Asset Management",
  "Credit Analysis",
  "Portfolio Management",
];

const SKILL4 = [
  "Medical Coding",
  "Patient Care",
  "Healthcare Management",
  "Electronic Health Records (EHR)",
  "Telehealth",
  "Medical Research",
  "Clinical Trials",
  "Nursing",
  "Health Informatics",
  "Mental Health Counseling",
];

const SKILL5 = [
  "Renewable Energy",
  "Environmental Engineering",
  "Sustainability",
  "Green Technology",
  "Climate Change Mitigation",
  "Energy Management",
  "Environmental Policy",
  "Carbon Footprint Reduction",
  "Waste Management",
  "Environmental Impact Assessment",
];

const SKILL6 = [
  "Teaching",
  "Curriculum Development",
  "Educational Technology",
  "Classroom Management",
  "E-Learning",
  "Instructional Design",
  "Student Assessment",
  "Classroom Assessment Techniques (CATs)",
  "Educational Psychology",
  "Pedagogy",
];

const SKILL7 = [
  "Hotel Management",
  "Event Planning",
  "Customer Service",
  "Tour Guiding",
  "Hospitality Management",
  "Culinary Arts",
  "Travel Planning",
  "Reservation Systems",
  "Guest Relations",
  "Service Industry Management",
];

export {
  STATUS,
  ROLE,
  LOCAL_ITEM,
  FIELD_OF_WORK,
  QUANTITY_EMPLOYEE,
  JOB_CONTRACT,
  JOB_TYPE,
  JOB_LEVEL,
  SKILL1,
  SKILL2,
  SKILL3,
  SKILL4,
  SKILL5,
  SKILL6,
  SKILL7,
};
