import "../css/pages/Admin.css";
import AdminRequestList from "../components/AdminRequestList";

// 추가 기능들이 있었으나 빠지게 되면서 단순한 Adminpage입니다.
function Admin() {
  return (
    <div className="container">
      <div className="admin-content">
        <AdminRequestList />
      </div>
    </div>
  );
}

export default Admin;
