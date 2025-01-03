import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import BookId from "./pages/BookId";
import Header from "./layouts/Header";
import Bookmark from "./pages/Bookmark";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/:id" element={<BookId />} />
          <Route path="/bookmarks" element={<Bookmark />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
