import { Route, Routes } from "react-router-dom";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import DashboardPage from "./dashboard-page";
import SettingPage from "./setting-page";
import ProfileUpdatePage from "./profile-update-page";
import NotificationPage from "./notification-page";
import ProfliePage from "./profile-page";
import NotFoundPage from "./not-found-page";
import ChangePasswordPage from "./change-password-page";
import AuthLayout from "@/layouts/AuthLayout";
import AuthProtectedRouter from "@/features/authentication/components/AuthProtectedRouter";

const AuthRouter = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Routes>
          <Route element={<AuthProtectedRouter />}>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="profile" element={<ProfliePage />} />
            <Route element={<AuthLayout />}>
              <Route path="change-password" element={<ChangePasswordPage />} />
              <Route path="profile/update" element={<ProfileUpdatePage />} />
            </Route>

            {/*  */}
            <Route index element={<DashboardPage />} />
            <Route path="setting" element={<SettingPage />} />
            <Route path="notification" element={<NotificationPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default AuthRouter;
