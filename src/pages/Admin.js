import "./Admin.css";
import AdminRequestList from "../components/AdminRequestList";

function Admin() {
  return (
    <div className="container">
      <div className="admin-content">
        <AdminRequestList />
        {/* <AdminFixPoint /> */}
      </div>
    </div>
  );
}

export default Admin;
