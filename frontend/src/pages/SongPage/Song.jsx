import React, { useEffect, useState } from 'react'
import './Song.css'
import { useParams } from 'react-router-dom'
import APIFetch from '../../utils/APIFetch';
import SongDetail from './components/SongDetail';
import Lyrics from './components/Lyrics';

const Song = ({control}) => {
  const [liked, setLiked] = useState("");
  
  const params = useParams();
  const [resp, setResp] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`getSongById?id=${params.song_id}`);
      setResp(data);
    };
    fetchData();
  }, [params.song_id]);

  const ui = (
    <div id="main" className="song-main">
      <SongDetail
        resp={resp}
        liked={liked}
        setLiked={setLiked}
        control={control}
      />
      <Lyrics id={params.song_id} />
    </div>
  );

  return resp && ui;
}

export default Song