import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SolutionOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Button, theme, notification } from "antd";
import { CustomButton, MenuDashboard } from "../../components/StyledComponent";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../route/paths";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/reducer/authSlice";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          minHeight: "100vh",
          background: "#3b3a48",
        }}
        width="230px"
      >
        <div className="sticky top-0">
          <div className="flex justify-center ">
            <img
              className="w-[10rem]"
              src="https://wallpapercave.com/wp/wp8864237.png"
              alt="logo"
            />
          </div>
          <MenuDashboard
            mode="inline"
            selectedKeys={location.pathname}
            defaultOpenKeys={["3", "4"]}
            className="text-white bg-[#3b3a48] px-2 "
            items={[
              {
                key: PATH.DASHBOARD,
                icon: <PieChartOutlined className="me-2" />,
                label: "Dashboard",
                onClick: () => {
                  navigate(PATH.DASHBOARD);
                },
              },
              {
                key: PATH.EMPLOYEE_MANAGEMENT,
                icon: <UserOutlined className="me-2" />,
                label: "Employee Management",
                onClick: () => {
                  navigate(PATH.EMPLOYEE_MANAGEMENT);
                },
              },
              {
                key: "3",
                icon: <SolutionOutlined className="me-2" />,
                label: "Job Management",
                children: [
                  {
                    key: PATH.POSTED_JOB,
                    label: "Posted Jobs",
                    onClick: () => {
                      navigate(PATH.POSTED_JOB);
                    },
                  },
                  {
                    key: "32",
                    label: "Applied CV",
                  },
                ],
              },
              {
                key: PATH.AUTHORIZATION_SETTING,
                icon: <SettingOutlined className="me-2" />,
                label: "Authorization Setting",
                onClick: () => {
                  navigate(PATH.AUTHORIZATION_SETTING);
                },
              },
            ]}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex justify-between items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <CustomButton
              onClick={() => {
                dispatch(logout());
                notification.success({
                  message: "Success",
                  description: "Logout successful!",
                });
                navigate("/");
              }}
              style={{
                width: 100,
                height: 40,
              }}
              className="flex items-center bg-black font-semibold text-white hover:text-black me-4 hover:bg-gray-200 hover:border-black"
            >
              <LogoutOutlined className="me-2b text-xl bg-black bg-transparent me-2" />
              <div>Logout</div>
            </CustomButton>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            height: "100%",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
