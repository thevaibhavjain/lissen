import React, { useEffect, useState } from "react";
import APIFetch from "../../../utils/APIFetch";

const Lyrics = ({id}) => {
  const [resp, setResp] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(`getLyricsById?id=${id}`);
      setResp(data);
    };
    fetchData();
  }, [id]);
  return (
    <div className="lyrics-container">
      <div className="lyrics-label">Song Lyrics</div>
      <div
        className="lyrics"
        dangerouslySetInnerHTML={{ __html: (resp.lyrics? resp.lyrics: "Not available") }}
      ></div>
    </div>
  );
};

export default Lyrics;
