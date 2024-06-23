import React from "react";
import "./ComponentsArticle.css"

function Image({component}){


    return<>
        <img  className ="image-component" src = {component.data}/>
    </>
}
export default Image;