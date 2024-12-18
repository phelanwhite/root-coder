import React, { memo, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/auth-store";

const AdminProtectedRouter = () => {
  const location = useLocation();
  const { isLoggedIn, user, changeRedirectUrl } = useAuthStore();
  useEffect(() => {
    if (!isLoggedIn || user?.role !== "admin") {
      changeRedirectUrl(location);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Navigate to={`/signin`} />;
  return <Outlet />;
};

export default memo(AdminProtectedRouter);
