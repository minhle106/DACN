import React, { useEffect, useRef, useState } from "react";
import { Form, DatePicker } from "antd";
import { CustomButton, FormSelect, TextInput } from "./StyledComponent";
import { PlusOutlined } from "@ant-design/icons";
import { JOB_TYPE } from "../ultils/constant";
import { useSelector } from "react-redux";
import { selectAuth } from "../stores/reducer/authSlice";

const CreateJobForm = (props) => {
  const { form } = props;
  const { userInfo } = useSelector(selectAuth);

  const inputSelectRef = useRef(null);
  const [keyTechText, setKeyTechText] = useState("");
  const [keyTech, setKeyTech] = useState(["C++", "Python", "Java"]);

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const addKeyTech = (e) => {
    e.preventDefault();
    if (keyTech) setKeyTech([...keyTech, keyTechText]);
    setKeyTechText("");
    setTimeout(() => {
      inputSelectRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    console.log(userInfo);
  });

  return (
    <Form
      form={form}
      name="jobForm"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item name="jobTitle" label="Job Title">
        <TextInput />
      </Form.Item>
      <Form.Item name="jobDescription" label="Job Description">
        <TextInput.TextArea />
      </Form.Item>
      <Form.Item name="jobType" label="Job Type">
        <FormSelect>
          {JOB_TYPE.map((item) => (
            <FormSelect.Option value={item}>{item}</FormSelect.Option>
          ))}
        </FormSelect>
      </Form.Item>
      <Form.Item name="jobContract" label="Job Contract">
        <FormSelect>
          <FormSelect.Option value="Permanent">Permanent</FormSelect.Option>
          <FormSelect.Option value="Temporary">Temporary</FormSelect.Option>
        </FormSelect>
      </Form.Item>
      <Form.Item name="salary" label="Salary">
        <TextInput />
      </Form.Item>
      <Form.Item name="level" label="Level">
        <TextInput />
      </Form.Item>
      <Form.Item name="keyTechnical" label="Key Technical">
        <FormSelect
          mode="multiple"
          dropdownRender={(menu) => (
            <>
              {menu}
              <TextInput
                placeholder="Please enter item"
                ref={inputSelectRef}
                value={keyTechText}
                onChange={(e) => setKeyTechText(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <CustomButton
                type="text"
                icon={<PlusOutlined />}
                onClick={addKeyTech}
              >
                Add
              </CustomButton>
            </>
          )}
          options={keyTech.map((item) => ({ label: item, value: item }))}
        />
      </Form.Item>
      <Form.Item name="dateRelease" label="Date Release">
        <DatePicker />
      </Form.Item>
      <Form.Item name="keyResponsibility" label="Key Responsibility">
        <TextInput />
      </Form.Item>
      <Form.Item name="qualification" label="Qualification">
        <TextInput />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <CustomButton type="submit">Submit</CustomButton>
      </Form.Item>
    </Form>
  );
};

export default CreateJobForm;
