let reducers = (state, action) => {
    switch (action.type) {
        case "updateAdminHotList":
            var newState = {
                adminHotList: action.data
            };
            return Object.assign(state, newState);
            break;
        case "updateAdminNewList":
            var newState = {
                adminNewList: action.data
            };
            return Object.assign(state, newState);
            break;
        default :
            return state;
    }
}

export default reducers;