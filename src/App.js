import React from "react";
import { RecoilRoot } from "recoil";
import Mainpage from "./pages/Mainpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Form from "./pages/Form";
import FormTest from "./pages/FormTest";
import Match from "./pages/Match";
import Matchresult from "./pages/Matchresult";
import Checkresult from "./pages/Checkresult";
import Admin from "./pages/Admin";
import Loading from "./pages/Loading";
import Guide from "./pages/Guide";
import TossChecker from "./pages/TossChecker";
import ReadCode from "./pages/ReadCode";
import ProfileBuilder from "./pages/ProfileBuilder";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MakeCode from "./pages/MakeCode";
function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/FormTest" element={<FormTest />} />
            <Route path="/Guide" element={<Guide />} />
            <Route path="/Matchresult" element={<Matchresult />} />
            <Route path="/Match" element={<Match />} />
            <Route path="/Checkresult" element={<Checkresult />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Loading" element={<Loading />} />
            <Route path="/TossChecker" element={<TossChecker />} />
            <Route path="/ReadCode" element={<ReadCode />} />
            <Route path="/MakeCode" element={<MakeCode />} />
            <Route path="/ProfileBuilder" element={<ProfileBuilder />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
