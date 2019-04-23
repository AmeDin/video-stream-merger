export const loadConfig = () => (dispatch, getState) => {
    // Config loading
    return {
        type: "CONFIG_LOADED"
    };
}

export const deleteConfig = (id) => {
    return {
        type: "CONFIG_DELETE",
        payload: id
    };
}