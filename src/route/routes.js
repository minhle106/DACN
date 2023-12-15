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
  JobDetail,
  CVBuilder,
  CandidateManagement,
  Profile,
  StoredCV,
} from "../pages/pages";

export const routes = [
  {
    element: <Home />,
    path: PATH.ROOT,
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
      {
        path: PATH.JOB_DETAIL,
        element: <JobDetail />,
      },
      {
        path: PATH.CV_BUILDER,
        element: (
          <RequireAuth>
            <CVBuilder />
          </RequireAuth>
        ),
      },
      {
        path: PATH.PROFILE,
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
    path: PATH.DASHBOARD,
    children: [
      {
        path: PATH.POSTED_JOB,
        element: <PostedJobs />,
      },
      {
        path: PATH.CANDIDATE_MANAGEMENT,
        element: <CandidateManagement />,
      },
      {
        path: PATH.STORED_CV,
        element: <StoredCV />,
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
