import {ReactNode} from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
    children: ReactNode;
}
const PrivateRoute = ({children}: IProps) => {

const {accessToken, isLoading} = useAppSelector((state)=> state.user);

console.log("Private Route", isLoading, accessToken)
const { pathname } = useLocation();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!accessToken) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;