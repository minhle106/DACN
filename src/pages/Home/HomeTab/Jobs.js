import React from "react";
import JobCard from "../../../components/JobCard";

const data = [
  {
    jobTitle: "[Remote/Vietnam/Tokyo] Bridge System Engineer",
    jobDecription:
      "As a .NET Developer at [Company Name], you will be responsible for designing, developing, and maintaining software applications that meet our clients' needs. You will work closely with cross-functional teams to ensure the successful delivery of projects and provide technical expertise throughout the development lifecycle",
    jobType: "In Office",
    jobContract: "Full-time",
    companyName: "Brycen Vietnam",
    companyAddress: "42 Ung Văn Khiêm, Quận Bình Thạnh, Hồ Chí Minh",
    logoLink:
      "https://animationvisarts.com/wp-content/uploads/2020/12/Amazon-current-Logo-2.jpg",
    salary: "1000$ - 5000$",
    level: ["Intern", "Fresher"],
    keyTechnical: ["C#", "Golang", "React", "Flutter"],
    createAt: new Date(),
    keyResponsibility: [
      {
        keyName: "Software Development",
        keyDecription:
          "Design, code, test, and debug software applications using .NET technologies.",
      },
      {
        keyName: "Requirements Analysis",
        keyDecription:
          "Collaborate with business analysts and stakeholders to gather and understand project requirements.",
      },
      {
        keyName: "Architecture and Design",
        keyDecription:
          "Participate in the architectural and design discussions to ensure scalability, reliability, and performance of applications.",
      },
    ],
    Qualification: [
      "Bachelor's degree in Computer Science, Information Technology, or a related field.",
      "Proven experience as a .NET Developer with 3 to 5 years of relevant work experience.",
      "Strong knowledge of .NET framework, C#, ASP.NET, and related technologies.",
      "Experience with database design and SQL Server.",
    ],
  },
  {
    jobTitle: "[Remote/Vietnam/Tokyo] Bridge System Engineer",
    jobDecription:
      "As a .NET Developer at [Company Name], you will be responsible for designing, developing, and maintaining software applications that meet our clients' needs. You will work closely with cross-functional teams to ensure the successful delivery of projects and provide technical expertise throughout the development lifecycle",
    jobType: "In Office",
    jobContract: "Full-time",
    companyName: "Brycen Vietnam",
    companyAddress: "42 Ung Văn Khiêm, Quận Bình Thạnh, Hồ Chí Minh",
    logoLink:
      "https://animationvisarts.com/wp-content/uploads/2020/12/Amazon-current-Logo-2.jpg",
    salary: "1000$ - 5000$",
    level: ["Intern", "Fresher"],
    keyTechnical: ["C#", "Golang", "React", "Flutter"],
    createAt: new Date(),
    keyResponsibility: [
      {
        keyName: "Software Development",
        keyDecription:
          "Design, code, test, and debug software applications using .NET technologies.",
      },
      {
        keyName: "Requirements Analysis",
        keyDecription:
          "Collaborate with business analysts and stakeholders to gather and understand project requirements.",
      },
      {
        keyName: "Architecture and Design",
        keyDecription:
          "Participate in the architectural and design discussions to ensure scalability, reliability, and performance of applications.",
      },
    ],
    Qualification: [
      "Bachelor's degree in Computer Science, Information Technology, or a related field.",
      "Proven experience as a .NET Developer with 3 to 5 years of relevant work experience.",
      "Strong knowledge of .NET framework, C#, ASP.NET, and related technologies.",
      "Experience with database design and SQL Server.",
    ],
  },
  {
    jobTitle: "[Remote/Vietnam/Tokyo] Bridge System Engineer",
    jobDecription:
      "As a .NET Developer at [Company Name], you will be responsible for designing, developing, and maintaining software applications that meet our clients' needs. You will work closely with cross-functional teams to ensure the successful delivery of projects and provide technical expertise throughout the development lifecycle",
    jobType: "In Office",
    jobContract: "Full-time",
    companyName: "Brycen Vietnam",
    companyAddress: "42 Ung Văn Khiêm, Quận Bình Thạnh, Hồ Chí Minh",
    logoLink:
      "https://animationvisarts.com/wp-content/uploads/2020/12/Amazon-current-Logo-2.jpg",
    salary: "1000$ - 5000$",
    level: ["Intern", "Fresher"],
    keyTechnical: ["C#", "Golang", "React", "Flutter"],
    createAt: new Date(),
    keyResponsibility: [
      {
        keyName: "Software Development",
        keyDecription:
          "Design, code, test, and debug software applications using .NET technologies.",
      },
      {
        keyName: "Requirements Analysis",
        keyDecription:
          "Collaborate with business analysts and stakeholders to gather and understand project requirements.",
      },
      {
        keyName: "Architecture and Design",
        keyDecription:
          "Participate in the architectural and design discussions to ensure scalability, reliability, and performance of applications.",
      },
    ],
    Qualification: [
      "Bachelor's degree in Computer Science, Information Technology, or a related field.",
      "Proven experience as a .NET Developer with 3 to 5 years of relevant work experience.",
      "Strong knowledge of .NET framework, C#, ASP.NET, and related technologies.",
      "Experience with database design and SQL Server.",
    ],
  },
];

const Jobs = () => {
  return (
    <div>
      {/*  <div className="flex bg-white rounded-lg border shadow px-5 py-5">
        search bar
      </div> */}
      <div>
        <span className="font-semibold text-lg">152</span> search results
      </div>
      <div className="flex gap-5 mt-5">
        <div className="w-8/12">
          {data.map((item) => (
            <JobCard JD={item} />
          ))}
        </div>
        <div className="w-4/12 bg-white rounded-lg border shadow px-5 py-5 mb-5">
          123
        </div>
      </div>
    </div>
  );
};

export default Jobs;
