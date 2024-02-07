import BasicRouter from './Routes/BasicRouter';
import { useState } from 'react';
import './App.css';
import logo from './resources/favicon.ico'

function App() {
  const [playlist, setPlaylist] = useState([
    {
      song: "Play a song",
      album: "Album",
      album_url: logo,
      song_src: null,
    }
  ]);
  const [currentPlaying, setCurrentPlaying] = useState(0);

  return (
    <BasicRouter playState={{ currentPlaying, setCurrentPlaying, playlist, setPlaylist }}/>
  );
}

export default App;
