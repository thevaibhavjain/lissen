import React, { useEffect, useState } from 'react'
import APIFetch from '../../utils/APIFetch';
import './TopPlaylists.css'
import Category from '../../components/MainPanel/components/Category/Category';

const TopPlaylists = ({control}) => {
  const [resp, setResp] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`getFeaturedPlaylists?count=30&page=1`);
      setResp(data);
    };
    fetchData();
  }, []);

  return (
    <div id="main">
      {resp && <Category name={"featured_playlists"} data={resp.data} />}
    </div>
  );
}

export default TopPlaylists