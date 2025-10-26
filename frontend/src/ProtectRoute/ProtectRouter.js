import { Navigate, Outlet } from "react-router-dom";

const ProtectRouter = () => {
  const token = localStorage.getItem("token");
  console.log(token, "protect");

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectRouter;
