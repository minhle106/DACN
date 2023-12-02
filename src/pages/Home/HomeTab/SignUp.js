import React, { useEffect, useState } from "react";
import SignUpForm from "../../../features/loginSignUp/SignUpForm";
import signUp_img from "../../../assets/images/signup.webp";
import { Form } from "antd";
import { CustomSteps } from "../../../components/StyledComponent";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../stores/reducer/authSlice";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../route/paths";

const SignUp = () => {
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();
  const { isLoggedIn } = useSelector(selectAuth);
  const navigate = useNavigate();

  const handleChange = (value) => {
    if (step > value && step !== 2) {
      setStep(value);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(PATH.HOME);
    }
  }, [isLoggedIn]);

  return (
    <div className="SignUp">
      <div className="bg-white rounded-lg border shadow px-10 py-10">
        <div className="text-teal-700 font-light">
          <span className="text-[3rem]">Welcome to Glassdoor!</span>
        </div>
        <CustomSteps
          style={{ padding: "32px 16px" }}
          onChange={handleChange}
          current={step}
        >
          <CustomSteps.Step
            title="Register account"
            description="Enter your email & password"
          />
          <CustomSteps.Step
            title="Other information"
            description="More information about yourself"
          />
          <CustomSteps.Step
            title="Email verification"
            description="Enter your OTP code"
          />
        </CustomSteps>
        {step === 2 ? (
          <h1>
            dang ky thanh cong ...... xac nhan email de su dung nhieu tinh nang
            hon
          </h1>
        ) : (
          <div className="flex gap-5">
            <div className="w-full lg:w-[37.5%] ">
              <SignUpForm step={step} form={form} setStep={setStep} />
            </div>
            <div className="w-[62.5%] max-lg:hidden mt-10">
              <img src={signUp_img} alt="login illustration" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
