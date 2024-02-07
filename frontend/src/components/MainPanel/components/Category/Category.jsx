import React from "react";
import Card from "../Card/Card";
import "./Category.css";

const Category = ({ name, data }) => {
  function handle_browse(item, index) {
    const parsed_data = {
      id: item.id,
      type: item.type,
      title: item.title,
      image: item.image,
    };
    return <Card key={index} data={parsed_data} />;
  }

  function handle_charts(item, index) {
    const parsed_data = {
      id: item.id,
      type: item.type,
      title: item.title,
      image: item.image,
    };
    return <Card key={index} data={parsed_data} />;
  }

  function handle_new(item, index) {
    const parsed_data = {
      id: item.perma_url.split("/").slice(-1),
      type: item.type,
      title: item.title,
      image: item.image,
      artists: item.more_info.artistMap.artists.map((item, _) => item.name) + "",
    };
    return <Card key={index} data={parsed_data} />;
  }

  function handle_trending(item, index) {
    let parsed_data = {};
    if (item.type === "album") {
      parsed_data = {
        id: item.perma_url.split("/").slice(-1),
        type: item.type,
        title: item.title,
        image: item.image,
        artists: item.more_info.artistMap.artists.map((item, _) => item.name) + " ",
      };
    }
    if (item.type === "playlist") {
      parsed_data = {
        id: item.id,
        type: item.type,
        title: item.title,
        image: item.image,
        artists: item.more_info.firstname,
      };
    }
    if (item.type === "song") {
      parsed_data = {
        id: item.id,
        type: item.type,
        title: item.title,
        image: item.image,
        artists: item.more_info.music,
      };
    }
    return <Card key={index} data={parsed_data} />;
  }

  function handle_playlist(item, index) {
    const parsed_data = {
      id: item.id,
      type: item.type,
      title: item.title,
      image: item.image,
      artists: item.more_info.uid,
    };
    return <Card key={index} data={parsed_data} />;
  }

  function handle_radio(item, index) {
    const parsed_data = {
      id: item.id,
      type: "radio",
      title: item.title,
      image: item.image,
    };
    return <Card key={index} data={parsed_data} />;
  }

  return (
    <div className="category">
      <div className="category-name">{name.replace("_", " ")}</div>
      <div className="items">
        {data.length > 1 &&
          data.map((item, index) => {
            switch (name) {
              case "browse_discover":
                return handle_browse(item, index);
              case "charts":
                return handle_charts(item, index);
              case "new_albums":
                return handle_new(item, index);
              case "new_trending":
                return handle_trending(item, index);
              case "top_playlists":
                return handle_playlist(item, index);
              case "radio":
                return handle_radio(item, index);
              default:
                return null;
            }
          })}
      </div>
    </div>
  );
};

export default Category;
