const sendEvent = (res, data) => {
    if (res.writableEnded) {
        console.log("LOG: Couldn't Write: ", data.message);
    } else {
        console.log("LOG: Writing: ", data.message);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
};

export default sendEvent;
