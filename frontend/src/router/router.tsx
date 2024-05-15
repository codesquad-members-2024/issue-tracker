import { Navigate, createBrowserRouter } from "react-router-dom";
import useUserStore from "../hooks/useUserStore";
import Login from "../components/login/Login";
import Registration from "../components/registration/Registration";
import Main from "../components/Main";
import IssueCreator from "../components/creator/IssueCreator";
import IssueDetail from "../components/issue/IssueDetail";

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
    path: "/new-issue",
    element: <IssueCreator />,
  },
  {
    path: "/issue-detail", // get /issues/{issueId} 구현 완료 시 수정
    element: <IssueDetail />,
  }
]);
