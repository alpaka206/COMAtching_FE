import React from "react";
import Mainpage from "./pages/Mainpage";
import Form from "./pages/Form";
import Complete from "./pages/Complete";
import Mcaotmcap from "./pages/Mcaotmcap";
import Mcaotmcapresult from "./pages/Mcaotmcapresult";
import Check from "./pages/Check";
import Checkresult from "./pages/Checkresult";
import Acdommian from "./pages/Acdommian";
import EmailAuth from "./pages/EmailAuth";
import Test from "./pages/Test";
import Login from "./pages/Login";

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/Complete" element={<Complete />} />
            <Route path="/Mcaotmcap" element={<Mcaotmcap />} />
            <Route path="/Mcaotmcapresult" element={<Mcaotmcapresult />} />
            <Route path="/Check" element={<Check />} />
            <Route path="/Checkresult" element={<Checkresult />} />
            <Route path="/Acdommian" element={<Acdommian />} />
            <Route path="/EmailAuth" element={<EmailAuth />} />
            <Route path="/Test" element={<Test />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
