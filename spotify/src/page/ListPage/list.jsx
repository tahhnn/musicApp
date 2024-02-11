import React from "react";
import { useSelector } from "react-redux";

const Listsong = () => {
  const songIndex = useSelector((state) => state.music.currentSong);
  const listSong = useSelector((state) => state.music.listSong);
  const song = listSong[songIndex];
  return (
    <>
      <div>
        <p></p>
        <div className="flex items-center space-x-5 bg-black min-h-[50vh] text-white">
          <img width={"200px"} src={song?.img} />
          <p>
            <strong>Playing:</strong> {song?.name}
          </p>
        </div>
      </div>
    </>
  );
};

export default Listsong;
