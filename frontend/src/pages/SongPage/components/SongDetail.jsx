import React from "react";
import { Link } from "react-router-dom";
import APIFetch from "../../../utils/APIFetch";

const SongDetail = ({ resp, liked, setLiked, control }) => {
      const playHandler_single = async () => {
        var copy_pl = [...control.playlist];
        const src = await APIFetch(`playById?id=${resp.id}`);
        copy_pl.push({
          song: resp.song,
          album: resp.album,
          album_url: resp.image,
          song_src: src.streamurl.auth_url.split("?")[0],
        });

        control.setPlaylist(copy_pl);
        control.setCurrentPlaying(copy_pl.length - 1);
        control.audioRef.current.load();
      };
  const ui = (
    <div className="song-detailss">
      <div className="banner">
        <img src={resp.image.replace("150x150", "500x500")} alt="banner" />
      </div>
      <div className="song-info_">
        <div
          className="song-name"
          dangerouslySetInnerHTML={{ __html: resp.song }}
        ></div>
        <div className="audience-detail">
          <span className="artists">
            <Link
              to={`/album/${resp.albumid}`}
              dangerouslySetInnerHTML={{ __html: resp.album }}
            />
            &nbsp;by&nbsp;
            {Object.entries(resp.artistMap)
              .slice(0, 2)
              .map((artist, index) => {
                return (
                  <Link
                    key={index}
                    className="artist"
                    to={`/artist/${artist[1]}`}
                  >
                    {artist[0]},&nbsp;
                  </Link>
                );
              })}
          </span>
          <span className="bullet">&#x2022;</span>
          <span className="play_count">{resp.play_count}&nbsp;Plays</span>
          <span className="bullet">&#x2022;</span>
          <span className="duration">
            {Math.floor(resp.duration / 60)}:
            {("0" + Math.floor(resp.duration % 60)).slice(-2)}
          </span>
          <span className="bullet">&#x2022;</span>
          <span className="language">{resp.language}</span>
        </div>
        <div className="copyright-info audience-detail">
          {resp.copyright_text}
        </div>
        <div className="btns">
          <div className="play-button" onClick={playHandler_single}>
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

  return ui;
};

export default SongDetail;
