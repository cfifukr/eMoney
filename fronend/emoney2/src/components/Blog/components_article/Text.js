import React from "react";

function Text({component}){


    return<>
        <div className="paragraph-component">
            {component.data}

        </div>
    </>
}
export default Text;