import React from "react";

function Header({component}){


    return<>
        <h3 className="reddit-semibold-font mx-5">{component.data}</h3>
    </>
}
export default Header;