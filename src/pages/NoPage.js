import React from "react";
import "./pagesCSS/NoPage.css"


export default function NoPage() {
    return (
        <div className="errorDiv">
            <h1>404 Error</h1>
            <p>Oops.. Looks like this page doesn't exist.</p>
            <p>Please click the Log in button</p>
        </div>
    )
}