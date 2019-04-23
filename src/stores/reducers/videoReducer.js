const initState = {
    videos: [{id:1, videoStreamMerger:null}]
  }
  
const videoReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_VIDEOS':
      return { ...state };
    case 'ADD_VIDEO':
        return {
            videos: [{id:1, videoStreamMerger:null},{id:2, videoStreamMerger:null}]
    }
    default:
      return state;
  }
};

export default videoReducer;