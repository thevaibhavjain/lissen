import React from "react";
import "./Mainpanel.css";
import Category from "./components/Category/Category";

const MainPanel = ({ data }) => {
  delete data["global_config"];
  delete data["browse_discover"];
  delete data["history"];
  delete data["promo:vx:data:31"];
  delete data["promo:vx:data:76"];
  delete data["promo:vx:data:107"];
  delete data["promo:vx:data:113"];
  delete data["promo:vx:data:114"];
  delete data["promo:vx:data:116"];
  delete data["promo:vx:data:185"];
  delete data["promo:vx:data:140"];
  delete data["artist_recos"];
  delete data["tag_mixes"];
  delete data["city_mod"];

  return (
    <div id="main">
      {Object.keys(data).map((item, index) => (
        data[item].length>1 && <Category key={index} name={item} data={data[item]} />
      ))}
    </div>
  );
};

export default MainPanel;
