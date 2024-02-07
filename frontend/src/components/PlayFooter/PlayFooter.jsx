import React from "react";
import SongInfo from "./components/SongInfo";
import MusicControls from "./components/MusicControl";
import DurationControl from "./components/DurationControl";
import VolumeControl from "./components/VolumeControl";
import "./PlayFooter.css";

const PlayFooter = ({ control }) => {
  const audioRef = control.audioRef;
  const playRef = control.playRef;
  const pauseRef = control.pauseRef;
  const [playing, setPlaying] = [control.playing, control.setPlaying];
  const togglePlayPause = control.togglePlayPause;
  const toggleNext = control.toggleNext;
  const togglePrevious = control.togglePrevious;

  const control_data = {
    audioRef,
    playRef,
    pauseRef,
    playing,
    setPlaying,
    togglePlayPause,
    togglePrevious,
    toggleNext
  };

  return (
    <div className="playbar">
      <SongInfo play_data={control.playlist[control.currentPlaying]} />
      <MusicControls data={control_data} />
      <DurationControl data={control_data} play_data={control.playlist[control.currentPlaying]} />
      <VolumeControl data={control_data} />
    </div>
  );
};

export default PlayFooter;
