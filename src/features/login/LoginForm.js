import React, { useEffect } from "react";
import { Form } from "antd";
import { GeneralInput, PasswordInput } from "../../components/FormComponent";
import { CustomLabel } from "../../components/CustomComponent";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "./loginSlice";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { STATUS } from "../../ultils/constant";
import { selectAuth } from "../../stores/reducer/authSlice";

const LoginForm = () => {
  const { setUserInfo } = useAuth();
  const { userInfo, status: loginStatus, isLoggedIn } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const handleSubmit = (value) => {
    dispatch(login(value));
    setUserInfo(userInfo);
  };
  useEffect(() => {
    if (loginStatus === STATUS.ERROR) {
      notification.error({
        message: "Failed",
        description: "Email or password is incorrect!",
      });
    }
  }, [loginStatus]);
  useEffect(() => {
    if (isLoggedIn) {
      notification.success({
        message: "Success",
        description: "Logged in successfully!",
      });
      navigate("/community");
    }
  }, [isLoggedIn]);

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
