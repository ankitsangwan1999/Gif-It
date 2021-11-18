import React, { useState } from "react";
import Header from "./Header.js";
import SearchBar from "./SearchBar.js";

import Footer from "./Footer.js";
import "../styles/App.css";
import MainContent from "./MainContent.js";

const App = () => {
    const [videosList, setVideosList] = useState([]);

    return (
        <div className="App">
            <div className="Header-Search-Container">
                <Header />
                <SearchBar setVideosList={setVideosList} />
            </div>
            {videosList.length === 0 ? (
                <div className="NoResults">
                    Search Results will be shown here...
                </div>
            ) : (
                <MainContent
                    videosList={videosList}
                    setVideosList={setVideosList}
                />
            )}
            <Footer />
        </div>
    );
};

export default App;
