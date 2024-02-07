import React from 'react'
import APIFetch from '../../../utils/APIFetch';

const RadioDetail = ({ name, resp, liked, setLiked, control }) => {
  const playHandler = async () => {
    var copy_pl = [...control.playlist];
    await Promise.all(
    Object.keys(resp).map(async (item, index) => {
        item = resp[item].song;
        const src = await APIFetch(`playById?id=${item.id}`);
        copy_pl.push({
          song: item.song,
          album: item.album,
          album_url: item.image,
          song_src: src.streamurl.auth_url.split("?")[0],
        });
      })
    );

    control.setPlaylist(copy_pl);
    control.setCurrentPlaying(copy_pl.length - 1);
    control.audioRef.current.load();
  };

  return (
    <div className="radio-details">
      <div className="banner">
        <img src={resp[0].song.image.replace("150x150", "500x500")} alt="banner" />
      </div>
      <div className="radio-info">
        <div className="radio-name">{name}</div>
        <div className="audience-detail">
          <span className="followers">{resp[0].song.singers}</span>
          <span className="bullet">&#x2022;</span>
          <span className="song-count">{resp[0].song.label}</span>
        </div>
        <div className="btns">
          <div className="play-button" onClick={() => playHandler()}>
            Play
          </div>
          <div
            className="like-button"
            id={liked}
            onClick={() => {
              setLiked(liked === "on" ? "" : "on");
            }}
          >
            <svg viewBox="0 0 24 24">
              <use xlinkHref="#heart" />
              <use xlinkHref="#heart" />
            </svg>
            <svg className="hide" viewBox="0 0 24 24">
              <defs>
                <path
                  id="heart"
                  d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
                />
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioDetail