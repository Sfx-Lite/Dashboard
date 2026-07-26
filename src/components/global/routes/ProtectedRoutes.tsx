import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../../store/hooks";
import { selectAuth } from "../../../store/authSlice";

type ProtectedRouteProps = {
  roles?: string[];
};

export default function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const location = useLocation();
  const { accessToken, user } = useAppSelector(selectAuth);

  if (!accessToken || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}