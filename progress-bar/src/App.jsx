import { useEffect, useState } from "react";

import NativeProgressBar from "./NativeProgressBar";
import CustomProgressBar from "./CustomProgressBar";

export default function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCount(prev =>  prev >= 100 ? 0 : prev + 2)
    }, 100);
    return () => clearInterval(t);
  }, [])

  return (
    <div className="App">
      <CustomProgressBar progress={count} />
      <NativeProgressBar progress={count} />
    </div>
  );
}
