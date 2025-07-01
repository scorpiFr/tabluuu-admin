import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";

import Homepage from "./pages/Homepage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<p>test</p>} />
        <Route path="/moncompte" element={<p>test</p>} />
        <Route path="/motdepasse" element={<p>test</p>} />
        <Route path="/mescartes" element={<p>test</p>} />
        <Route path="/logout" element={<p>test</p>} />
      </Routes>
    </BrowserRouter>
  );
}
