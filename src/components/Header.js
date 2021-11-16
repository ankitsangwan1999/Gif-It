import React from "react";
import Logo from "../static/Logo.jpg";
import "../styles/Header.css";

// TODO: ISSUE: Crop this Image for the Logo image to fit in Upper Right Corner. +5 For Creativity
const Header = () => {
    return (
        <div className="Header">
            <img id="logo" src={Logo} alt="Gif-It Logo" />
        </div>
    );
};

export default Header;
