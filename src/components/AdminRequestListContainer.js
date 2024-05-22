import React, { useState } from "react";
import "../css/components/AdminRequestListContainer.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminRequestListContainer({ request, setRequests }) {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    add_point: 0,
    chargeCheck: false,
    add_pick_me: 0,
    result_point: request.point,
  });
  const handleAdminSubmit = async () => {
    const FormData = {
      add_point: value.add_point,
      add_pick_me: value.add_pick_me,
      result_point: value.result_point,
      contact_id: request.contact_id,
    };
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "https://catholic-mibal.site/admin/manage/charge",
      FormData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(request);
    if (response.data.code === "SEC-001" || response.data.code === "SEC-002") {
      localStorage.removeItem("token");
      navigate("/");
    } else if (response.data.status === 200) {
      setRequests((prev) =>
        prev.map((item) =>
          item.contact_id === request.contact_id
            ? { ...item, isChecked: true }
            : item
        )
      );
    }
  };
  const handleChargeDelete = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://catholic-mibal.site/admin/manage/delete?contactId=${request.contact_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (response.data.code === "SEC-001" || response.data.code === "SEC-002") {
      localStorage.removeItem("token");
      navigate("/");
    } else if (response.data.status === 200) {
      setRequests((prev) =>
        prev.map((item) =>
          item.contact_id === request.contact_id
            ? { ...item, isChecked: true }
            : item
        )
      );
    }
  };

  const handleChargeIncrease = () => {
    setValue((prevState) => ({
      ...prevState,
      result_point: prevState.result_point + prevState.add_point,
      chargeCheck: true,
    }));
  };
  const handleChargeDecrease = () => {
    if (value.result_point >= value.add_point) {
      setValue((prevState) => ({
        ...prevState,

        result_point: prevState.result_point - prevState.add_point,
        chargeCheck: false,
      }));
    } else {
      alert("pickme를 취소해주세요");
    }
  };

  const handleIncrease = () => {
    setValue((prevState) => ({
      ...prevState,
      add_pick_me: prevState.add_pick_me + 1,
      result_point: prevState.result_point - 500,
    }));
  };

  const handleDecrease = () => {
    if (value.add_pick_me > 0) {
      setValue((prevState) => ({
        ...prevState,
        add_pick_me: prevState.add_pick_me - 1,
        result_point: prevState.result_point + 500,
      }));
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === "" || !isNaN(inputValue)) {
      setValue((prevState) => ({
        ...prevState,
        add_point: inputValue === "" ? 0 : parseInt(inputValue),
      }));
    }
  };

  return (
    <div className="AdminRequestListContainer">
      <div className="AdminRequestListElement">
        <div className="AdminRequestListElement-userID">
          userID: &nbsp;
          <div className="AdminRequestListElement-userID-ID">
            {" "}
            {request.contact_id}
          </div>
        </div>
        <div className="AdminRequestListElement-result_point">
          총 잔액 :{value.result_point}
        </div>
        <button onClick={handleChargeDelete}>X</button>
      </div>

      <div className="AdminRequestListItem">
        <img src={process.env.PUBLIC_URL + `assets/point.svg`} alt="cost" />
        <input
          type="text"
          value={value.add_point}
          onChange={handleInputChange}
          disabled={value.chargeCheck}
        />
        {value.chargeCheck ? (
          <button onClick={handleChargeDecrease}>취소</button>
        ) : (
          <button onClick={handleChargeIncrease}>적용</button>
        )}
        <img src={process.env.PUBLIC_URL + `assets/heart.svg`} alt="heart" />
        <button
          type="button"
          onClick={handleDecrease}
          className="AdminRequestListItem-pickme-button"
        >
          -
        </button>
        <div className="AdminRequestListItem-pickme-value">
          {value.add_pick_me}
        </div>
        <button
          type="button"
          onClick={handleIncrease}
          className="AdminRequestListItem-pickme-button"
          disabled={value.result_point < 500} // result_point가 500보다 작거나 같으면 비활성화
        >
          +
        </button>
        <button
          type="button"
          className="AdminRequestListItem-submit-button"
          onClick={handleAdminSubmit}
          disabled={!value.chargeCheck}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default AdminRequestListContainer;
