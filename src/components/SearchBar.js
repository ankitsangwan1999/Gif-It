import React, { useRef, useEffect } from "react";
import YTSearch from "youtube-api-search";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/SearchBar.css";

toast.configure();

const SearchBar = ({ setVideosList }) => {
    const inputSearch = useRef(undefined);
    const handleSearchClick = (e) => {
        const inputStr = inputSearch.current.value.trim();
        if (inputStr === "") {
            toast.info("Type Something...", {
                position: toast.POSITION.TOP_RIGHT,
            });
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
                    setVideosList([]);
                    setVideosList(videos);
                }
            );
        }
    };

    useEffect(() => {
        const listener = (event) => {
            /**
             * Check if Input is focussed and Enter is Clicked
             */
            if (
                event.code === "Enter" &&
                inputSearch.current === document.activeElement
            ) {
                event.preventDefault();
                document.querySelector("button").click();
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
                id="search"
                type="text"
                placeholder="Search"
                ref={inputSearch}
                autoFocus
            />
            <button type="submit" onClick={(e) => handleSearchClick(e)}>
                <svg
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 30 30"
                    style={{ fill: "#000000" }}
                >
                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;
