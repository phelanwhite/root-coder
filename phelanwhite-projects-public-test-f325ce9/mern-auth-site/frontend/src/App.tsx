import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Password from "./pages/Password";
import Profile from "./pages/Profile";
import Recovery from "./pages/Recovery";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Home />,
  },
  {
    path: `/register`,
    element: <Register />,
  },
  {
    path: `/password`,
    element: <Password />,
  },
  {
    path: `/profile`,
    element: <Profile />,
  },
  {
    path: `/recovery`,
    element: <Recovery />,
  },
  {
    path: `/reset-password`,
    element: <ResetPassword />,
  },
  {
    path: `*`,
    element: <NotFound />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
