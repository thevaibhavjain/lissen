import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div id="navbar">
      <div className="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path
            fill="aliceblue"
            d="M320-120q-83 0-141.5-58.5T120-320v-392q0-54 33-91t87-37q54 0 87 33t33 87q0 51-34.5 85.5T240-600h-40v280q0 50 35 85t85 35q50 0 85-35t35-85v-320q0-83 58.5-141.5T640-840q83 0 141.5 58.5T840-640v400q0 51-38.5 85.5T712-120q-51 0-81.5-34.5T600-240q0-51 34.5-85.5T720-360h40v-280q0-50-35-85t-85-35q-50 0-85 35t-35 85v320q0 83-58.5 141.5T320-120ZM200-680h40q17 0 28.5-11.5T280-720q0-17-11.5-28.5T240-760q-17 0-28.5 11.5T200-720v40Zm520 480q17 0 28.5-11.5T760-240v-40h-40q-17 0-28.5 11.5T680-240q0 17 11.5 28.5T720-200Zm0-40ZM240-720Z"
          />
        </svg>
        <Link to="/">Lissen</Link>
      </div>
      <div className="menu">
        <NavLink className="new-release" to={"/new-release"}>New Release</NavLink>
        <NavLink className="top-artists" to={"/top-artists"}>Top Artists</NavLink>
        <NavLink className="top-charts" to={"/top-charts"}>Top Charts</NavLink>
        <NavLink className="featured-stations" to={"/featured-stations"}>Radio</NavLink>
        <NavLink className="featured-playlist" to={"/featured-playlists"}>Playlists</NavLink>
        <NavLink className="search" to={"/search"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="aliceblue"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
