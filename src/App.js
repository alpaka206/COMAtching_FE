import React from "react";
import { RecoilRoot } from "recoil";
import Mainpage from "./pages/Mainpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Form from "./pages/Form";
import Match from "./pages/Match";
import Matchresult from "./pages/Matchresult";
import Checkresult from "./pages/Checkresult";
import Admin from "./pages/Admin";
import Loading from "./pages/Loading";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
            <Route
              path="Match"
              element={<PrivateRoute />}
              component={Match}
            ></Route>
            <Route
              path="Matchresult"
              element={<PrivateRoute />}
              component={Matchresult}
            ></Route>
            <Route
              path="Checkresult"
              element={<PrivateRoute />}
              component={Checkresult}
            ></Route>
            <Route
              path="Admin"
              element={<PrivateRoute />}
              component={Admin}
            ></Route>
            <Route
              path="Loading"
              element={<PrivateRoute />}
              component={Loading}
            ></Route>
            {/* <Route path="/Match" element={<Match />} />
            <Route path="/Matchresult" element={<Matchresult />} />
            <Route path="/Checkresult" element={<Checkresult />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Loading" element={<Loading />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
