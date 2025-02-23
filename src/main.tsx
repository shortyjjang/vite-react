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
import MenuDetail from "./page/Store/Menu";
import Order from "./page/Order";
import SearchAddress from "./page/Setting/Adress";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
    <Router>
      <LayoutProvider>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:category" element={<Category />} />
          <Route path="/store/:id" element={<Store />} />
          <Route path="/store/:id/menu/:menuId" element={<MenuDetail />} />
          <Route path="/order" element={<Order />} />
          <Route path="/setting/address" element={<SearchAddress />} />
        </Routes>
      </LayoutProvider>
    </Router>
    </QueryProvider>
  </StrictMode>
);
