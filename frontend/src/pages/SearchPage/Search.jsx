import React, { useEffect, useState } from "react";
import APIFetch from "../../utils/APIFetch";
import "./Search.css";
import Category from "../../components/MainPanel/components/Category/Category";

const Search = () => {
  const [resptop, setResptop] = useState("");
  const [resp, setResp] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [timer, setTimer] = useState(null);
  const [typeidx, setTypeidx] = useState(0);

  const fetchData = async () => {
    const data = await APIFetch(`getTopSearch`);
    setResptop(data);
  };

  const searchData = async (query, count) => {
    const data = await APIFetch(
      `search?query=${query.replaceAll(" ", "+")}&page=${count}&type=${typeidx}`
    );
    setResp(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(() => {
        searchData(searchQuery, 1);
      }, 500);
      setTimer(newTimer);
    }
  }, [searchQuery, typeidx]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.trim() !== "") {
      searchData(searchQuery, 1);
    }
  };

  return (
    <div id="main">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search music, album, radio, podcast ..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearchButtonClick}>Search</button>
      </div>
      <div className="filter-box">
        <div
          className={"playlists" + (typeidx === 0 ? " active" : "")}
          onClick={() => setTypeidx(0)}
        >
          Playlists
        </div>
        <div
          className={"songs" + (typeidx === 1 ? " active" : "")}
          onClick={() => setTypeidx(1)}
        >
          Songs
        </div>
        <div
          className={"albums" + (typeidx === 2 ? " active" : "")}
          onClick={() => setTypeidx(2)}
        >
          Albums
        </div>
        <div
          className={"podcasts" + (typeidx === 3 ? " active" : "")}
          onClick={() => setTypeidx(3)}
        >
          Podcasts
        </div>
        <div
          className={"artists" + (typeidx === 4 ? " active" : "")}
          onClick={() => setTypeidx(4)}
        >
          Artists
        </div>
      </div>
      {searchQuery.length < 1 ? (
        <div className="top-searches">
          <Category name={"top_searches"} data={resptop} />
        </div>
      ) : (
        <div className="search">
          <Category name={"result"} data={resp.results} />
        </div>
      )}
    </div>
  );
};

export default Search;
