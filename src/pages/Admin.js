import "../css/pages/Admin.css";
import AdminRequestList from "../components/AdminRequestList";

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
