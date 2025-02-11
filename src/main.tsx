import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/font/pretendard/pretendard.css";
import "./assets/font/pretendard/pretendard-subset.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import LayoutProvider from "./provider/LayoutProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <LayoutProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </LayoutProvider>
    </Router>
  </StrictMode>
);
