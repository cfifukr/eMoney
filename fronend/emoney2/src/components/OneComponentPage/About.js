import React from "react";
import "./About.css"
import FooterComp from "../FooterComp";

function About(){

    return <>
        <div className="about-page">
            <h1 className="reddit-black-font">
                What do u want? Its all.<span className="reddit-light-font" style={{fontSize:"small"}}>Go away</span>
            </h1>

        </div>
        <FooterComp/>
    </>
}

export default About;