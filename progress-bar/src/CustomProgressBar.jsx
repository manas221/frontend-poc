import React from "react";

const getColor = (value) => {
    if (value < 40) return "#e53935";      // red
    if (value < 80) return "#fb8c00";      // orange
    return "#2e7d32";                       // green
  };


export default function CustomProgressBar({ progress = 0}) {

    const wrapperStyle = {
        minWidth: "560px",
        padding: "24px",
        background: "#fff",
        border: "1px solid black",
    };

    const trackStyle = {
        width: "100%",
        height: "48px",
        background: "#d3d3d3",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid black",
    }
    const fillStyle = {
        width: `${progress}%`,
        height: "100%",
        backgroundColor: `${getColor(progress)}`,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        transition: "width 0.2s ease, background 0.2s ease",
    }
    
    return <div style={wrapperStyle}>
        <div className="track" style={trackStyle}>
            <div className="fill" style={fillStyle}>{progress}</div>
        </div>
    </div>
}