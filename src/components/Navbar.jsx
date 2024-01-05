
import React from "react";
import { MdCall, MdSettings } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { IoIosKeypad } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <MdCall />
        </li>
        <li className="nav-item">
          <GoPerson />
        </li>
        <li className="nav-item dialpad">
          <IoIosKeypad className="dialpad-icon" />
        </li>
        <li className="nav-item">
          <MdSettings />
        </li>
        <div className="last-icon">
          <div className="bell-icon">
            <div className="inner-circle"></div>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;