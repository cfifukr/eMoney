import React from "react";
import "./PrivacyPolicy.css"
import FooterComp from "../FooterComp";

function PrivacyPolicy(){

    return <>
        <div className="about-page">
            <h1 className="reddit-black-font">
                To use this website u need to swear an oath
            </h1>
            <h3 className="reddit-semibold-font">
                Night gathers, and now my watch begins.<br/>
                It shall not end until my death.<br/>
                I shall take no wife, hold no lands, father no children.<br/>
                I shall wear no crowns and win no glory.<br/>
                I shall live and die at my post.<br/>
                I am the sword in the darkness. <br/>
                I am the watcher on the walls.<br/>
                I am the shield that guards the realms of men.<br/>
                I pledge my life and honor to the Night’s Watch, for this night and all the nights to come
            </h3>
        </div>
        <FooterComp/>
    </>
}

export default PrivacyPolicy;