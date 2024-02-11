import React from 'react'
import { Delete as DeleteIcon } from "@mui/icons-material";
import './PMItem.css';

const PMItem = ({item, control, index, removePlaylist, handleRowClick}) => {
  return (
    <li key={index} onClick={()=>handleRowClick(index)} className={`pmitem ${control.currentPlaying === index ? "pmiactive" : ""}`}>
      {item && item.album_url && (
        <img src={item.album_url} alt={item.song} />
      )}
      <span className="pmi-name">{item && item.song}</span>
      <DeleteIcon onClick={() => removePlaylist(index)} color="primary" className='delete-icon' />
    </li>
  );
}

export default PMItem
