import "../css/components/AdminFixPoint.css";
import AdminFixPointContainer from "./AdminFixPointContainer";
function AdminFixPoint() {
  const dataArray = [
    { userID: "alpaka", recentPoint: 10000, RecentPickme: 4 },
    { userID: "alpaka", recentPoint: 10000, RecentPickme: 4 },
    { userID: "alpaka", recentPoint: 10000, RecentPickme: 4 },
  ];
  return (
    <div className="AdminFixPoint">
      <div className="content">
        {dataArray.map((data, index) => (
          <AdminFixPointContainer
            key={index}
            userID={data.userID}
            recentPoint={data.recentPoint}
            RecentPickme={data.RecentPickme}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminFixPoint;
