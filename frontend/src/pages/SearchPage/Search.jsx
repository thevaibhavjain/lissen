import React, { useEffect, useState } from 'react'
import APIFetch from '../../utils/APIFetch';
import './Search.css';

const Search = () => {
    const [resptop, setResptop] = useState("");
    const [resp, setResp] = useState("");

    const fetchData = async () => {
      const data = await APIFetch(`getTopSearch`);
      setResp(data);
    };

    const searchData = async (query, count) => {
      const data = await APIFetch(`search?query=${query}&page=${count}`);
      setResptop(data);
    };

    useEffect(() => {
      searchData("namo", 40);
    }, []);
    
    return <div id="main">{JSON.stringify(resptop)}</div>;

}

export default Search