import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";

import Homepage from "./pages/Homepage";
import useSession from "./components/UseSession";
import Moncompte from "./pages/Moncompte";
import Login from "./pages/Login";
import "./App.css";

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const { session, dispatchSession } = useSession();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route
          path="/login"
          element={
            <Login session={session} dispatchSession={dispatchSession} />
          }
        />
        <Route path="/moncompte" element={<Moncompte session={session} />} />
        <Route path="/motdepasse" element={<p>test</p>} />
        <Route path="/mescartes" element={<p>test</p>} />
        <Route path="/logout" element={<p>test</p>} />
      </Routes>
    </BrowserRouter>
  );
}
