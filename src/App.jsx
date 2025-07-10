import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";

import Homepage from "./pages/Homepage";
import useSession from "./components/UseSession";
import Moncompte from "./pages/Moncompte";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import Mescartes from "./pages/Mescartes";
import Logout from "./pages/Logout";
import DynamicMenuNew from "./pages/DynamicMenuNew";
import DynamicMenuEdit from "./pages/DynamicMenuEdit";
import DynamicMenuRead from "./pages/DynamicMenuRead";
import SectionNew from "./pages/SectionNew";
import SectionEdit from "./pages/SectionEdit";
import ItemNew from "./pages/ItemNew";
import MesQrCodes from "./pages/MesQrCodes";
import MescartesStatic from "./pages/MescartesStatic";
import StaticMenuNew from "./pages/StaticMenuNew";
import StaticMenuEdit from "./pages/StaticMenuEdit";
import StaticItems from "./pages/StaticItems";
import HomepageCommercial from "./pages/HomepageCommercial";
import EtablissementList from "./pages/EtablissementList";
import EtablissementNew from "./pages/EtablissementNew";
import EtablissementUpdate from "./pages/EtablissementUpdate";
import EtablissementBills from "./pages/EtablissementBills";
import BillNew from "./pages/BillNew";

import "./App.css";

export default function App() {
  const { session, dispatchSession } = useSession();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage session={session} />} />
        <Route
          path="/homepagecommercial"
          element={<HomepageCommercial session={session} />}
        />
        <Route
          path="/etablissementlist"
          element={<EtablissementList session={session} />}
        />
        <Route
          path="/etablissementnew"
          element={
            <EtablissementNew
              session={session}
              dispatchSession={dispatchSession}
            />
          }
        />
        <Route
          path="/etablissementupdate/:id"
          element={
            <EtablissementUpdate
              session={session}
              dispatchSession={dispatchSession}
            />
          }
        />
        <Route
          path="/etablissementbills/:etablissementId"
          element={
            <EtablissementBills
              session={session}
              dispatchSession={dispatchSession}
            />
          }
        />
        <Route
          path="/billnew/:etablissementId"
          element={
            <BillNew session={session} dispatchSession={dispatchSession} />
          }
        />

        <Route
          path="/login"
          element={
            <Login session={session} dispatchSession={dispatchSession} />
          }
        />
        <Route
          path="/moncompte"
          element={
            <Moncompte session={session} dispatchSession={dispatchSession} />
          }
        />
        <Route
          path="/motdepasse"
          element={
            <ChangePassword
              session={session}
              dispatchSession={dispatchSession}
            />
          }
        />
        <Route
          path="/mescartes"
          element={
            <Mescartes session={session} dispatchSession={dispatchSession} />
          }
        />
        <Route
          path="/mesqrcodes"
          element={
            <MesQrCodes session={session} dispatchSession={dispatchSession} />
          }
        />
        <Route
          path="/logout"
          element={
            <Logout session={session} dispatchSession={dispatchSession} />
          }
        />
        <Route
          path="/dynamicmenu/new"
          element={
            <DynamicMenuNew
              session={session}
              dispatchSession={dispatchSession}
            />
          }
        />
        <Route
          path="/dynamicmenu/edit/:id"
          element={
            <DynamicMenuEdit
              session={session}
              dispatchSession={dispatchSession}
            />
          }
        />
        <Route
          path="/dynamicmenu/read/:dynamicmenuid"
          element={
            <DynamicMenuRead
              session={session}
              dispatchSession={dispatchSession}
            />
          }
        />
        <Route
          path="/section/new/:dynamicmenuid"
          element={
            <SectionNew session={session} dispatchSession={dispatchSession} />
          }
        />
        <Route
          path="/section/edit/:id"
          element={
            <SectionEdit session={session} dispatchSession={dispatchSession} />
          }
        />
        <Route
          path="/item/new/:iddynamicmenu/:idsection"
          element={
            <ItemNew session={session} dispatchSession={dispatchSession} />
          }
        />
        <Route
          path="/mescartesstatic"
          element={
            <MescartesStatic
              session={session}
              dispatchSession={dispatchSession}
            />
          }
        />
        <Route
          path="/staticmenu/new"
          element={
            <StaticMenuNew
              session={session}
              dispatchSession={dispatchSession}
            />
          }
        />
        <Route
          path="/staticmenu/edit/:id"
          element={
            <StaticMenuEdit
              session={session}
              dispatchSession={dispatchSession}
            />
          }
        />
        <Route
          path="/staticitems/:staticMenuId"
          element={
            <StaticItems session={session} dispatchSession={dispatchSession} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
