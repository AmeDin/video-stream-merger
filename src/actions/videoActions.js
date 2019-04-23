export const getVideos = () => (dispatch, getState) => {
    return {
        type: "GET_VIDEOS"
    };
}

export const addVideo = (video) => (dispatch, getState) => {
    return {
        type: "ADD_VIDEO",
        payload: video
    };
}