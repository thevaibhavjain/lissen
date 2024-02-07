import React from "react";
import { Link } from "react-router-dom";
import APIFetch from "../../../utils/APIFetch";
const AlbumDetails = ({ resp, liked, setLiked, control }) => {
  const playHandler = async () => {
    var copy_pl = [...control.playlist];
    await Promise.all(
      resp.list.map(async (item) => {
        const src = await APIFetch(`playById?id=${item.id}`);
        copy_pl.push({
          song: item.title,
          album: item.more_info.album,
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
    <div className="album-details">
      <div className="banner">
        <img src={resp.image.replace("150x150", "500x500")} alt="banner" />
      </div>
      <div className="album-info">
        <div
          className="album-name"
          dangerouslySetInnerHTML={{ __html: resp.title }}
        ></div>
        <div className="audience-detail">
          <span className="artists">
            by&nbsp;
            {resp.more_info.artistMap.artists.map((artist, index) => {
              return (
                <Link
                  key={index}
                  className="artist"
                  to={`/artist/${artist.id}`}
                >
                  {artist.name},&nbsp;
                </Link>
              );
            })}
          </span>
          <span className="bullet">&#x2022;</span>
          <span className="song-count">{resp.list_count}&nbsp;Songs</span>
          <span className="bullet">&#x2022;</span>
          <span className="play_count">
            {resp.list[0].play_count}&nbsp;Plays
          </span>
          <span className="bullet">&#x2022;</span>
          <span className="duration">
            {Math.floor(resp.list[0].more_info.duration / 60)}:
            {("0" + Math.floor(resp.list[0].more_info.duration % 60)).slice(-2)}
          </span>
        </div>
        <div className="copyright-info audience-detail">
          {resp.list[0].more_info.copyright_text}
        </div>
        <div className="btns">
          <div className="play-button" onClick={playHandler}>
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

export default AlbumDetails;
