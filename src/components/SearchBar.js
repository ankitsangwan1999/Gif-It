import React, { useRef, useEffect } from "react";
import YTSearch from "youtube-api-search";

import "../styles/SearchBar.css";

// TODO: ISSUE: Style this Search Bar exactly like the Youtube-Search
// TODO: ISSUE: Make the Input Field Auto-Focus on visiting the Website.
const SearchBar = ({ setVideosList }) => {
    const inputSearch = useRef(undefined);
    const handleSearchClick = (e) => {
        const inputStr = inputSearch.current.value.trim();
        if (inputStr === "") {
            alert("Empty Search");
        } else {
            YTSearch(
                {
                    key: process.env.REACT_APP_YT_API_KEY,
                    term: inputStr,
                    order: "viewCount",
                    part: "contentDetails",
                    maxResults: process.env.REACT_APP_YT_MAX_VIDEOS_COUNT,
                },
                (videos) => {
                    setVideosList(videos);
                }
            );
        }
    };

    const clearText = () => {
        document.querySelector('#search').value = '';
    };

    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter") {
            event.preventDefault();
            document.querySelector('button').click();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, []);

    return (
        <div className="SearchBar">
            <input
                type="text"
                id="search"
                placeholder="Search"
                ref={inputSearch}
                autoFocus
            />
            <span id="cross">
                <img src="https://img.icons8.com/material-rounded/24/000000/delete-sign.png" onClick={clearText}/>
            </span>
            <button
                type="submit"
                // style={{ marginLeft: "5px" }}
                onClick={(e) => handleSearchClick(e)}
            >
                <img src="https://img.icons8.com/ios-glyphs/50/000000/search.png" height="40%" width="40%"/>
            </button>
        </div>
    );
};

export default SearchBar;
