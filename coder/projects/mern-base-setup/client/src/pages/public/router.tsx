import { Route, Routes } from "react-router-dom";
import Header from "@/layouts/header";
import Footer from "@/layouts/footer";
import HomePage from "./home-page";
import SearchPage from "./search-page";
import AuthenticationPage from "./authentication-page";
import NotFoundPage from "./not-found-page";

const PublicRouter = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Routes>
          <Route path="signin" element={<AuthenticationPage />} />
          <Route path="signup" element={<AuthenticationPage />} />
          <Route path="forgot-password" element={<AuthenticationPage />} />
          <Route
            path="reset-password/:token"
            element={<AuthenticationPage />}
          />
          <Route path="*" element={<NotFoundPage />} />

          {/*  */}
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default PublicRouter;
