import React, { useEffect, useState } from "react";
import SignUpForm from "../../../../features/signUp/SignUpForm";
import signUp_img from "../../../../assets/images/signup.webp";
import "./SignUp.scss";
import { Form } from "antd";

import { Steps } from "antd";

const SignUp = () => {
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();

  const handleChange = (value) => {
    if (step > value) {
      setStep(value);
    }
  };

  return (
    <div className="SignUp">
      <div className="bg-white rounded-lg border shadow px-10 py-10">
        <div className="text-teal-700 font-light">
          {step === 0 && (
            <span className="text-[3rem]">Welcome to Glassdoor!</span>
          )}
          {step === 1 && <span className="text-[3rem]">What's your name?</span>}
          {step === 2 && (
            <span className="text-[3rem]">Hi Lê! What's your location?</span>
          )}
          {step === 3 && (
            <span className="text-[3rem]">
              What role do you use websites for?
            </span>
          )}
          {step === 31 && (
            <span className="text-[3rem]">
              What role do you use websites for?
            </span>
          )}
          {step === 32 && (
            <span className="text-[3rem]">
              What role do you use websites for?
            </span>
          )}
          {step === 33 && (
            <span className="text-[3rem]">
              What role do you use websites for?
            </span>
          )}
        </div>
        <Steps
          style={{ padding: "32px 16px" }}
          onChange={handleChange}
          current={step}
        >
          <Steps.Step
            title="Register account"
            description="Enter your email & password"
          />
          <Steps.Step
            title="Other information"
            description="More information about yourself"
          />
          <Steps.Step
            title="Email verification"
            description="Enter your OTP code"
          />
        </Steps>
        <div className="flex gap-5">
          <div className="w-full lg:w-[37.5%] ">
            <SignUpForm step={step} form={form} setStep={setStep} />
          </div>
          <div className="w-[62.5%] max-lg:hidden mt-10">
            <img src={signUp_img} alt="login illustration" />
          </div>
        </div>

        {/* <div className="w-6/12">
        <div className="text-teal-700 font-light">
          {step === 1 && (
            <span className="text-[3rem]">
              Welcome to Glassdoor! Enter your email & password
            </span>
          )}
          {step === 2 && <span className="text-[3rem]">What's your name?</span>}
          {step === 3 && (
            <span className="text-[3rem]">Hi Lê! What's your location?</span>
          )}
          {step === 4 && (
            <span className="text-[3rem]">
              What role do you use websites for?
            </span>
          )}
          {step === 41 && (
            <span className="text-[3rem]">
              What role do you use websites for?
            </span>
          )}
          {step === 42 && (
            <span className="text-[3rem]">
              What role do you use websites for?
            </span>
          )}
          {step === 43 && (
            <span className="text-[3rem]">
              What role do you use websites for?
            </span>
          )}
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          {step === 1 && (
            <div>
              <div>
                <label htmlFor="email" className="text-gray-500">
                  Email:
                </label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="pwd" className="text-gray-500">
                  Password:
                </label>
                <br />
                <input
                  type="passworđ"
                  id="pwd"
                  name="pwd"
                  required
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="confirmpwd" className="text-gray-500">
                  Confirm password:
                </label>
                <br />
                <input
                  type="password"
                  id="confirmpwd"
                  name="confirmpwd"
                  required
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded"
                />
              </div>
              <div className="mt-8">
                <div
                  onClick={() => setStep(2)}
                  className="text-center py-3 border w-[25rem] bg-teal-600 rounded-full font-semibold text-white"
                >
                  Continue
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div>
                <label htmlFor="fname" className="text-gray-500">
                  First name:
                </label>
                <br />
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  required
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="lname" className="text-gray-500">
                  Last name:
                </label>
                <br />
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  required
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded"
                />
              </div>
              <div className="mt-8">
                <div
                  onClick={() => setStep(3)}
                  className="text-center py-3 border w-[25rem] bg-teal-600 rounded-full font-semibold text-white"
                >
                  Continue
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <div>
                <label htmlFor="country" className="text-gray-500">
                  Country/Region:
                </label>
                <br />
                <select
                  id="country"
                  name="country"
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded appearance-none"
                >
                  <option value="">-- Select your country/region --</option>
                  <option value="usa">USA</option>
                  <option value="canada">Canada</option>
                  <option value="england">England</option>
                  <option value="france">France</option>
                  <option value="germany">Germany</option>
                </select>
              </div>
              <div className="mt-2">
                <label htmlFor="city" className="text-gray-500">
                  City/District:
                </label>
                <br />
                <select
                  id="city"
                  name="city"
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded appearance-none"
                >
                  <option value="">-- Select your city/district --</option>
                  <option value="new-york">New York</option>
                  <option value="los-angeles">Los Angeles</option>
                  <option value="chicago">Chicago</option>
                  <option value="miami">Miami</option>
                  <option value="san-francisco">San Francisco</option>
                </select>
              </div>
              <div className="mt-8">
                <div
                  onClick={() => setStep(4)}
                  className="text-center py-3 border w-[25rem] bg-teal-600 rounded-full font-semibold text-white"
                >
                  Continue
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <div className="">
                <div
                  onClick={() => setStep(41)}
                  className="text-center py-3 border w-[25rem] bg-teal-600 rounded font-semibold text-white cursor-pointer"
                >
                  I'm a employee
                </div>
              </div>
              <div className="mt-2">
                <div
                  onClick={() => setStep(42)}
                  className="text-center py-3 border w-[25rem] bg-teal-600 rounded font-semibold text-white cursor-pointer"
                >
                  I'm a student
                </div>
              </div>
              <div className="mt-2">
                <div
                  onClick={() => setStep(43)}
                  className="text-center py-3 border w-[25rem] bg-teal-600 rounded font-semibold text-white cursor-pointer"
                >
                  I represent a company
                </div>
              </div>
            </div>
          )}
          {step === 42 && (
            <div>
              <div>
                <label htmlFor="university" className="text-gray-500">
                  University:
                </label>
                <br />
                <select
                  id="university"
                  name="university"
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded appearance-none"
                >
                  <option value="">-- Select your university --</option>
                  <option value="BK">Bách Khoa</option>
                  <option value="USSH">KH Xã Hội & Nhân Văn</option>
                  <option value="UNL">Nông Lâm</option>
                  <option value="UIT">Công Nghệ Thông Tin</option>
                  <option value="KHTN">Khoa Học Tự Nhiên</option>
                </select>
              </div>
              <div className="flex mt-2">
                <div className="me-4">
                  <label htmlFor="startYear" className="text-gray-500">
                    Start year:
                  </label>
                  <br />
                  <select
                    id="startYear"
                    name="startYear"
                    className="mt-2 px-4 py-4 border w-[12rem] hover:border-2 border-black rounded appearance-none"
                  >
                    <option value="">-- Start year --</option>
                    <option value="BK">2022</option>
                    <option value="USSH">2023</option>
                  </select>
                </div>
                <div className="me-4">
                  <label htmlFor="graduateYear" className="text-gray-500">
                    Graduate year:
                  </label>
                  <br />
                  <select
                    id="graduateYear"
                    name="graduateYear"
                    className="mt-2 px-4 py-4 border w-[12rem] hover:border-2 border-black rounded appearance-none"
                  >
                    <option value="">-- Graduate year --</option>
                    <option value="BK">2022</option>
                    <option value="USSH">2023</option>
                  </select>
                </div>
              </div>
              <div className="mt-8">
                <div
                  onClick={() => setStep(5)}
                  className="text-center py-3 border w-[25rem] bg-teal-600 rounded-full font-semibold text-white"
                >
                  Continue
                </div>
              </div>
            </div>
          )}
          {step === 41 && (
            <div>
              <div>
                <label htmlFor="titleJob" className="text-gray-500">
                  Title job:
                </label>
                <br />
                <input
                  type="text"
                  id="titleJob"
                  name="titleJob"
                  required
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="field" className="text-gray-500">
                  Field of working:
                </label>
                <br />
                <input
                  type="text"
                  id="field"
                  name="field"
                  required
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded"
                />
              </div>
              <div className="mt-8">
                <div
                  onClick={() => setStep(5)}
                  className="text-center py-3 border w-[25rem] bg-teal-600 rounded-full font-semibold text-white"
                >
                  Continue
                </div>
              </div>
            </div>
          )}
          {step === 43 && (
            <div>
              <div>
                <label htmlFor="company" className="text-gray-500">
                  Company name:
                </label>
                <br />
                <select
                  id="company"
                  name="company"
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded appearance-none"
                >
                  <option value="">-- Select your company --</option>
                  <option value="BK">FPT Software</option>
                  <option value="USSH">DX Solutions</option>
                  <option value="UNL">MWG</option>
                  <option value="UIT">Boasch</option>
                  <option value="KHTN">Atware</option>
                </select>
              </div>
              <div className="mt-2">
                <label htmlFor="quantity" className="text-gray-500">
                  Numbers of employee:
                </label>
                <br />
                <select
                  id="quantity"
                  name="quantity"
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded appearance-none"
                >
                  <option value="">-- Select quantity --</option>
                  <option value="1">1-50</option>
                  <option value="2">50-150</option>
                  <option value="3">150-500</option>
                  <option value="4">500-1000</option>
                  <option value="5">1000+</option>
                </select>
              </div>
              <div className="mt-2">
                <label htmlFor="address" className="text-gray-500">
                  Address:
                </label>
                <br />
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  className="mt-2 px-4 py-4 border w-[25rem] hover:border-2 border-black rounded"
                />
              </div>
              <div className="mt-8">
                <div
                  onClick={() => setStep(5)}
                  className="text-center py-3 border w-[25rem] bg-teal-600 rounded-full font-semibold text-white"
                >
                  Continue
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
      <div className="w-6/12 flex items-center">
        <img src={signup} alt="illustration" />
      </div> */}
      </div>
    </div>
  );
};

export default SignUp;
