import { useEffect, useState } from "react";

// a progress bar essentially is just a track div over a fill div

export default function NativeProgressBar({ progress }) {

  return (
    <div className="App">
      <div>{progress}</div>
      <progress max={100} value={progress}/>
    </div>
  );
}
