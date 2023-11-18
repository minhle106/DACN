import React, { useState } from "react";
import {
  DollarOutlined,
  EnvironmentOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Divider, Tag } from "antd";

const JobCard = (props) => {
  const { JD } = props;
  const [mark, setMark] = useState(false);

  const handleClick = () => {
    setMark(!mark);
  };

  return (
    <div
      style={{ marginBottom: 20 }}
      className="flex bg-white rounded-lg border shadow px-5 py-5"
    >
      <div className="w-3/12">
        <img className="w-[10rem]" src={JD.logoLink} alt="company_logo" />
      </div>
      <div className="w-9/12 leading-8">
        <div className="flex justify-between">
          <div className="font-semibold text-lg w-10/12">{JD.jobTitle}</div>
          {mark ? (
            <StarFilled
              style={{ color: "rgb(245 158 11)" }}
              onClick={handleClick}
              className="text-2xl"
            />
          ) : (
            <StarOutlined onClick={handleClick} className="text-2xl" />
          )}
        </div>
        <div className="font-semibold  text-gray-500">{JD.companyName}</div>
        <div className="flex items-center">
          <DollarOutlined className="text-xl me-2" />
          <div>{JD.salary}</div>
        </div>
        <div className="flex items-center">
          <EnvironmentOutlined className="text-xl me-2" />
          <div>{JD.companyAddress}</div>
        </div>
        <Divider style={{ marginTop: 5, marginBottom: 15 }} />
        <div className="md:flex gap-2 items-center">
          {JD.keyTechnical.map((item) => (
            <Tag color="blue">{item}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
