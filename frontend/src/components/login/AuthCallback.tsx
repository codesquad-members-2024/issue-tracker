import { useNavigate } from "react-router";
import Loading from "./Loading";
import { useEffect } from "react";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [navigate]);

  return <Loading />;
}

export default AuthCallback;
