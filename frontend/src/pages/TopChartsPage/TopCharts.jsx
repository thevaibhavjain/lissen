import React, { useEffect, useState } from 'react'
import APIFetch from '../../utils/APIFetch';
import './TopCharts.css';
import Category from '../../components/MainPanel/components/Category/Category';

const TopCharts = () => {
  const [resp, setResp] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`getCharts`);
      setResp(data);
    };
    fetchData();
  }, []);

    return (
      <div id="main">
        {resp && <Category name={"charts"} data={resp} />}
      </div>
    );
}

export default TopCharts