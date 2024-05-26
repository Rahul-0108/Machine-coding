import { useEffect, useState } from "react";
import { MAX, MIN } from "../constants";

export default function ProgressBar({ value = 0, onComplete = () => {} }) {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(Math.max(value, MIN), MAX)); // make sure 100 value is the last even if > 100 
    // comes as input
    if (value >= MAX) {
      onComplete();
    }
  }, [value]);

  return (
    <div className="progress">
      <span
        style={{
          color: percent > 49 ? "white" : "black" // to apear as white on green background
        }}
      >
        {parseInt(percent)}%
      </span>
      <div
        // style={{ width: `${percent}%` }}
        style={{
          transform: `scaleX(${percent / MAX})`,
          transformOrigin: "left"
        }}
      />
    </div>
  );
}
