import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./not-found-page";
import DashboardPage from "./dashboard-page";
import AdminProtectedRouter from "@/features/authentication/components/AdminProtectedRouter";

const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<AdminProtectedRouter />}>
          <Route path="*" element={<NotFoundPage />} />

          {/*  */}
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRouter;
