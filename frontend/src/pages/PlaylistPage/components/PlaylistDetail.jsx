import React from 'react'
import APIFetch from '../../../utils/APIFetch';

const PlaylistDetail = ({resp, liked, setLiked, control}) => {
    const playHandler = async () => {
      var copy_pl = [...control.playlist];
      await Promise.all(
        resp.songs.map(async (item) => {
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
    <div className="playlist-details">
      <div className="banner">
        <img src={resp.image} alt="banner" />
      </div>
      <div className="playlist-info">
        <div className="playlist-name">{resp.listname}</div>
        <div className="audience-detail">
          <span className="followers">{resp.follower_count} Followers</span>
          <span className="bullet">&#x2022;</span>
          <span className="song-count">{resp.list_count} Songs</span>
        </div>
        <div className="btns">
          <div className="play-button" onClick={()=>playHandler()}>Play</div>
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
}

export default PlaylistDetail