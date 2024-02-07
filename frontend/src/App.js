import './App.css';
import BasicRouter from './Routes/BasicRouter';
import { useState } from 'react';

function App() {
  const [playlist, setPlaylist] = useState([
    {
      song: "Song name goes here",
      album: "Album name",
      album_url: "https://picsum.photos/200/",
      song_src: null,
      // song_src: "https://onlinetestcase.com/wp-content/uploads/2023/06/500-KB-MP3.mp3"
    }
  ]);
  const [currentPlaying, setCurrentPlaying] = useState(0);

  return (
    <BasicRouter playState={{ currentPlaying, setCurrentPlaying, playlist, setPlaylist }}/>
  );
}

export default App;
