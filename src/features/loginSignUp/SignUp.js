import React, { useEffect, useState } from "react";
import SignUpForm from "./SignUpForm";
import SignUpImg from "../../assets/SignUp.webp";
import { Form, notification } from "antd";
import { CustomSteps } from "../../components/StyledComponent";
import { useSelector } from "react-redux";
import { selectAuth } from "../../stores/reducer/authSlice";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../route/paths";
import VerifyEmail from "./VerifyEmail";
import SelectRole from "./SelectRole";
const SignUp = () => {
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();
  const { isLoggedIn, isRegister } = useSelector(selectAuth);
  const navigate = useNavigate();

  const handleChange = (value) => {
    if (step > value && step < 2) {
      setStep(value);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(PATH.HOME);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isRegister) {
      notification.success({
        message: "Success",
        description: "Registration successful!",
      });
      navigate(PATH.LOGIN);
    }
  }, [isRegister]);

  return (
    <div
      className="bg-white rounded-lg border shadow px-10 py-10"
      style={{ minHeight: window.innerHeight - 135 }}
    >
      <div className="text-blue-900 font-medium">
        <span className="text-[3rem]">Welcome to JobCascade!</span>
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
          title="Email verification"
          description="Enter your OTP code"
        />
        <CustomSteps.Step
          title="Select role"
          description="Choose your account type: Employee, Student or Business"
        />
        <CustomSteps.Step
          title="Other information"
          description="More information about yourself"
        />
      </CustomSteps>
      {step === 1 && <VerifyEmail form={form} setStep={setStep} />}
      {step === 2 && <SelectRole form={form} setStep={setStep} />}
      {(step === 3 || step === 0) && (
        <div className="flex gap-5">
          <div className="w-full lg:w-[37.5%] ">
            <SignUpForm step={step} form={form} setStep={setStep} />
          </div>
          <div className="w-[62.5%] max-lg:hidden mt-1 flex justify-center items-center">
            <img src={SignUpImg} width="75%" alt="Sign up illustration" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
