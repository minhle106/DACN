import { PATH } from "./paths";
import RequireAuth from "./RequireAuth";

import {
  Home,
  Community,
  Jobs,
  Companies,
  Login,
  SignUp,
  Dashboard,
  PostedJobs,
  EmployeeManagement,
  AuthorizationSetting,
  Unauthorized,
  Forbidden,
  NotFound,
} from "../pages/pages";

export const routes = [
  {
    element: <Home />,
    path: PATH.HOME1,
  },
  {
    element: <Home />,
    path: PATH.HOME,
    children: [
      {
        path: PATH.COMMUNITY,
        element: <Community />,
      },
      {
        path: PATH.JOB,
        element: <Jobs />,
      },
      {
        path: PATH.COMPANY,
        element: <Companies />,
      },
      {
        path: PATH.LOGIN,
        element: <Login />,
      },
      {
        path: PATH.SIGN_UP,
        element: <SignUp />,
      },
    ],
  },
  {
    element: (
      //<RequireAuth>
      <Dashboard />
      // </RequireAuth>
    ),
    path: PATH.DASHBOARD,
    children: [
      {
        path: PATH.POSTED_JOB,
        element: <PostedJobs />,
      },
      {
        path: PATH.EMPLOYEE_MANAGEMENT,
        element: <EmployeeManagement />,
      },
      {
        path: PATH.AUTHORIZATION_SETTING,
        element: <AuthorizationSetting />,
      },
    ],
  },
  {
    path: PATH.UNAUTHORIZED,
    element: <Unauthorized />,
  },
  {
    path: PATH.FORBIDDEN,
    element: <Forbidden />,
  },
  {
    path: PATH.NOT_FOUND,
    element: <NotFound />,
  },
];
