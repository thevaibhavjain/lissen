import React from "react";

const SongInfo = ({ play_data }) => {
  return (
    <div className="song-info">
      <div className="song-logo">
        <img src={play_data.album_url} alt="album logo" />
      </div>
      <div className="song-details">
        <marquee scrollamount={3} className="song">
          {play_data.song}
        </marquee>
        <a href={play_data.album_url} className="album">
          {play_data.album}
        </a>
      </div>
    </div>
  );
};

export default SongInfo;
