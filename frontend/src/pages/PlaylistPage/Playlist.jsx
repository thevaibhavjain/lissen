import React, { useEffect, useState } from "react";
import "./Playlist.css";
import { useParams } from "react-router-dom";
import APIFetch from "../../utils/APIFetch";
import PlaylistItem from "./components/PlaylistItem";
import PlaylistDetail from "./components/PlaylistDetail";

const Playlist = ({control}) => {
  const [resp, setResp] = useState("");
  const [liked, setLiked] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`getPlaylistById?id=${params.playlist_id}`);
      setResp(data);
    };
    fetchData();
  }, [params.playlist_id]);
  const ui = (
    <div id="main" className="playlist-main">
      <PlaylistDetail resp={resp} liked={liked} setLiked={setLiked} control={control}/>
      <div className="playlist-items">
        {resp && resp.songs.map((item, index)=>{
          return <PlaylistItem item={item} index={index} control={control}/>
        })}
      </div>
    </div>
  );

  return resp && ui;
};

export default Playlist;
