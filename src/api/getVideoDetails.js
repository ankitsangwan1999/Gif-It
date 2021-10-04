import axios from "axios";

let ROOT_URL = "https://www.googleapis.com/youtube/v3/videos";
// www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key={YOUR_API_KEY}

/**
 *
 * @param {*} options i.e. { Api_key, id_of_the_video }
 * @param {*} callback
 */
const getVideoDetails = (options, callback) => {
    if (!options.key) {
        throw new Error(
            "LOG: Error: Youtube Search expected key, received undefined"
        );
    }

    let params = {
        part: "contentDetails",
        key: options.key, // Youtube-data Api Key
        id: options.id, // id of the Youtube Video
    };

    axios
        .get(ROOT_URL, { params: params })
        .then((response) => {
            if (callback) {
                callback(response.data.items[0]);
            }
        })
        .catch(function (error) {
            console.error(error);
        });
};

export default getVideoDetails;
