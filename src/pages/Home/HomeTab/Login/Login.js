import React from "react";
import login_img from "../../../../assets/images/login.png";
import LoginForm from "../../../../features/loginSignUp/LoginForm";

const Login = () => {
  return (
    <div className="bg-white rounded-lg border shadow px-10 py-10">
      <div className="text-[3.5rem] text-teal-700 font-light">
        Find jobs through your community
      </div>
      <div className="flex gap-10 items-center">
        <div className="w-full lg:w-[45%]">
          <div className="mt-10">
            <LoginForm />
          </div>
        </div>
        <div className="w-[55%] flex justify-center items-center max-lg:hidden">
          <img src={login_img} alt="illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
