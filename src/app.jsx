import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./assets/pages/Home";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
