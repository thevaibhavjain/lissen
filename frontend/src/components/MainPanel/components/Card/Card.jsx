import React, { useRef } from 'react';
import TypeHandler from '../../../../utils/TypeHandler';
import { useNavigate } from "react-router-dom";
import './Card.css';

const Card = ({data}) => {
  const cardRef = useRef();
  const navigate = useNavigate();

  function handleCard(){
    const target = cardRef.current;
    TypeHandler(target, navigate);
  }

  return (
    <div ref={cardRef} className="card" id={data.id} type={data.type} onClick={()=>handleCard()}>
      <div className="album-image">
        <svg className='card-play' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
        <img src={data.image} alt="track banner" />
      </div>
      <div className="track-name">{data.title}</div>
      <div className="artists">{data.artists?data.artists:"Various artists"}</div>
    </div>
  );
}

export default Card;