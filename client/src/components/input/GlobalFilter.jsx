import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

function GlobalFilter({ filter, setFilter }) {
//   const [value, setValue] = useState(filter);

//   const handleChange = useAsyncDebounce((value) => {
//     setFilter(value || undefined);
//   }, 300);

  return (
    <div style={{width:"100%"}}>
        Search:{" "}
        <input
          value={filter || ""}
          onChange={(e) => {
            setFilter(e.target.value);
            // handleChange(e.target.value);
          }}
          placeholder="Search..."
          className="mt-1 w-1/5 rounded-md border border-gray-500 shadow-sm sm:text-sm py-2 px-2"
        />
    </div>
  );
}

export default GlobalFilter;
