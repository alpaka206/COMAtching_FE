import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import "../css/pages/ReadCode.css";

const ReadCode = () => {
  const [data, setData] = useState("No result");

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%", height: "100%" }}
      />
      <p>{data}</p>
    </>
  );
};

export default ReadCode;
