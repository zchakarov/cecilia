import React from "react";

export const Loading = (props) => {
    return (
        <div className="loading">
            <h1>{props.text}<span>.</span><span>.</span><span>.</span></h1>
        </div>
    );
};