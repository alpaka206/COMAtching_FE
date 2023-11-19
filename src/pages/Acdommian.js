import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import AdminModal from "../components/AdminModal";
import UserInfoListItem from "../components/UserInfoListItem";

function Acdommian() {
  const [userData, setUserData] = useState([]);
  const [pickValues, setPickValues] = useState({});
  const [pickMe, setPickMe] = useState(0);
  const [pickSomeone, setPickSomeone] = useState(0);
  const [showModal, setShowModal] = useState(true);
  const [adminPassword, setAdminPassword] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [formPasswd, setFormPasswd] = useState({
    phone: "",
    passwd: "",
  });

  const handlePickMeIncrement = (email) => {
    setPickValues((prevValues) => ({
      ...prevValues,
      [email]: {
        ...prevValues[email],
        pickMe: prevValues[email].pickMe + 1,
      },
    }));
  };

  const handlePickMeDecrement = (email) => {
    setPickValues((prevValues) => ({
      ...prevValues,
      [email]: {
        ...prevValues[email],
        pickMe: Math.max(0, prevValues[email].pickMe - 1),
      },
    }));
  };

  const handlePickSomeoneIncrement = (email) => {
    setPickValues((prevValues) => ({
      ...prevValues,
      [email]: {
        ...prevValues[email],
        pickSomeone: prevValues[email].pickSomeone + 1,
      },
    }));
  };

  const handlePickSomeoneDecrement = (email) => {
    setPickValues((prevValues) => ({
      ...prevValues,
      [email]: {
        ...prevValues[email],
        pickSomeone: Math.max(0, prevValues[email].pickSomeone - 1),
      },
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const initialPickValues = {};

        response.data.forEach((user) => {
          initialPickValues[user.email] = {
            pickMe: 0,
            pickSomeone: 0,
          };
        });

        setPickValues(initialPickValues);
        setUserData(response.data);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchData();
  }, []);
  // const handlePasswordSubmit = async (enteredPassword) => {
  //   try {
  //     const response = await axios.get(
  //       `https://onesons.site/inquiry/passwd?password=${enteredPassword}`
  //     );

  //     if (response.data === "valid") {
  //       setAdminPassword(enteredPassword);
  //     } else {
  //       alert("올바르지 않은 비밀번호입니다.");
  //     }
  //   } catch (error) {
  //     console.error("오류 발생:", error);
  //   }
  // };
  const handlePasswordSubmit = (enteredPassword) => {
    if (enteredPassword === "1234") {
      setShowModal(false);
      setAdminPassword(enteredPassword);
    } else {
      alert("올바르지 않은 비밀번호입니다.");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPasswd((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleConfirmClick = (email) => {
    // You can perform any additional logic before updating the counts
    console.log(`Confirm button clicked for email: ${email}`);

    // Update the counts for the specific email
    handlePickMeIncrement(email);
    handlePickSomeoneIncrement(email);
  };

  return (
    <div className="container">
      <AdminModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onPasswordSubmit={handlePasswordSubmit}
      />
      {adminPassword && (
        <div>
          <div className="content">
            <div className="userInfoList">
              <div className="userInfoList_header">
                <h3>이메일</h3>
                <h3>pick me</h3>
                <h3>pick someone</h3>
                <h3>확인</h3>
                <h3>삭제</h3>
              </div>
              {userData.map((user) => (
                <UserInfoListItem
                  key={user.id}
                  email={user.email}
                  pickMe={pickValues[user.email].pickMe}
                  pickSomeone={pickValues[user.email].pickSomeone}
                  pickMeIncrement={() => handlePickMeIncrement(user.email)}
                  pickMeDecrement={() => handlePickMeDecrement(user.email)}
                  pickSomeoneIncrement={() =>
                    handlePickSomeoneIncrement(user.email)
                  }
                  pickSomeoneDecrement={() =>
                    handlePickSomeoneDecrement(user.email)
                  }
                  onConfirmClick={() => handleConfirmClick(user.email)}
                />
              ))}
            </div>
          </div>

          <div>
            <div
              className="textDB"
              style={{
                paddingTop: "0px",
              }}
            >
              Developed by COMA 19s
            </div>
            <hr
              style={{
                backgroundColor: "#464646",
                height: "1px",
              }}
            />
            <div
              className="textBE"
              style={{
                paddingBottom: "40px",
              }}
            >
              BE 서승준 / FE 김규원 신희원 / PM 박승원 박상준
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Acdommian;
