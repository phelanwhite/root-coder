import { memo, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/auth-store";

const AuthProtectedRouter = () => {
  const location = useLocation();
  const { isLoggedIn, changeRedirectUrl } = useAuthStore();
  useEffect(() => {
    if (!isLoggedIn) {
      changeRedirectUrl(location);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Navigate to={`/signin`} />;
  return <Outlet />;
};

export default memo(AuthProtectedRouter);
