// AdminModal.js

import React, { useState } from "react";

function AdminModal({ isOpen, onClose, onPasswordSubmit }) {
  const [adminPassword, setAdminPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordSubmit(adminPassword);
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>관리자 비밀번호를 입력하세요</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <button type="submit">확인</button>
        </form>
      </div>
    </div>
  );
}

export default AdminModal;
