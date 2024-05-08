import { Navigate, createBrowserRouter } from "react-router-dom";
import useUserStore from "../hooks/useUserStore"
import Login from "../components/login/Login";

interface AuthRouteProps {
  children: React.ReactNode;
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const { isLoggedIn } = useUserStore();

  if (!isLoggedIn) return <Navigate to="/login" />

  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <div></div>
      </AuthRoute>
    )
  },
  {
    path: "/login",
    element: (
      <Login />
    )
  }
]);