import React, { useRef, useState } from "react";
import TypeHandler from "../../../../utils/TypeHandler";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import "./Card.css";

const Card = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef();
  const navigate = useNavigate();

  function handleCard() {
    const target = cardRef.current;
    TypeHandler(target, navigate);
  }

  function handleImageLoad() {
    setImageLoaded(true);
  }

  return (
    <div
      ref={cardRef}
      className="card"
      id={data.id}
      type={data.type}
      onClick={handleCard}
    >
      <div className="album-image">
        <svg
          className="card-play"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="36"
          height="36"
          fill="white"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        {data.image ? (
          <img
            src={data.image}
            alt="track banner"
            onLoad={handleImageLoad}
            className={imageLoaded ? "loaded" : ""}
          />
        ) : (
          <Skeleton variant="rectangular" width={141} height={141} />
        )}
      </div>
      {!imageLoaded && <Skeleton variant="text" width={160} height={24} />}
      {!imageLoaded && <Skeleton variant="text" width={160} height={20} />}
      {imageLoaded && <div className="track-name">{data.title}</div>}
      {imageLoaded && (
        <div className="artists">
          {data.artists ? data.artists : "Various artists"}
        </div>
      )}
    </div>
  );
};

export default Card;
