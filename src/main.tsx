import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/pretendard/pretendard.css";
import "./assets/css/pretendard/pretendard-subset.css";
import "./assets/css/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import LayoutProvider from "./provider/LayoutProvider";
import Category from "./page/Category";
import Store from "./page/Store";
import QueryProvider from "./provider/QueryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
    <Router>
      <LayoutProvider>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:category" element={<Category />} />
          <Route path="/store/:id" element={<Store />} />
        </Routes>
      </LayoutProvider>
    </Router>
    </QueryProvider>
  </StrictMode>
);
