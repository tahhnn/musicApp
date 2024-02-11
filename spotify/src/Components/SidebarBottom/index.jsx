import React, { useEffect, useState } from "react";
import MenuItem from "../Sidebar/MenuItem";
import ButtonIcon from "./ButtonSearch";
import { item2 } from "./data";
import ButtonFilter from "./ButtonFilter";
import { useDispatch, useSelector } from "react-redux";
import { getSong } from "../../store/musicSlice";

const SidebarBottom = () => {
  const [isSearch, setisSearch] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const listSong = useSelector((state) => state.music.listSong);
  const [liNav, setliNav] = useState(listSong);
  const dispatch = useDispatch();
  const handleChoose = (name) => {
    const songIndex = listSong.findIndex((li) => li.name === name);
    dispatch(getSong(songIndex));
    const newUpdate = liNav.map((li, i) => {
      if (li.name === name && i === songIndex) {
        return { ...li, isChoose: !li.isChoose };
      }
      return { ...li, isChoose: false };
    });
    setliNav(newUpdate);
  };
  const musicCurr = useSelector((state) => state.music.currentSong);
  useEffect(() => {
    setliNav((prevLiNav) =>
      prevLiNav.map((li, i) => ({
        ...li,
        isChoose: i === musicCurr,
      }))
    );
  }, [musicCurr]);
  return (
    <div className="p-3 sidebar-b">
      <div className="p-3 bg-gray-600 rounded-lg h-[400px] overflow-y-scroll">
        <div className="flex justify-between transition-all ">
          <div
            className={`flex items-center gap-3 ${
              isSearch && "bg-slate-500 rounded-xl"
            }`}
          >
            <ButtonIcon isSearch={isSearch} setisSearch={setisSearch} />

            <div
              className={`search-input flex gap-1 transition-all transform ${
                isSearch
                  ? "visible translate-x-0"
                  : "invisible opacity-10 -translate-x-full"
              }`}
            >
              <input
                className="bg-slate-500 placeholder:text-white focus:outline-none text-white"
                type="text"
                placeholder="Tìm kiếm playlist"
              />
              <div className="relative">
                <ButtonFilter
                  isDropdownOpen={isDropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                />
                {isDropdownOpen && (
                  <div className="absolute top-10 right-0 mt-2 bg-white border rounded-md shadow-md">
                    <ul className="w-[100px]">
                      {item2.map((i) => {
                        return (
                          <>
                            <li key={i.id}>{i.option}</li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ul className="my-4 mx-2 flex flex-col gap-2 text-gray-600">
          {liNav.map(({ name, id, isChoose, href }, i) => {
            return (
              <>
                <MenuItem
                  key={i}
                  title={name}
                  id={id}
                  isChoose={isChoose}
                  handleChoose={handleChoose}
                />
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SidebarBottom;
