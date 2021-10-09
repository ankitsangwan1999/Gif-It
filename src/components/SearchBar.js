import React, { useRef } from "react";
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

    return (
        <div className="SearchBar">
            <input
                type="text"
                placeholder="Search"
                ref={inputSearch}
                autoFocus
            />
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
