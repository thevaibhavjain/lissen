import React, { useState, useRef } from "react";
import "./PlaylistManager.css";
import PMItem from "./components/PMItem";

const PlaylistManager = ({ control }) => {
  const floatingButtonRef = useRef();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const removePlaylist = (index) => {
    const updatedPlaylist = [...control.playlist];
    updatedPlaylist.splice(index, 1);
    control.setPlaylist(updatedPlaylist);
  };

  const handleRowClick = (index) => {
    control.setCurrentPlaying(index);
    control.audioRef.current.load();
  };

  const getModalPosition = () => {
    const floatingButton = floatingButtonRef.current;

    if (!floatingButton) return null;

    const rect = floatingButton.getBoundingClientRect();
    const top = rect.top + window.scrollY + rect.height + 10;
    const left = rect.left + window.scrollX;

    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  };

  return (
    <div>
      <div
        className={`floating-btn ${control.playing?"playing":""} ${showModal ? "active" : ""}`}
        onClick={toggleModal}
        ref={floatingButtonRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="28"
          viewBox="0 -960 960 960"
          width="28"
          fill="aliceblue"
        >
          <path d="M640-160q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 1.5t19 6.5v-328h200v80H760v360q0 50-35 85t-85 35ZM120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Z" />
        </svg>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal" style={getModalPosition()}>
              <ul>
                {control.playlist.map((item, index) => (
                    <PMItem item={item} control={control} index={index} removePlaylist={removePlaylist} handleRowClick={handleRowClick}/>
                ))}
              </ul>
            </div>
          </div>
      )}
    </div>
  );
};

export default PlaylistManager;
