import React from "react";
import { RecoilRoot } from "recoil";
import Mainpage from "./pages/Mainpage";
import Form from "./pages/Form";
import Hobbyform from "./pages/Hobbyform";
import Match from "./pages/Match";
import Matchresult from "./pages/Matchresult";
import Checkresult from "./pages/Checkresult";
import Admin from "./pages/Admin";
import AdminSelect from "./pages/AdminSelect";
import Loading from "./pages/Loading";
import Guide from "./pages/Guide";
import CodeReader from "./pages/CodeReader";
import ProfileBuilder from "./pages/ProfileBuilder";
import QRGenerator from "./pages/QRGenerator";
import Redirection from "./pages/RedirectionPage";
import OpenExternalBrowser from "./OpenExternalBrowser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <OpenExternalBrowser />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/form" element={<Form />} />
            <Route path="/hobby" element={<Hobbyform />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/match-result" element={<Matchresult />} />
            <Route path="/match" element={<Match />} />
            <Route path="/check-result" element={<Checkresult />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-select" element={<AdminSelect />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/code-reader" element={<CodeReader />} />
            <Route path="/QR-generator" element={<QRGenerator />} />
            <Route path="/profile-builder" element={<ProfileBuilder />} />
            <Route path="/redirection" element={<Redirection />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}
