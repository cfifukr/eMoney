import React from "react";
import './TermsService.css'
import FooterComp from "../FooterComp";
import { useState } from "react";

export default function TermsService(){
    const [agree, setAgree] = useState(false);


    return<>    

        <div className="terms-service-page">
            <h1 className="reddit-black-font"> 
                We owe you nothing, but you owe us all

            </h1>
            {agree ? <h1 className="reddit-black-font">  You are our slave now </h1> : <></>}
            <input type="checkbox" onClick={()=> setAgree(!agree)}/> Agree

        </div>
        <FooterComp/>
    
    
    </>
}

