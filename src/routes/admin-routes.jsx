import { Route, Routes } from "react-router-dom";
import Users from "../pages/admin-pannel/users";


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users/>} />
      <Route/>
      <Route/>
    </Routes>
  )
}

export default AdminRoutes;
