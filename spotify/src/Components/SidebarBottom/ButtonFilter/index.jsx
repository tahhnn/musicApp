import React from "react";

const ButtonFilter = ({ setDropdownOpen, isDropdownOpen }) => {
  return (
    <button
      onClick={() => {
        setDropdownOpen(!isDropdownOpen);
      }}
      className="px-4 py-1 rounded-md hover:bg-gray-400 hover:text-white"
    >
      Sort
    </button>
  );
};

export default ButtonFilter;
