import React from 'react'
import { Link } from 'react-router-dom';
import APIFetch from '../../../utils/APIFetch';

const PlaylistItem = ({ item, index, control }) => {
      const playHandler_single = async () => {
        var copy_pl = [...control.playlist];
        const src = await APIFetch(`playById?id=${item.id}`);
        copy_pl.push({
          song: item.song,
          album: item.album,
          album_url: item.image,
          song_src: src.streamurl.auth_url.split("?")[0],
        });

        control.setPlaylist(copy_pl);
        control.setCurrentPlaying(copy_pl.length - 1);
        control.audioRef.current.load();
      };
  return (
    <div className="item" key={index}>
      <span className="index">{index + 1}</span>
      <span className="banner" onClick={playHandler_single}>
        <img src={item.image} alt="" />
      </span>
      <Link
        to={`/song/${item.id}`}
        className="song-name"
        dangerouslySetInnerHTML={{ __html: item.song }}
      />
      <span className="artists">
        {Object.entries(item.artistMap).map((artist, index) => {
          return (
            <Link key={index} className="artist" to={`/artist/${artist[1]}`}>
              {artist[0]},&nbsp;
            </Link>
          );
        })}
      </span>
      <Link
        to={`/album/${item.album_url.split("/").slice(-1)}`}
        className="album-name"
        dangerouslySetInnerHTML={{ __html: item.album }}
      />

      <span className="like-btn">
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
      </span>
      <span className="duration">
        {Math.floor(item.duration / 60)}:
        {("0" + Math.floor(item.duration % 60)).slice(-2)}
      </span>
    </div>
  );
};

export default PlaylistItem