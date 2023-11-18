import React, { useState, useRef, useEffect } from "react";
import { Form, Select, notification } from "antd";
import {
  BigInput,
  BigPasswordInput,
  AddItemButton,
  BigRangePicker,
  BigLabel,
  BigSelect,
} from "../../components/StyledComponent";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FIELD_OF_WORK, QUANTITY_EMPLOYEE, ROLE } from "../../ultils/constant";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  registerSuccess,
  selectAuth,
} from "../../stores/reducer/authSlice";
import { capitalizeFirstLetter } from "../../ultils/helpFunc";

const Form1 = (props) => {
  const { form, setStep, step } = props;
  const handleSubmit = () => {
    setStep(step + 1);
  };

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
          label={<BigLabel>Email:</BigLabel>}
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
          initialValue={form.getFieldValue(["email"])}
        >
          <BigInput placeholder="Type your email" />
        </Form.Item>

        <Form.Item
          label={<BigLabel>Password:</BigLabel>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          initialValue={form.getFieldValue(["password"])}
          hasFeedback
        >
          <BigPasswordInput placeholder="Type your password" />
        </Form.Item>

        <Form.Item
          label={<BigLabel>Confirm password:</BigLabel>}
          name="confirmPassword"
          dependencies={["password"]}
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
          <BigPasswordInput placeholder="Type your password" />
        </Form.Item>

        <Form.Item
          label={<BigLabel>Select your role: </BigLabel>}
          name="role"
          rules={[{ required: true, message: "Please choose your role!" }]}
          initialValue={form.getFieldValue(["role"])}
        >
          <BigSelect
            placeholder="Choose your role"
            onChange={(value) => {
              form.setFieldValue(["role"], value);
            }}
          >
            {Object.values(ROLE).map((item, index) => (
              <Select.Option value={item} key={index}>
                {capitalizeFirstLetter(item)}
              </Select.Option>
            ))}
          </BigSelect>
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
  const { isRegister } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const { form, setStep, step } = props;
  const [items, setItems] = useState(FIELD_OF_WORK);
  const [name, setName] = useState("");
  const inputRef = useRef();

  const handleRegister = () => {
    let start, end;
    if (
      form.getFieldValue(["role"]) === "Student" &&
      form.getFieldValue(["yearsOfStudy"])
    ) {
      start = new Date(String(form.getFieldValue(["yearsOfStudy"])[0]));
      end = new Date(String(form.getFieldValue(["yearsOfStudy"])[1]));
    }
    const formInput = {
      email: form.getFieldValue(["email"]),
      password: form.getFieldValue(["password"]),
      role: form.getFieldValue(["role"]),
      fullName: form.getFieldValue(["fullName"]),
      jobTitle: form.getFieldValue(["jobTitle"]),
      fieldOfWork: form.getFieldValue(["fieldOfWork"]),
      schoolName: form.getFieldValue(["schoolName"]),
      yearsOfStudy: start
        ? [start.getUTCFullYear(), end.getUTCFullYear()]
        : start,
      companyAddress: form.getFieldValue(["companyAddress"]),
      numberOfEmployees: form.getFieldValue(["numberOfEmployees"]),
      companyName: form.getFieldValue(["companyName"]),
    };
    dispatch(register(formInput));
  };

  useEffect(() => {
    if (isRegister) {
      notification.success({
        message: "Success",
        description: "Registration successful!",
      });
      setStep(step + 1);
      dispatch(registerSuccess(false));
    }
  }, [isRegister]);

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
        onFinish={handleRegister}
        autoComplete="off"
      >
        <div className="flex flex-col justify-center">
          <Form.Item
            label={<BigLabel>Full name:</BigLabel>}
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
            initialValue={form.getFieldValue(["fullName"])}
          >
            <BigInput placeholder="Type your name" />
          </Form.Item>
          {form.getFieldValue(["role"]) === ROLE.EMPLOYEE && (
            <div>
              <Form.Item
                label={<BigLabel>Job title:</BigLabel>}
                name="jobTitl"
                initialValue={form.getFieldValue(["jobTitle"])}
              >
                <BigInput placeholder="Type your job title" />
              </Form.Item>

              <Form.Item
                label={<BigLabel>Field of work :</BigLabel>}
                name="fieldOfWork"
                initialValue={form.getFieldValue(["fieldOfWork"])}
              >
                <BigSelect
                  placeholder="Choose your field of work"
                  mode="tags"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <div className="flex gap-2 mt-1">
                        <div className="w-8/12">
                          <BigInput
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
            </div>
          )}
          {form.getFieldValue(["role"]) === ROLE.STUDENT && (
            <div>
              <Form.Item
                label={<BigLabel>School Name: </BigLabel>}
                name="schoolName"
                initialValue={form.getFieldValue(["schoolName"])}
              >
                <BigInput placeholder="Type your school name" />
              </Form.Item>
              <Form.Item
                label={<BigLabel>Years of study: </BigLabel>}
                name="yearsOfStudy"
                initialValue={form.getFieldValue(["yearsOfStudy"])}
              >
                <BigRangePicker picker="year" />
              </Form.Item>
            </div>
          )}
          {form.getFieldValue(["role"]) === ROLE.COMPANY && (
            <div>
              <Form.Item
                label={<BigLabel>Company name:</BigLabel>}
                name="companyName"
                rules={[
                  {
                    required: true,
                    message: "Please input your company name!",
                  },
                ]}
                initialValue={form.getFieldValue(["companyName"])}
              >
                <BigInput placeholder="Type your company name" />
              </Form.Item>
              <Form.Item
                label={<BigLabel>Company address:</BigLabel>}
                name="companyAddress"
                initialValue={form.getFieldValue(["companyAddress"])}
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <BigInput placeholder="Type your address" />
              </Form.Item>
              <Form.Item
                label={<BigLabel>Number of employees: </BigLabel>}
                name="numberOfEmployees"
                initialValue={form.getFieldValue(["numberOfEmployees"])}
              >
                <BigSelect
                  placeholder="Choose your number of employees"
                  onChange={(value) => {
                    form.setFieldValue(["numberOfEmployees"], value);
                  }}
                >
                  {QUANTITY_EMPLOYEE.map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
                </BigSelect>
              </Form.Item>
            </div>
          )}

          <Form.Item>
            <button
              type="submit"
              className="mt-4 py-3 border w-[100%] bg-teal-600 rounded-full text-white font-semibold hover:bg-teal-700"
            >
              Register
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

const SignUpForm = (props) => {
  const { step, form, setStep } = props;

  return (
    <div className="text-center">
      {step === 0 && <Form1 form={form} setStep={setStep} step={step} />}
      {step === 1 && <Form2 form={form} setStep={setStep} step={step} />}
    </div>
  );
};

export default SignUpForm;
