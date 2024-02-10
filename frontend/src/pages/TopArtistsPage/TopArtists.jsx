import React, { useEffect, useState } from 'react'
import './TopArtists.css'
import APIFetch from '../../utils/APIFetch';
import Category from '../../components/MainPanel/components/Category/Category';
import CategorySkeleton from '../../components/MainPanel/components/Category/CategorySkeleton';
const TopArtists = () => {
  const [resp, setResp] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`getTopArtists`);
      setResp(data);
    };
    fetchData();
  }, []);

  return (
    <div id="main">
      {resp ? (
        <Category name={"top_artists"} data={resp.top_artists} />
      ) : (
        <>
          <CategorySkeleton />
          <CategorySkeleton />
        </>
      )}
    </div>
  );
}

export default TopArtists