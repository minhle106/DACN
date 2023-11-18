import React from "react";
import {
  DeleteOutlined,
  DollarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Divider, Tag } from "antd";
import moment from "moment";

const JobCardManager = (props) => {
  const { JD } = props;

  return (
    <div
      style={{ marginBottom: 10 }}
      className="flex bg-white rounded-lg border shadow px-5 py-5 w-[calc(50%-10px)]"
    >
      <div className="w-3/12">
        <img
          className="w-[10rem]"
          /* src={JD.logoLink}  */
          src="https://animationvisarts.com/wp-content/uploads/2020/12/Amazon-current-Logo-2.jpg"
          alt="company_logo"
        />
      </div>
      <div className="w-9/12 leading-8">
        <div className="font-semibold text-lg">{JD.jobTitle}</div>
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
        <div className="md:flex justify-between">
          <div className="md:flex gap-2 items-center">
            {JD.keyTechnical.map((item) => (
              <Tag color="blue">{item}</Tag>
            ))}
          </div>
          <div className="flex items-center px-4 py-[3px] border rounded bg-[#E64e4e] cursor-pointer text-white font-medium">
            <DeleteOutlined className="text-lg me-2" />
            <div>Delete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardManager;
