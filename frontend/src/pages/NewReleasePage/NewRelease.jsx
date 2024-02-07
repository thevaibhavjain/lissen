import React, { useEffect, useState } from 'react'
import './NewRelease.css'
import APIFetch from '../../utils/APIFetch';
import Category from '../../components/MainPanel/components/Category/Category';

const NewRelease = () => {
  const [resp, setResp] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`getAlbums?count=100&page=1`);
      setResp(data);
    };
    fetchData();
  }, []);

  return (
    <div id="main">
      {resp && <Category name={"new_release"} data={resp.data}/>}
    </div>
  );
}

export default NewRelease