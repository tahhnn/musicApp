import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Playground from "../Components/Playground";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { playMusic } from "../store/musicSlice";
import SidebarBottom from "../Components/SidebarBottom";

const BaseLayout = () => {
  const isPlay = useSelector((state) => state.music.isPlaying);
  return (
    <>
      <div className="flex relative min-h-[100vh] ">
        <div className="fixed bg-slate-400">
          <Sidebar />
          <SidebarBottom />
        </div>
        <div className="w-full bg-slate-400">
          <div className="w-4/5 min-h-[100vh] float-right pl-8">
            <div className="p-3">
              <div className="p-5 bg-gray-600 rounded-lg">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        <Playground />
      </div>
    </>
  );
};

export default BaseLayout;
