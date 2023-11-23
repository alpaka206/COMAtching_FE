import React from "react";
<<<<<<< HEAD
import { RecoilRoot } from "recoil";
import Mainpage from "./pages/Mainpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Form from "./pages/Form";
import Match from "./pages/Match";
import Matchresult from "./pages/Matchresult";
import Checkresult from "./pages/Checkresult";
import Acdommian from "./pages/Acdommian";
import Loading from "./pages/Loading";
=======
import Mainpage from "./pages/Mainpage";
import Form from "./pages/Form";
import Error from "./pages/Error";
import Complete from "./pages/Complete";
import Test from "./pages/test";
import Mcaotmcap from "./pages/Mcaotmcap";
import Mcaotmcapresult from "./pages/Mcaotmcapresult";
import Check from "./pages/Check";
import Checkresult from "./pages/Checkresult";
import Admin from "./pages/Admin";
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
<<<<<<< HEAD
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/Match" element={<Match />} />
            <Route path="/Matchresult" element={<Matchresult />} />
            <Route path="/Checkresult" element={<Checkresult />} />
            <Route path="/Acdommian" element={<Acdommian />} />
            <Route path="/Loading" element={<Loading />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
=======
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/Error" element={<Error />} />
            <Route path="/Complete" element={<Complete />} />
            <Route path="/test" element={<Test />} />
            <Route path="/Mcaotmcap" element={<Mcaotmcap />} />
            <Route path="/Mcaotmcapresult" element={<Mcaotmcapresult />} />
            <Route path="/Check" element={<Check />} />
            <Route path="/Checkresult" element={<Checkresult />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
  );
}

export default App;
