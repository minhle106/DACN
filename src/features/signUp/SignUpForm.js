import React, { useEffect, useState, useRef } from "react";
import { Form, Select, Tag } from "antd";
import { CustomLabel } from "../../components/CustomComponent";
import {
  GeneralInput,
  OptionInput,
  PasswordInput,
  SelectInput,
  AddItemButton,
} from "../../components/FormComponent";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ROLES } from "../../ultils/constant";
import { PlusOutlined } from "@ant-design/icons";

const Form1 = (props) => {
  const { form, setStep, step } = props;
  const handleSubmit = (value) => {
    setStep(step + 1);
  };
  const [clickOption, setClickOption] = useState(false);
  useEffect(() => {
    if (form.getFieldValue(["role"]) !== undefined) {
      setClickOption(true);
    }
  }, []);
  return (
    <Form
      name="formStepOne"
      form={form}
      layout={"vertical"}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <div className="flex flex-col justify-center">
        <Form.Item
          label={<CustomLabel>Email:</CustomLabel>}
          name="email"
          required={false}
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
          initialValue={form.getFieldValue(["email"])}
        >
          <GeneralInput placeholder="Type your email" />
        </Form.Item>

        <Form.Item
          label={<CustomLabel>Password:</CustomLabel>}
          name="password"
          required={false}
          rules={[{ required: true, message: "Please input your password!" }]}
          initialValue={form.getFieldValue(["password"])}
          hasFeedback
        >
          <PasswordInput placeholder="Type your password" />
        </Form.Item>

        <Form.Item
          label={<CustomLabel>Confirm password:</CustomLabel>}
          name="confirmPassword"
          dependencies={["password"]}
          required={false}
          rules={[
            { required: true, message: "Please input your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords not match");
              },
            }),
          ]}
          initialValue={form.getFieldValue(["confirmPassword"])}
          hasFeedback
        >
          <PasswordInput placeholder="Type your password" />
        </Form.Item>

        <Form.Item
          label={<CustomLabel>Select your role: </CustomLabel>}
          name="role"
          required={false}
          rules={[{ required: true, message: "Please choose your role!" }]}
          initialValue={form.getFieldValue(["role"])}
        >
          <Select
            onChange={(value) => {
              form.setFieldValue(["role"], value);
            }}
          >
            {ROLES.map((item) => (
              <Select.Option value={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            className="mt-4 py-3 border w-[100%] bg-teal-600 rounded-full text-white font-semibold hover:bg-teal-700"
          >
            Continue
          </button>
        </Form.Item>
      </div>
    </Form>
  );
};

const Form2 = (props) => {
  const { form, setStep, step } = props;
  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState("");
  const inputRef = useRef();

  const handleSubmit = (value) => {
    setStep(step + 1);
    console.log(form.getFieldValue());
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (name) {
      setItems([...items, name]);
      setName("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <div className="SignUpForm">
      <Form
        name="formStepTwo"
        form={form}
        layout={"vertical"}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <div className="flex flex-col justify-center">
          <Form.Item
            label={<CustomLabel>Full name:</CustomLabel>}
            name="name"
            required={false}
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
            initialValue={form.getFieldValue(["name"])}
          >
            <GeneralInput placeholder="Type your name" />
          </Form.Item>

          <Form.Item
            label={<CustomLabel>Job title :</CustomLabel>}
            name="titleJob"
            required={false}
            rules={[
              { required: true, message: "Please input your job title!" },
            ]}
            initialValue={form.getFieldValue(["titleJob"])}
          >
            <GeneralInput placeholder="Type your job title" />
          </Form.Item>

          <Form.Item
            label={<CustomLabel>Field of working :</CustomLabel>}
            name="fieldOfWorking"
            required={false}
            rules={[
              {
                required: true,
                message: "Please choose your field of working",
              },
            ]}
            initialValue={form.getFieldValue(["fieldOfWorking"])}
          >
            <Select
              mode="tags"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <div className="flex gap-2 mt-1">
                    <div className="w-8/12">
                      <GeneralInput
                        placeholder="Please enter item"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                        style={{ padding: "0.5rem" }}
                      />
                    </div>
                    <div className="w-4/12">
                      <AddItemButton
                        onClick={addItem}
                        style={{ padding: "0.5rem" }}
                      >
                        <PlusOutlined />
                        <span> Add item</span>
                      </AddItemButton>
                    </div>
                  </div>
                </>
              )}
              options={items.map((item) => ({ label: item, value: item }))}
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="mt-4 py-3 border w-[100%] bg-teal-600 rounded-full text-white font-semibold hover:bg-teal-700"
            >
              Continue
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

const Form3 = (props) => {
  return <div>Đăng ký thành công</div>;
};

const SignUpForm = (props) => {
  const { step, form, setStep } = props;

  return (
    <div className="text-center">
      {step === 0 && <Form1 form={form} setStep={setStep} step={step} />}
      {step === 1 && <Form2 form={form} setStep={setStep} step={step} />}
      {step === 2 && <Form3 form={form} setStep={setStep} step={step} />}
    </div>
  );
};

export default SignUpForm;
