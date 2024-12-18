import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ButtonScrollBackToTop from "./components/form/button-scroll-back-to-top";
import PublicRouter from "./pages/public/router";
import AuthRouter from "./pages/auth/router";
import AdminRouter from "./pages/admin/router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<PublicRouter />} />
        <Route path="me/*" element={<AuthRouter />} />
        <Route path="admin/*" element={<AdminRouter />} />
      </Routes>

      <ButtonScrollBackToTop />
      <Toaster />
    </>
  );
}

export default App;
