import React from "react";

const ButtonIcon = ({ isSearch, setisSearch }) => {
  return (
    <button
      onClick={() => setisSearch(!isSearch)}
      className={`p-2 rounded-xl  ${isSearch && "bg-slate-500"}`}
    >
      <i
        className={`fa-solid fa-magnifying-glass ${isSearch && "text-white"}`}
      ></i>
    </button>
  );
};

export default ButtonIcon;
