import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn]= useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        checkLoggedIn()
    },[])

    const checkLoggedIn = async() =>{
        try{
            const response = await AuthService.refreshToken()
            console.log("response", response)
        }catch(error){
            console.log(error)
        }
    } 
    return <AuthContext.Provider>
        {children}
    </AuthContext.Provider>


} 
export const useAuth = ()=>{
    return useContext(AuthContext)
}