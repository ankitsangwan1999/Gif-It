import axios from "axios";
import download from "downloadjs";
import { toast } from "react-toastify";
toast.configure();

let ROOT_URL = process.env.REACT_APP_BACKEND_ORIGIN_DEV;
if (process.env.NODE_ENV === "production") {
    ROOT_URL = process.env.REACT_APP_BACKEND_ORIGIN_PROD;
}

/**
 *
 * @param {*} params i.e. { watchUrl, seekingTime, duration }
 * @param {*} callback
 */
// const makeGif = (params, callback) => {
//     axios
//         .get(ROOT_URL + "/gifit", { params: params, responseType: "blob" })
//         .then((response) => {
//             download(response.data, "gif-it.gif", "image/gif");
//             callback();
//         })
//         .catch(function (error) {
//             alert("There was an error. Try Again.");
//             console.error("LOG: Error:", error);
//             callback();
//         });
// };

// write success or failure message to localstorage and read it in the component
// success object contains urls of video successfully converted to gif
// failure object contains urls of video that failed to convert to gif
const writeToLocalStorage = (success, url) => {
    const successObj = JSON.parse(localStorage.getItem("success"));
    const failureObj = JSON.parse(localStorage.getItem("failure"));
    if (success) {
        localStorage.setItem(
            "success",
            JSON.stringify({ ...successObj, url })
        );
    } else {
        localStorage.setItem(
            "failure",
            JSON.stringify({ ...failureObj, url })
        );
    }
};


const downloadGif = (params = {}, url, callback) => {
    const setMessages = params.setMessages;
    axios
        .get(ROOT_URL + "/download", {
            params: params,
            responseType: "blob",
            onDownloadProgress: (progressEvent) => {
                setMessages((prevState) => [
                    `Downloading: ${Math.floor(
                        (progressEvent.loaded / progressEvent.total) * 100
                    )}%`,
                ]);

                // Logging % downloaded
                console.log(
                    `LOG: Downloading: ${
                        (progressEvent.loaded / progressEvent.total) * 100
                    }%`
                );
            },
        })
        .then((response) => {
            download(response.data, "gif-it.gif", "image/gif");
            writeToLocalStorage(true, url);
            callback();
        })
        .catch(function (error) {
            toast.error(() => (
                <div>There was an error downloading the Gif. Try Again.</div>
            ));
            console.error("LOG: Error in Downloading:", error);
            writeToLocalStorage(false, url);
            callback();
        });
};

export default downloadGif;
