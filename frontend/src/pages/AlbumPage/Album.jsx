import React from 'react';
import './Album.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import APIFetch from '../../utils/APIFetch';
import AlbumItem from './components/AlbumItem';
import AlbumDetails from './components/AlbumDetails';

const Album = ({control}) => {
  const [resp, setResp] = useState("");
  const [liked, setLiked] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`getAlbumById?id=${params.album_id}`);
      setResp(data);
    };
    fetchData();
  }, [params.album_id]);
  const ui = (
    <div id="main" className="album-main">
      <AlbumDetails resp={resp} liked={liked} setLiked={setLiked} control={control}/>
      <div className="playlist-items">
        {resp &&
          resp.list.map((item, index) => {
            return (
              <AlbumItem
                item={item}
                index={index}
                key={index}
                control={control}
              />
            );
          })}
      </div>
    </div>
  );

  return resp && ui;
}

export default Album