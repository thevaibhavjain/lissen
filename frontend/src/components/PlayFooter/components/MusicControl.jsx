import React from "react";

const MusicControls = ({ data }) => {
  return (
    <div className="music-controls">
      <svg
        onClick={() => data.togglePrevious()}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="36"
        height="36"
        fill="white"
        className="control-icon"
      >
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="36"
        height="36"
        fill="white"
        className="control-icon"
        onClick={() => data.togglePlayPause()}
      >
        <path
          ref={data.playRef}
          d="M6 6h4v12H6zM14 6h4v12h-4z"
          style={{ display: "none" }}
        />
        <path ref={data.pauseRef} d="M8 5v14l11-7z" />
      </svg>

      <svg
        onClick={() => data.toggleNext()}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="36"
        height="36"
        fill="white"
        className="control-icon"
        style={{ transform: "rotate(180deg)" }}
      >
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
      </svg>
    </div>
  );
};

export default MusicControls;
