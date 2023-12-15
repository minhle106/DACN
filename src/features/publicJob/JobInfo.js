import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";
import { useEffect, useRef, useState } from "react";
import { getJobs } from "../../stores/reducer/publicJobSlice";
import { Form, Select, Spin } from "antd";
import {
  AddItemButton,
  BigInput,
  SearchInput,
  SearchMultipleSelect,
} from "../../components/StyledComponent";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  JOB_CONTRACT,
  JOB_LEVEL,
  JOB_TYPE,
  LOCATION,
} from "../../ultils/constant";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../route/paths";
import CommingSoonImg from "../../assets/CommingSoon.jpg";

const JobInfo = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { data: jobsData, fetchStatus: jobsFetchStatus } = useQuery({
    queryKey: ["publicJobs", page, size],
    queryFn: () => getJobs({ page: page, size: size }),
    staleTime: 1 * 60 * 1000,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <div className="bg-[#111440] p-6 rounded-lg">
        <Form
          name="searchForm"
          form={form}
          onFinish={(values) => console.log(values)}
          autoComplete="off"
        >
          <div className="flex items-center gap-[10px]">
            <div className="w-11/12">
              <Form.Item name="searchText">
                <SearchInput
                  allowClear
                  prefix={
                    <div className="text-xl font-semibold me-2">
                      <SearchOutlined className="me-3" />
                      Search
                    </div>
                  }
                  ref={inputRef}
                  placeholder="Titles, keywords or companies ..."
                />
              </Form.Item>
            </div>
            <button
              type="submit"
              className="w-1/12 h-[60px] border border-[#fa6639] bg-[#fa6639] mt-[-25px] rounded-lg text-white font-semibold hover:bg-[#fa744b]"
            >
              Searching
            </button>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="w-4/12">
              <Form.Item name="location">
                <SearchMultipleSelect
                  allowClear
                  mode="multiple"
                  placeholder="Select your location"
                  maxTagCount="responsive"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <div className="flex gap-2 mt-1">
                        <div className="w-8/12">
                          <BigInput
                            placeholder="Please enter item"
                            /*  ref={addRef}
                    value={keyText}
                    onChange={(e) => setKeyText(e.target.value)} */
                            style={{ padding: "0.5rem" }}
                          />
                        </div>
                        <div className="w-4/12">
                          <AddItemButton
                            /*                     onClick={addKeyTech}
                             */ style={{ padding: "0.5rem" }}
                          >
                            <PlusOutlined />
                            <span> Add Location</span>
                          </AddItemButton>
                        </div>
                      </div>
                    </>
                  )}
                >
                  {Object.values(LOCATION)?.map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
                </SearchMultipleSelect>
              </Form.Item>
            </div>
            <div className="w-2/12">
              <Form.Item name="jobLevel">
                <SearchMultipleSelect
                  allowClear
                  mode="multiple"
                  placeholder="Select job level"
                  maxTagCount="responsive"
                >
                  {Object.values(JOB_LEVEL)?.map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
                </SearchMultipleSelect>
              </Form.Item>
            </div>
            <div className="w-2/12">
              <Form.Item name="jobType">
                <SearchMultipleSelect
                  allowClear
                  mode="multiple"
                  placeholder="Select job type"
                  maxTagCount="responsive"
                >
                  {Object.values(JOB_TYPE)?.map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
                </SearchMultipleSelect>
              </Form.Item>
            </div>
            <div className="w-2/12">
              <Form.Item name="jobContract">
                <SearchMultipleSelect
                  allowClear
                  mode="multiple"
                  placeholder="Select job contract"
                  maxTagCount="responsive"
                >
                  {Object.values(JOB_CONTRACT)?.map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
                </SearchMultipleSelect>
              </Form.Item>
            </div>
            <button
              onClick={() => form.resetFields()}
              className="w-2/12 h-[45px] mt-[-35px] border border-[#fa6639] bg-[#fa6639] mt-[-25px] rounded-lg text-white font-semibold hover:bg-[#fa744b]"
            >
              Clear filter
            </button>
          </div>
        </Form>
        {/*   <div style={{ marginTop: -10 }} className="text-white text-xl">
          <span className="font-semibold text-2xl">152</span> search results
        </div> */}
      </div>
      <Spin spinning={jobsFetchStatus === "fetching"}>
        <div className="flex gap-5 mt-5">
          <div className="w-full lg:w-8/12">
            {jobsData?.listContent.map((item) => (
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigate(`${PATH.JOB}/${item.jobId}`);
                }}
              >
                <JobCard job={item} moreInfo={false} />
              </div>
            ))}
          </div>
          <div className="w-4/12 bg-white rounded-lg border shadow px-5 py-5 mt-5 max-lg:hidden">
            <img src={CommingSoonImg} alt="Comming soon" />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default JobInfo;
