import React from "react";
import { Form } from "antd";
import { GeneralInput, PasswordInput } from "../../components/FormComponent";
import { CustomLabel } from "../../components/CustomComponent";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "./loginSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleSubmit = (value) => {
    // dispatch(login(value));
    console.log(value);
  };
  return (
    <Form
      name="loginForm"
      form={form}
      layout={"vertical"}
      onFinish={handleSubmit}
      autoComplete="off"
    >
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
      >
        <GeneralInput />
      </Form.Item>

      <Form.Item
        label={<CustomLabel>Password:</CustomLabel>}
        name="password"
        required={false}
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <PasswordInput />
      </Form.Item>
      <Link className="text-teal-600 font-semibold hover:text-teal-800">
        Forgot password?
      </Link>
      <Form.Item>
        <button
          type="submit"
          className="mt-4 py-3 border w-[100%] bg-teal-600 rounded-full text-white font-semibold hover:bg-teal-700"
        >
          Sign In
        </button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
