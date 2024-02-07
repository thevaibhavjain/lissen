import React, { useEffect, useState } from 'react'
import './Radio.css'
import { useParams } from 'react-router-dom'
import APIFetch from '../../utils/APIFetch';
import RadioDetail from './components/RadioDetail';
import RadioItem from './components/RadioItem';

const Radio = ({control}) => {
  const [resp, setResp] = useState("");
  const [liked, setLiked] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`getStationById?name=${params.query}&count=30`);
      delete data['stationid'];
      setResp(data);
    };
    fetchData();
  }, [params.query]);

  const ui = (
    <div id="main" className="radio-main">
      <RadioDetail
        name={params.query}
        resp={resp}
        liked={liked}
        setLiked={setLiked}
        control={control}
      />
      <div className="radio-items">
        {resp &&
        Object.keys(resp).map((item, index) => {
          item = resp[item].song;
            return <RadioItem item={item} index={index} control={control} />;
          })}
      </div>
    </div>
  );

  return resp && ui;
}

export default Radio