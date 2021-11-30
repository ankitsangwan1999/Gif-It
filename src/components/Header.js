import React from "react";
import Logo from "../static/Logo.jpg";
import "../styles/Header.css";

const Header = () => {
    return (
        <div className="Header">
            <img id="logo" src={Logo} alt="Gif-It Logo" />
        </div>
    );
};

export default Header;
