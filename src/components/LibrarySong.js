import React from "react";

const LibrarySong = ({
  audioRef,
  songs,
  song,
  id,
  setCurrentSong,
  isPlaying,
  setSongs,
  currentSong,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    //check if song is playing
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.id === currentSong.id ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
