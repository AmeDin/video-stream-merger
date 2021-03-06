const initState = {
    videos: []
  }
  
const videoReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SYNC_VIDEO':
    case 'SYNC_IT':
    case 'GET_VIDEOS':
      return { ...state };
    case 'ADD_VIDEO':
        return {
          ...state,
          videos: [action.payload, ...state.videos]
    }
    default:
      return state;
  }
};

export default videoReducer;