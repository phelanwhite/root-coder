import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import TaskForm from "./components/TaskForm";

const App = () => {
  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 py-10">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="create" element={<TaskForm />} />
        <Route path="update/:id" element={<TaskForm />} />
      </Routes>
    </div>
  );
};

export default App;
