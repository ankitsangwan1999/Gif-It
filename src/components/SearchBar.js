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
        document.querySelector('#clear-icon').style.visibility = 'hidden';
    };

    
    useEffect(() => {
        const listener = event => {
          if (event.code === "Enter") {
            event.preventDefault();
            document.querySelector('button').click();
          }
        };

        const enableDelete = event => {
            const searchbar = document.querySelector('input');
            if(searchbar.value){
                document.querySelector('#clear-icon').style.visibility = 'visible';
            }
            else{
                document.querySelector('#clear-icon').style.visibility = 'hidden';
            }
            
        };

        document.addEventListener("keydown", listener);
        document.addEventListener("keyup", enableDelete);
        return () => {
          document.removeEventListener("keydown", listener);
          document.removeEventListener("keyup", enableDelete);
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
            <svg id="clear-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24px" viewBox="0 0 24 24" style={{fill: "#000000"}} onClick={clearText}><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path></svg> 
            <button
                type="submit"
                // style={{ marginLeft: "5px" }}
                onClick={(e) => handleSearchClick(e)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30" style={{fill: "#000000"}}><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path></svg>
            </button>
        </div>
    );
};

export default SearchBar;
