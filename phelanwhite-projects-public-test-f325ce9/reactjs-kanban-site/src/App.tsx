import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./components/layout/RootLayout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
