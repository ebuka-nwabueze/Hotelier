import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

function PrivateRoute() {
  const { authLoading, loggedIn } = useAuthStatus();
  return authLoading ? (
    <Spinner />
  ) : loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
