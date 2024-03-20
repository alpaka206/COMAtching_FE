import React, { useState } from "react";
import Toss from "../components/Toss";

function TossChecker() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Toss.check(name.trim(), parseInt(amount));
      setResult(res);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Toss Checker</h1>
      <form onSubmit={handleSubmit}>
        <label>
          입금자명:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          입금액:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">입금 확인</button>
      </form>
      {result && (
        <div>
          <h2>결과:</h2>
          <p>{result.msg}</p>
          {result.result && (
            <div>
              <p>ID: {result.id}</p>
              <p>이름: {result.name}</p>
              <p>금액: {result.amount}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default TossChecker;
