import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectUser } from "../store/userSlice";

const ProtectedRoutes = () => {
  const user = useSelector(selectUser);

  // let user = {'token':false}
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
