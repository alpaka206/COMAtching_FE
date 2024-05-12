import "../css/components/AdminFixPoint.css";
function AdminFixPoint() {
  return (
    <div className="AdminFixPoint">
      <div className="content">
        <div>포인트 수정</div>
        <div>아이디 정확히 검색하여 포인트 조회 및 수정</div>
        <div>
          <input />
          <button>
            <img src={process.env.PUBLIC_URL + `assets/point.svg`} alt="cost" />
          </button>
        </div>
        <div>userID:</div>
        <div>현재 보유중인 포인트</div>
        <div>현재 보유중인 PickMe</div>
        <div>
          <img src={process.env.PUBLIC_URL + `assets/point.svg`} alt="cost" />
          <input />
        </div>
        <div>
          <img src={process.env.PUBLIC_URL + `assets/point.svg`} alt="cost" />
          <input />
        </div>
        <button>적용</button>
      </div>
    </div>
  );
}

export default AdminFixPoint;
