import React from "react";
import { useRef, useState } from "react";
const DurationControl = ({ data, play_data }) => {
  const durationRef = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const handleLoadedMetadata = () => {
    if (data.audioRef.current) {
      setDuration(data.audioRef.current.duration);
    }
  };
  const handleTimeUpdate = () => {
    if (data.audioRef.current && duration > 0) {
      const updatedCurrentTime =
        (data.audioRef.current.currentTime / duration) * 100;
      setCurrentTime(updatedCurrentTime);

      if (updatedCurrentTime >= 99 && !autoplay) {
        data.togglePrevious();
      }
    }
  };

  const durationChange = () => {
    if (data.audioRef.current && durationRef.current) {
      const seekTo = (parseFloat(durationRef.current.value) / 100) * duration;
      setCurrentTime(parseFloat(durationRef.current.value));
      data.audioRef.current.currentTime = seekTo;
    }
  };

  return (
    <div className="duration">
      <input
        ref={durationRef}
        type="range"
        className="progress-bar"
        max="100"
        value={currentTime}
        onChange={() => durationChange()}
      />
      <div className="duration-lbl">
        {Math.floor(currentTime / 60)}:
        {("0" + Math.floor(currentTime % 60)).slice(-2)}/
        {Math.floor(duration / 60)}:
        {("0" + Math.floor(duration % 60)).slice(-2)}
      </div>
      <audio
        ref={data.audioRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={play_data.song_src} />
      </audio>
    </div>
  );
};

export default DurationControl;
