import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import Header from "./layouts/Header";
import Nav from "./layouts/Nav";
import Footer from "./layouts/Footer";
import SearchPage from "./pages/search-page";
import ComicIdPage from "./pages/comic-id-page";
import ChapterIdPage from "./pages/chapter-id-page";
import CategoryIdPage from "./pages/category-id-page";
import ListIdPage from "./pages/list-id-page";

const App = () => {
  return (
    <div>
      <Header />
      <Nav />
      <div className="max-w-[1232px] w-full mx-auto py-8 px-4">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="the-loai/:slug" element={<CategoryIdPage />} />
          <Route path="list/:slug" element={<ListIdPage />} />
          <Route path="truyen-tranh/:slug" element={<ComicIdPage />} />
          <Route
            path="truyen-tranh/:slug/chapter/:id"
            element={<ChapterIdPage />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
