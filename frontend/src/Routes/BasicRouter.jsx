import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Album from "../pages/AlbumPage/Album";
import Radio from "../pages/RadioPage/Radio";
import Playlist from "../pages/PlaylistPage/Playlist";
import Song from "../pages/SongPage/Song";
import Artist from "../pages/ArtistPage/Artist";
import Navbar from "../components/Navbar/Navbar";
import PlayFooter from "../components/PlayFooter/PlayFooter";
import TopArtists from "../pages/TopArtistsPage/TopArtists";
import TopCharts from "../pages/TopChartsPage/TopCharts";
import TopPlaylists from "../pages/TopPlaylistsPage/TopPlaylists";
import Search from "../pages/SearchPage/Search";
import NewRelease from "../pages/NewReleasePage/NewRelease";
import Radios from "../pages/RadiosPage/Radios";
import PlaylistManager from "../components/PlaylistManager/PlaylistManager";

import { useRef } from "react";

const BasicRouter = ({ playState }) => {
  const audioRef = useRef();
  const playRef = useRef();
  const pauseRef = useRef();
  const [playing, setPlaying] = useState(false);
  function togglePlayPause() {
    var play = playRef.current;
    var pause = pauseRef.current;
    var audio = audioRef.current;
    try {
      if (playing) {
        play.style.display = "none";
        pause.style.display = "block";
        audio.pause();
      } else {
        play.style.display = "block";
        pause.style.display = "none";

        if (audio.paused) {
          audio.play().catch((error) => {
            console.error("Failed to play audio:", error);
          });
        }
      }

      setPlaying(!playing);
    } catch (error) {
      console.error("Error toggling play/pause:", error);
    }
  }

  function toggleNext() {
    if (playState.currentPlaying < playState.playlist.length - 1) {
      playState.setCurrentPlaying(playState.currentPlaying + 1);

      audioRef.current.addEventListener("loadeddata", () => {
        audioRef.current.play().catch((error) => {
          console.error("Failed to play audio:", error);
        });
      });

      audioRef.current.load();
    }
  }

  function togglePrevious() {
    if (playState.currentPlaying > 1) {
      playState.setCurrentPlaying(playState.currentPlaying - 1);

      audioRef.current.addEventListener("loadeddata", () => {
        audioRef.current.play().catch((error) => {
          console.error("Failed to play audio:", error);
        });
      });

      audioRef.current.load();
    }
  }

  playState.playRef = playRef;
  playState.pauseRef = pauseRef;
  playState.audioRef = audioRef;
  playState.setPlaying = setPlaying;
  playState.playing = playing;
  playState.togglePlayPause = togglePlayPause;
  playState.toggleNext = toggleNext;
  playState.togglePrevious = togglePrevious;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home control={playState} />} />
        <Route
          path="/playlist/:playlist_id"
          element={<Playlist control={playState} />}
        />
        <Route
          path="/album/:album_id"
          element={<Album control={playState} />}
        />
        <Route path="/song/:song_id" element={<Song control={playState} />} />
        <Route
          path="/artist/:artist_id"
          element={<Artist control={playState} />}
        />
        <Route path="/new-release" element={<NewRelease control={playState} />} />
        <Route path="/top-artists" element={<TopArtists control={playState} />} />
        <Route path="/top-charts" element={<TopCharts control={playState} />} />
        <Route path="/featured-stations" element={<Radios control={playState} />} />
        <Route path="/featured-playlists" element={<TopPlaylists control={playState} />} />
        <Route path="/search" element={<Search control={playState} />} />
        <Route path="/radio/:query" element={<Radio control={playState} />} />
      </Routes>
      <PlayFooter control={playState} />
      <PlaylistManager control={playState} />
    </BrowserRouter>
  );
};

export default BasicRouter;
