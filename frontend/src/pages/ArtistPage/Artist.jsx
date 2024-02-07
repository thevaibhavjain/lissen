import './Artist.css'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIFetch from "../../utils/APIFetch";
import ArtistDetail from "./components/ArtistDetail";
import SongItem from './components/SongItem';

const Artist = ({control}) => {
  const [resp, setResp] = useState("");
  const [liked, setLiked] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`getArtist?id=${params.artist_id}&count=20`);
      setResp(data);
    };
    fetchData();
  }, [params.artist_id]);
  const ui = (
    <div id="main" className="playlist-main">
      <ArtistDetail resp={resp} liked={liked} setLiked={setLiked} control={control}/>
      <div className="playlist-items">
        {resp &&
          resp.topSongs.map((item, index) => {
            return <SongItem item={item} index={index} control={control}/>;
          })}
      </div>
    </div>
  );

  return resp && ui;

}

export default Artist