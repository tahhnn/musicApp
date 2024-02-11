import React from "react";
import { Link } from "react-router-dom";

const ItemBottom = ({ id, isChoose, title, href, handleChoose, icon }) => {
  return (
    <>
      <li
        className={`bg-black text-gray-600 transition-all text-lg rounded-lg p-3 w-full ${
          isChoose ? "text-orange-50" : ""
        }`}
        key={id}
        onClick={() => handleChoose(title)}
      >
        <Link to={href}>
          <div className="flex items-center gap-3">
            {icon}
            {title}
          </div>
        </Link>
      </li>
    </>
  );
};

export default ItemBottom;
