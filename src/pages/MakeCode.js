import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";

import axios from "axios";

const QRGenerator = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    axios
      .get("your-server-url")
      .then((response) => {
        setUrl(response.data.url);
      })
      .catch((error) => {
        console.error("Error fetching URL:", error);
      });
  }, []);

  return <div>{<QRCode value={`https://www.naver.com/`} />}</div>;
};

export default QRGenerator;
