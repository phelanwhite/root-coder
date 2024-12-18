import React, { memo } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <div></div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default memo(AuthLayout);
