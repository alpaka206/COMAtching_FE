import "../css/components/AdminFixPointContainer.css";
function AdminFixPointContainer({ userID, recentPoint, RecentPickme }) {
  return (
    <div className="AdminFixPointContainer">
      <div className="AdminFixPointContainer-ID-element">
        <div className="AdminFixPointContainer-ID-text">userID : </div>
        <div className="AdminFixPointContainer-ID-value"> {userID}</div>
      </div>
      <div className="AdminFixPointContainer-Point-element">
        <div className="AdminFixPointContainer-Point-text">
          최근 충전된 포인트
        </div>
        <div className="AdminFixPointContainer-Point-value">{recentPoint}P</div>
      </div>
      <div className="AdminFixPointContainer-Point-element">
        <div className="AdminFixPointContainer-Point-text">
          최근 충전된 PickMe
        </div>
        <div className="AdminFixPointContainer-Point-value">
          {RecentPickme}회
        </div>
      </div>
      <div className="AdminFixPointContainer-Point">
        <img src={process.env.PUBLIC_URL + `assets/point.svg`} alt="cost" />
        <input />
      </div>

      <button className="AdminFixPointContainer-Button">적용</button>
    </div>
  );
}

export default AdminFixPointContainer;
