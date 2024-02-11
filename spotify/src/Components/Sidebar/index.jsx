import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

const Sidebar = () => {
  const [liNav, setliNav] = useState([
    {
      id: 1,
      title: "Home",
      href: "/home",
      isChoose: true,
      icon: <i className="fa-solid fa-house"></i>,
    },
    {
      id: 2,
      title: "Listsong",
      href: "/listsong",
      isChoose: false,
      icon: <i className="fa-solid fa-calendar-day"></i>,
    },
  ]);
  const handleChoose = (name) => {
    const newUpdate = liNav.map((li, i) => {
      if (li.title === name) {
        return { ...li, isChoose: !li.isChoose };
      }
      return { ...li, isChoose: false };
    });
    setliNav(newUpdate);
  };
  return (
    <div className="p-3">
      <ul className="flex justify-center flex-col items-start p-3 bg-gray-600 rounded-lg gap-2">
        {liNav.map(({ id, isChoose, title, href, icon }, i) => {
          return (
            <MenuItem
              id={id}
              isChoose={isChoose}
              title={title}
              href={href}
              handleChoose={handleChoose}
              icon={icon}
              key={id}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
