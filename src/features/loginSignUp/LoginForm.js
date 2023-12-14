import React, { useEffect, useRef } from "react";
import {
  BigInput,
  BigPasswordInput,
  BigLabel,
} from "../../components/StyledComponent";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { notification, Form } from "antd";
import { useNavigate } from "react-router-dom";
import {
  login,
  selectAuth,
  setIsRegister,
} from "../../stores/reducer/authSlice";
import { PATH } from "../../route/paths";

const LoginForm = () => {
  const { isLogin, isRegister } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const inputRef = useRef();
  const handleSubmit = (value) => {
    dispatch(login(value));
  };

  useEffect(() => {
    if (isLogin) {
      notification.success({
        message: "Success",
        description: "Logged in successfully!",
      });
      navigate(PATH.COMMUNITY);
    }
    if (isRegister) {
      dispatch(setIsRegister(false));
    }
  }, [isLogin]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form
      name="loginForm"
      form={form}
      layout={"vertical"}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label={<BigLabel>Email:</BigLabel>}
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
        <BigInput ref={inputRef} placeholder="Type your email" />
      </Form.Item>

      <Form.Item
        label={<BigLabel>Password:</BigLabel>}
        name="password"
        required={false}
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <BigPasswordInput placeholder="Type your password" />
      </Form.Item>
      <Link className="text-blue-800 font-semibold hover:text-blue-900">
        Forgot password?
      </Link>
      <Form.Item>
        <button
          type="submit"
          className="mt-4 py-3 border w-[100%] bg-blue-700 rounded-lg text-white font-semibold hover:bg-blue-800"
        >
          Sign In
        </button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
