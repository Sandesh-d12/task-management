import React from "react";

function ColumnFilter({ column }) {
    const {filterValue, setFilter} = column
  return (
    <div>
      <span>
        Search:{" "}
        <input
          value={filterValue || ""}
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </span>
    </div>
  );
}

export default ColumnFilter;
