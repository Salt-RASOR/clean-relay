"use client";

import { FILTER_RANGE_MAX } from "@/app/common/constants";
import { selectFilterRange, setFilterRange } from "@/lib/features/issuesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { Range } from "react-range";

const CustomRange = () => {
  const filterRange = useAppSelector(selectFilterRange);
  const dispatch = useAppDispatch();

  return (
    <div className="py-8">
      <div className="mb-2 text-[#818181] flex justify-between">
        Filter by distance
        <span>
          {filterRange === FILTER_RANGE_MAX + 1
            ? "Unlimited"
            : `${filterRange} km`}
        </span>{" "}
      </div>
      <Range
        step={1}
        min={1}
        max={FILTER_RANGE_MAX + 1}
        values={[filterRange]}
        onChange={(values) => dispatch(setFilterRange(values[0]))}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "3px",
              width: "100%",
              backgroundColor: "#bdc1c8",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={"filterRangeDivSomething"}
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
