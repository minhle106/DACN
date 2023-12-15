import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../stores/reducer/authSlice";
import { Avatar, Button, notification } from "antd";
import {
  BellOutlined,
  DownOutlined,
  FlagOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CustomDropdown } from "./StyledComponent";
import { PATH } from "../route/paths";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo } from "../stores/reducer/userSlice";
import { useQuery } from "@tanstack/react-query";
import AvatarDefault from "../assets/images/AvatarDefault.png";

const UserDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(selectAuth);

  const { data: userData } = useQuery({
    queryKey: ["userInfo", userInfo],
    queryFn: () => getUserInfo(),
    staleTime: Infinity,
  });

  const items = [
    {
      key: "1",
      label: (
        <Link to={PATH.PROFILE} className="mt-10">
          <UserOutlined className="me-2 h-[30px]" /> Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          <FlagOutlined className="me-2 h-[30px]" /> Activities
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            dispatch(logout());
            notification.success({
              message: "Success",
              description: "Logout successful!",
            });
            navigate(PATH.COMMUNITY);
          }}
        >
          <LogoutOutlined className="me-2 h-[30px]" /> Logout
        </div>
      ),
      danger: true,
    },
  ];

  return (
    <div className="flex items-center">
      <Button
        icon={
          <BellOutlined
            style={{ fontSize: 24 }}
            className="text-blue-700 me-4"
          />
        }
        style={{
          border: 0,
        }}
      />
      <div className="flex items-center gap-[10px]">
        <Link to={PATH.PROFILE} className="flex items-center gap-[10px]">
          <div className="text-blue-700 font-semibold">
            {userData?.fullName}
          </div>
          <Avatar size="large" src={AvatarDefault} />
        </Link>
        <CustomDropdown menu={{ items }}>
          <DownOutlined className="cursor-pointer" />
        </CustomDropdown>
      </div>
    </div>
  );
};

export default UserDropDown;
