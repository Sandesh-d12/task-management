import React from "react";

function Button({ text = "Submit", handleClick }) {
  return (
    <div>
      <button
        onClick={handleClick}
        type="submit"
        className="inline-block rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-sm font-medium text-white"
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
