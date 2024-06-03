import React, { useEffect } from "react";
import {  isJwtToken, deleteJwtToken } from "./utils/jwtToken";
import {useNavigate} from "react-router-dom"

function Logout(){

    const navigate = useNavigate();
    
    useEffect(()=>{
        if(isJwtToken()){
            deleteJwtToken();
            navigate("/"); 

        }
    }, [])
}

export default Logout;