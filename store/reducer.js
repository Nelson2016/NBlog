let reducers = (state, action) => {
    switch (action.type) {
        case "updateAdminHotList":
            return Object.assign(state, {
                adminHotList: action.data
            });
        case "updateAdminNewList":
            return Object.assign(state, {
                adminNewList: action.data
            });
        case "updateArticleList":
            return Object.assign(state, {
                articleList: action.data
            });
        default :
            return state;
    }
}

export default reducers;