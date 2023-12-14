import { Form, notification } from "antd";
import { DigitInput } from "../../components/StyledComponent";
import { useEffect, useRef, useState } from "react";

const VerifyEmail = ({ form, setStep }) => {
  const [formEmail] = Form.useForm();
  const digit = [1, 2, 3, 4, 5, 6];
  const listRef = useRef([]);
  const [error, setError] = useState(false);

  const onFinish = (values) => {
    setError(false);
    let code = "";
    for (const item of digit) {
      code += String(values[`digit${item}`]);
    }
    form.setFieldValue("code", code);
    notification.success({
      message: "Success",
      description: "Confirm email successfully!",
    });
    setTimeout(() => setStep(2), [2000]);
  };

  useEffect(() => {
    listRef.current[1].focus();
  }, []);

  return (
    <div className="text-center border border-[#d5d5d5] w-full md:w-[90%] lg:w-[75%] xl:w-[55%] mx-auto px-10 py-10 rounded-lg">
      <div className="text-[25px] font-medium">Verify your email address</div>
      <div className="text-gray-500 mb-[50px]">
        We emailed you a six-digit code to {form.getFieldValue("email")}. Enter
        the code below to confirm your email address
      </div>
      <Form
        form={formEmail}
        name="verifyEmail"
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className="min-[420px]:flex gap-[15px] justify-center">
          {digit.map((item) => (
            <Form.Item name={`digit${item}`}>
              <DigitInput
                ref={(element) => {
                  if (element) {
                    listRef.current[item] = element;
                  } else {
                    delete listRef.current[item];
                  }
                }}
                onChange={() => {
                  if (item !== 6) {
                    listRef.current[item + 1].focus();
                  } else {
                    let count = 0;
                    for (const item of digit) {
                      if (formEmail.getFieldValue(`digit${item}`)) count++;
                    }
                    if (count === 6) formEmail.submit();
                    else setError(true);
                  }
                }}
                onKeyDown={() => {
                  if (item === 6) {
                    setTimeout(() => {
                      listRef.current[item].blur();
                    }, [100]);
                  }
                }}
                onFocus={() => {
                  formEmail.setFieldValue(`digit${item}`, "");
                }}
              />
            </Form.Item>
          ))}
        </div>
        {error && (
          <div className="text-red-600">
            Please enter the email confirmation code correctly!
          </div>
        )}
      </Form>
      <div className="mt-[20px]">
        <div className="mb-[15px]">
          If you didn't receive a code?{" "}
          <span className="cursor-pointer underline text-blue-700 hover:text-blue-800 font-medium">
            Resend now
          </span>
        </div>
        <span className=" bg-gray-300 py-2 rounded-lg px-4">
          Make sure to keep this window open while you're entering the email
          confirmation code
        </span>
      </div>
    </div>
  );
};

export default VerifyEmail;
