import axios from "axios";

const Toss = {
  check: async (name, amount) => {
    try {
      const response = await axios.get(
        "https://api-public.toss.im/api-public/v3/cashtag/transfer-feed/received/list?inputWord=alpaka206"
      );

      const data = response.data;

      if (data.resultType !== "SUCCESS") {
        throw new Error(`${data.error.errorCode}: ${data.error.reason}`);
      }

      for (const transaction of data.success.data) {
        const transfer_id = transaction.cashtagTransferId;
        const transfer_name = transaction.senderDisplayName;
        const transfer_amount = transaction.amount;

        if (name === transfer_name) {
          // 입금 내역 확인 로직 추가
          return {
            result: true,
            id: transfer_id,
            name: transfer_name,
            amount: transfer_amount,
            msg: "입금 확인됨",
          };
        }
      }

      return {
        result: false,
        msg: "입금 내역이 없음",
      };
    } catch (error) {
      throw new Error(`API 호출 실패: ${error.message}`);
    }
  },
};

export default Toss;
