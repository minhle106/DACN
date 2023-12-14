import React, { useEffect, useRef, useState } from "react";
import { Form, DatePicker, Input, Select } from "antd";
import {
  AddItemButton,
  BigInput,
  CustomReactQuill,
  FormMultipleSelect,
  FormSelect,
} from "../../components/StyledComponent";
import { PlusOutlined } from "@ant-design/icons";
import {
  JOB_CONTRACT,
  JOB_LEVEL,
  JOB_TYPE,
  SKILL1,
} from "../../ultils/constant";
import moment from "moment";

const JobForm = ({ form, onFinish, open, setOpen }) => {
  const [keyText, setKeyText] = useState("");
  const [keyTechnicals, setKeyTechnicals] = useState(SKILL1);

  const inputRef = useRef();
  const addRef = useRef();

  const addKeyTech = (e) => {
    e.preventDefault();
    if (keyText) {
      setKeyTechnicals([...keyTechnicals, keyText]);
      setKeyText("");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.input.focus();
      inputRef?.current.input.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 500);
  }, [open]);

  return (
    <Form
      name="jobForm"
      onFinish={(values) => {
        onFinish({
          ...values,
          dateRelease: moment(new Date(values.dateRelease)).format(
            "YYYY-MM-DDTHH:mm:ss"
          ),
          dateExpire: moment(new Date(values.dateExpire)).format(
            "YYYY-MM-DDTHH:mm:ss"
          ),
        });
        setOpen(false);
      }}
      scrollToFirstError={{ behavior: "smooth", block: "center" }}
      form={form}
      layout={"vertical"}
      autoComplete="off"
    >
      <Form.Item
        label="Job title"
        name="jobTittle"
        rules={[
          {
            required: true,
            message: "Please input your job title!",
          },
        ]}
      >
        <Input ref={inputRef} style={{ borderRadius: 5 }} size={"large"} />
      </Form.Item>

      <div className="flex gap-[10px]">
        <div className="w-6/12">
          <Form.Item
            label="Job type"
            name="jobType"
            rules={[
              {
                required: true,
                message: "Please select your job type!",
              },
            ]}
          >
            <FormSelect size="large" listHeight={250}>
              {Object.values(JOB_TYPE).map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
            </FormSelect>
          </Form.Item>
        </div>
        <div className="w-6/12">
          <Form.Item
            label="Job contract"
            name="jobContract"
            rules={[
              {
                required: true,
                message: "Please select your job contract!",
              },
            ]}
          >
            <FormSelect size="large" listHeight={250}>
              {Object.values(JOB_CONTRACT).map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
            </FormSelect>
          </Form.Item>
        </div>
      </div>

      <Form.Item
        label="Salary"
        name="salary"
        rules={[
          {
            required: true,
            message: "Please input your salary of job!",
          },
        ]}
      >
        <Input style={{ borderRadius: 5 }} size={"large"} />
      </Form.Item>

      <Form.Item label="Description" name="jobDescription">
        <CustomReactQuill
          modules={{
            toolbar: {
              container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link"],
                ["clean", { color: [] }],
              ],
            },
          }}
        />
      </Form.Item>

      <Form.Item
        label="Job level"
        name="jobLevel"
        rules={[
          {
            required: true,
            message: "Please input your job level!",
          },
        ]}
      >
        <FormMultipleSelect mode="tags" size="large" listHeight={250}>
          {Object.values(JOB_LEVEL).map((item, index) => (
            <Select.Option value={item} key={index}>
              {item}
            </Select.Option>
          ))}
        </FormMultipleSelect>
      </Form.Item>

      <Form.Item label="Technical keyword" name="keyTechnical">
        <FormMultipleSelect
          mode="tags"
          size="large"
          listHeight={250}
          onClick={() => addRef.current.focus()}
          dropdownRender={(menu) => (
            <>
              {menu}
              <div className="flex gap-2 mt-1">
                <div className="w-8/12">
                  <BigInput
                    placeholder="Please enter item"
                    ref={addRef}
                    value={keyText}
                    onChange={(e) => setKeyText(e.target.value)}
                    style={{ padding: "0.5rem" }}
                  />
                </div>
                <div className="w-4/12">
                  <AddItemButton
                    onClick={addKeyTech}
                    style={{ padding: "0.5rem" }}
                  >
                    <PlusOutlined />
                    <span> Add item</span>
                  </AddItemButton>
                </div>
              </div>
            </>
          )}
        >
          {keyTechnicals?.map((item, index) => (
            <Select.Option value={item} key={index}>
              {item}
            </Select.Option>
          ))}
        </FormMultipleSelect>
      </Form.Item>

      <Form.Item label="Benefit" name="benefit">
        <CustomReactQuill
          modules={{
            toolbar: {
              container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link"],
                ["clean", { color: [] }],
              ],
            },
          }}
        />
      </Form.Item>

      <Form.Item label="Job Responsibilities" name="keyResponsibility">
        <CustomReactQuill
          modules={{
            toolbar: {
              container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link"],
                ["clean", { color: [] }],
              ],
            },
          }}
        />
      </Form.Item>

      <Form.Item label="Job Qualifications" name="qualification">
        <CustomReactQuill
          modules={{
            toolbar: {
              container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link"],
                ["clean", { color: [] }],
              ],
            },
          }}
        />
      </Form.Item>

      <div className="flex gap-[10px]">
        <div className="w-6/12">
          <Form.Item
            label="Creation date"
            name="dateRelease"
            rules={[
              {
                required: true,
                message: "Please select your creation date!",
              },
            ]}
          >
            <DatePicker
              /* disabledDate={(current) => {
                let customDate = moment().format("YYYY-MM-DD");
                return current && current < moment(customDate, "YYYY-MM-DD");
              }} */
              style={{ width: "100%" }}
              size={"large"}
            />
          </Form.Item>
        </div>
        <div className="w-6/12">
          <Form.Item
            label="Closing date"
            name="dateExpire"
            rules={[
              {
                required: true,
                message: "Please select your closing date!",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} size={"large"} />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default JobForm;
