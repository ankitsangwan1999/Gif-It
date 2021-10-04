import axios from "axios";
import download from "downloadjs";

// TODO: ISSUE: Make this var available from .env file as REACT_APP_BACKEND_ORIGIN

let ROOT_URL = "http://localhost:5000";
if (process.env.NODE_ENV === "production") {
    ROOT_URL = "https://gif-it-now.herokuapp.com";
}

/**
 *
 * @param {*} params i.e. { watchUrl, seekingTime, duration }
 * @param {*} callback
 */
const getGif = (params, callback) => {
    axios
        .get(ROOT_URL + "/gifit", { params: params, responseType: "blob" })
        .then((response) => {
            download(response.data, "gif-it.gif", "image/gif");
            callback();
        })
        .catch(function (error) {
            console.error("LOG: Error:", error);
        });
};

export default getGif;
