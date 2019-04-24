export const getVideos = () => {
    return {
        type: "GET_VIDEOS"
    };
}

export const addVideo = (video) => {
    return {
        type: "ADD_VIDEO",
        payload: video
    };
}