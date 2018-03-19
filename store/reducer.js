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
            return Object.assign({}, state, {
                articleList: action.data
            });
        case "updateCommentList":
            return Object.assign(state, {
                commentList: action.data
            });
        case "updateCategoryList":
            return Object.assign({}, state, {
                categoryList: action.data
            });
        case "updateUserList":
            return Object.assign({}, state, {
                userList: action.data
            });
        case "changeLoginStatus":
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}

export default reducers;