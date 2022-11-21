import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  setSongInfo,
  songInfo,
  audioRef,
  currentSong,
  setCurrentSong,
  setIsPlaying,
  isPlaying,
  songs,
  setSongs,
}) => {
  const activeLibraryHandler = () => {
    setSongs(
      songs.map((song) => {
        return {
          ...song,
          active: song.id === currentSong.id,
        };
      })
    );
  };
  //event handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  //drag song moment
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  //skip track
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(
        songs[currentIndex + 1 === songs.length ? 0 : currentIndex + 1]
      );
      activeLibraryHandler(
        songs[currentIndex + 1 === songs.length ? 0 : currentIndex + 1]
      );
    } else {
      if (currentIndex === 0) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
      } else {
        await setCurrentSong(songs[currentIndex - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
      }
    }
    if (isPlaying) audioRef.current.play();
  };

  //format song time
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  //add styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
          <input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p> {songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
    </div>
  );
};

export default Player;
