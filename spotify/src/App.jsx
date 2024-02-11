import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BaseLayout from "./layout";
import Listsong from "./page/ListPage/list";
import Home from "./page/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route path="/listsong" element={<Listsong />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
