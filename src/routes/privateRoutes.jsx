import {  useContext } from "react"
import { AuthContext } from "../context/AuthContex"
import { Navigate, Outlet } from "react-router-dom";


export const PrivateRoute = ({children})=>{
const {signed} = useContext(AuthContext);

return signed ? children: <Navigate to="/login"/>
}