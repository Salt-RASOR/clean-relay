import React, { useState } from "react";
import { Range } from "react-range";

const CustomRange = () => {
  const [rangeState, setRangeState] = useState([0]);
  return (
    <div className="py-8">
      <div className="pl-2 mb-2 text-[#818181] flex justify-between">
        Choose the distance: <span> {rangeState[0]} km</span>{" "}
      </div>
      <Range
        step={5}
        min={0}
        max={100}
        values={rangeState}
        onChange={(values) => setRangeState(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "3px",
              width: "100%",
              backgroundColor: "#bdc1c8",
            }}>
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "#a4a4ea",
            }}
          />
        )}
      />
    </div>
  );
};

export default CustomRange;
