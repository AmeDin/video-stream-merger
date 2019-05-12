const initState = {
    configs: [
        // {iid: 1, id: 'out1', x: 0, y: 0, sizeMultiplier: 2, float:'floatleft'},
        // {iid: 2, id: 'out2', x: -400, y: 0, sizeMultiplier: 2, float:'floatright'},
        {id: 'outMid', x: 0, y: 0, sizeMultiplier: 1, float:'floatleft'},
        // {iid: 3, id: 'out3', x: 0, y: -304, sizeMultiplier: 2, float:'floatleft'},
        // {iid: 4, id: 'out4', x: -400, y: -304, sizeMultiplier: 2, float:'floatright'},
    ]
  }
  
const configReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CONFIG_LOADED':
      return { ...state };
    case 'CONFIG_LOADING':
      return state;
    case 'CONFIG_DELETE':
      console.log("hi")
      let newConfig = state.configs.filter(config => {
        return action.payload !== config.iid
      });
      return {
        ...state,
        configs: newConfig
      }
      // return {
      //     ...state,
      //     configs: state.configs.filter(config => config.id !== action.payload)
      // };
    default:
      return state;
  }
};

export default configReducer;