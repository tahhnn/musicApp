import React, { useEffect, useState } from "react";
import ButtonPlay from "./ButtonPlay";
import { useDispatch, useSelector } from "react-redux";
import { getSong, playMusic } from "../../store/musicSlice";

const Playground = () => {
  const audioRef = React.useRef(null);
  const [isSuffer, setIsSuffer] = React.useState(false);
  const [isRepeat, setIsRepeat] = React.useState(false);
  const [isDeaf, setIsDeaf] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const musicCurr = useSelector((state) => state.music.currentSong);
  const listSong = useSelector((state) => state.music.listSong);
  const isPlaying = useSelector((state) => state.music.isPlaying);
  const music = listSong[musicCurr];
  const dispatch = useDispatch();
  const audio = audioRef.current;
  const handlePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      dispatch(playMusic(false));
    } else {
      audio.play();
      dispatch(playMusic(true));
    }
  };
  useEffect(() => {
    const audio = audioRef.current;
    dispatch(getSong(musicCurr));
    audio.autoplay = true;
    dispatch(playMusic(true));
    const handleDataProgress = () => {
      setDuration(audio.duration);
    };
    const handleDataProgressUpdate = () => {
      if (audio.duration) {
        const newProgress = (audio.currentTime / audio.duration) * 100;
        if (newProgress === 100) {
          dispatch(playMusic(false));
          setTimeout(() => {
            dispatch(getSong(musicCurr + 1));
          }, 2000);
        }
        setProgress(newProgress);
        setCurrentTime(audio.currentTime);
      }
    };
    audio.addEventListener("timeupdate", handleDataProgressUpdate);
    audio.addEventListener("loadedmetadata", handleDataProgress);


    return () => {
      audio.removeEventListener("timeupdate", handleDataProgressUpdate);
      audio.removeEventListener("loadedmetadata", handleDataProgress);
    };
  }, [musicCurr]);

  const handleIsSuffer = () => {
    setIsSuffer(!isSuffer);
  };
  const handleIsRepeat = () => {
    const audio = audioRef.current;
    audio.loop === true ? (audio.loop = false) : (audio.loop = true);
    setIsRepeat(!isRepeat);
  };
  const handleDeaf = () => {
    setIsDeaf(!isDeaf);
  };
  useEffect(() => {
    if (musicCurr) {
      const index = listSong.findIndex((item) => item.id === musicCurr.id);
      if (index !== -1) {
        dispatch(getSong(index));
      }
    }
  }, [musicCurr]);

  const handleProgess = (e) => {
    const audio = audioRef.current;
    const time = e.target.value;
    const newTime = (time / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(time);
  };

  const handleNext = () => {
    dispatch(getSong(musicCurr + 1));
    if (musicCurr >= listSong.length - 1) {
      dispatch(getSong(0));
    }
  };
  const handlePrev = () => {
    dispatch(getSong(musicCurr - 1));
    if (musicCurr === 0) {
      dispatch(getSong(0));
    }
  };
  const handleChange = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    const volumnChange = e.target.value;
    if (volumnChange == 0) {
      setIsDeaf(true);
    } else {
      setIsDeaf(false);
    }
    audio.volume = volumnChange;
    setVolume(volumnChange);
  };
  return (
    <div className="h-[90px] bottom-0 w-full flex justify-between px-3 fixed bg-black">
      <div className="flex items-center gap-2 ">
        <img src={music?.img} width={"70px"} height={"70px"} />
        <div className="text-white leading-5">
          <p className="hover:underline-offset-1 hover:underline cursor-pointer">
            {music?.name}
          </p>
          <p className="text-sm text-gray-500 hover:underline-offset-1 hover:underline cursor-pointer">
            {music?.singer}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex items-center gap-3">
          <ButtonPlay handleClick={handleIsSuffer}>
            <i
              className={`fa-solid fa-shuffle text-xl ${
                isSuffer ? "text-white " : "text-gray-500"
              }`}
            ></i>
          </ButtonPlay>
          <ButtonPlay handleClick={handlePrev}>
            <i className="fa-solid fa-backward-step text-white text-xl w-full"></i>
          </ButtonPlay>
          {!isPlaying ? (
            <ButtonPlay handleClick={handlePlay}>
              <i className="fa-solid fa-play text-white text-xl w-full"></i>
            </ButtonPlay>
          ) : (
            <ButtonPlay handleClick={handlePlay}>
              <i className="fa-solid fa-pause text-white text-xl w-full"></i>
            </ButtonPlay>
          )}
          <ButtonPlay handleClick={handleNext}>
            <i className="fa-solid fa-forward-step text-white text-xl w-full"></i>
          </ButtonPlay>
          <ButtonPlay handleClick={handleIsRepeat}>
            <i
              className={`fa-solid fa-repeat ${
                isRepeat ? "text-white" : "text-gray-500"
              } text-xl w-full`}
            ></i>
          </ButtonPlay>
        </div>
        <input
          type="range"
          value={progress}
          min="0"
          max="100"
          className="w-[500px]"
          onChange={handleProgess}
        />
        <audio ref={audioRef} src={music?.path}></audio>
      </div>
      <div className="flex items-center space-x-1">
        <ButtonPlay handleClick={handleDeaf}>
          <i
            className={`fa-solid volumn ${
              isDeaf ? "fa-volume-low" : "fa-volume-high"
            } text-white text-xl`}
          ></i>
        </ButtonPlay>
        <input
          type="range"
          value={volume}
          min="0"
          max="1"
          step="0.1"
          className="w-[120px] h-1 hidden md:block"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Playground;
