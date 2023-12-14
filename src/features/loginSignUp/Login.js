import { useSelector } from "react-redux";
import { selectAuth } from "../../stores/reducer/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PATH } from "../../route/paths";
import LoginForm from "./LoginForm";
import LoginImg from "../../assets/images/Login.png";

const Login = () => {
  const { isLoggedIn } = useSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(PATH.COMMUNITY);
    }
  }, [isLoggedIn]);

  return (
    <div
      className="bg-white rounded-lg border shadow px-10 py-10"
      style={{ minHeight: window.innerHeight - 135 }}
    >
      <div className="text-[50px] text-blue-900">
        Find jobs through your community
      </div>
      <div className="flex gap-[150px]">
        <div className="w-full lg:w-[45%]">
          <div className="mt-10">
            <LoginForm />
          </div>
        </div>
        <div className="w-[35%] max-lg:hidden flex justify-center items-center ">
          <img src={LoginImg} alt="Login illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
