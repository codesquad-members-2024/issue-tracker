import { Navigate, createBrowserRouter } from "react-router-dom";
import useUserStore from "../hooks/stores/useUserStore";
import Login from "../components/login/Login";
import Registration from "../components/registration/Registration";
import Main from "../components/Main";
import IssueCreator from "../components/issue/new/IssueCreator";
import IssueDetail from "../components/issue/detail/IssueDetail";
import LabelList from "../components/label/LabelList";
import MilestoneList from "../components/milestone/MilestoneList";
import { LabelProvider } from "../contexts/LabelContext";
import { MilestoneProvider } from "../contexts/MilestoneContext";

interface AuthRouteProps {
  children: React.ReactNode;
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const { isLoggedIn } = useUserStore();

  if (!isLoggedIn) return <Navigate to="/login" />;

  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Main />
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/new",
    element: <IssueCreator />,
  },
  {
    path: "/issue/:issueId",
    element: <IssueDetail />,
  },
  {
    path: "/labels",
    element: (
      <LabelProvider>
        <LabelList />
      </LabelProvider>
    ),
  },
  {
    path: "/milestones",
    element: (
      <MilestoneProvider>
        <MilestoneList />
      </MilestoneProvider>
    ),
  },
]);
