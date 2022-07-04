import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useUserStatus } from "../hooks/useUserStatus";
import Spinner from "./Spinner";

function PrivateRoute() {
  const {  user } = useUserStatus();

  return !user ? (
    <Spinner />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
 