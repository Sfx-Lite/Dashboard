import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../../store/hooks";
import { selectAuth } from "../../../store/authSlice";

export default function PermissionlessRoute() {
  const { accessToken, user } = useAppSelector(selectAuth);

  if (accessToken && user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}