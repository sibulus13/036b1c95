import React from "react";
import { IoIosCall } from "react-icons/io";
import { IoArchive } from "react-icons/io5";
import { useDispatch } from "react-redux";

import "../css/navBar.css";
import { toCallPage, toArchivePage } from "../redux/store";

const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <button
          className="navbar__container--right--button"
          onClick={() => dispatch(toCallPage())}
        >
          <IoIosCall className="navbar__icon" />
        </button>
        <button
          className="navbar__container--right--button"
          onClick={() => dispatch(toArchivePage())}
        >
          <IoArchive className="navbar__icon" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
