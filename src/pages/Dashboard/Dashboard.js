import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SolutionOutlined,
  UserOutlined,
  SettingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import { CustomSearch, MenuDashboard } from "../../components/StyledComponent";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../route/paths";
import JobCascadeLogo from "../../assets/images/JobCascadeLogo.png";
import UserDropDown from "../../components/UserDropdown";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
          background: "#242630",
        }}
        width="260px"
      >
        <div className="sticky top-0">
          <div
            onClick={() => navigate(PATH.COMMUNITY)}
            className="cursor-pointer flex justify-center bg-white mb-5"
          >
            <img className="w-[155px]" src={JobCascadeLogo} alt="Logo" />
          </div>
          <MenuDashboard
            mode="inline"
            selectedKeys={location.pathname}
            defaultOpenKeys={["3", "4"]}
            className="text-white bg-[#242630] px-2 "
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
                    key: PATH.CANDIDATE_MANAGEMENT,
                    label: "Candidate Management",
                    onClick: () => {
                      navigate(PATH.CANDIDATE_MANAGEMENT);
                    },
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
          className="sticky top-0 z-10"
        >
          <div className="flex justify-between items-center me-[28px] border-b">
            <div className="flex w-[50%]">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 84,
                  height: 64,
                  borderRight: "1px solid #d5d5d5",
                  borderLeft: "1px solid #d5d5d5",
                  borderRadius: 0,
                }}
              />
              <CustomSearch
                placeholder="Type to search ..."
                prefix={<SearchOutlined className="text-xl me-2" />}
              />
            </div>
            <UserDropDown />
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
