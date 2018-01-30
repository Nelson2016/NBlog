const updateAdminHotList = (data) => {
    return {
        type: "updateAdminHotList",
        data
    }
};

const updateAdminNewList = (data) => {
    return {
        type: "updateAdminNewList",
        data
    }
};

const updateArticleList = (data) => {
    return {
        type: "updateArticleList",
        data
    }
};

const updateCommentList = (data) => {
    return {
        type: "updateCommentList",
        data
    }
};

const updateCategoryList = (data) => {
    return {
        type: "updateCategoryList",
        data
    }
};

const updateUserList = (data) => {
    return {
        type: "updateUserList",
        data
    }
};

const changeLoginStatus = (data) => {
    return {
        type: "changeLoginStatus",
        data
    }
}

export {
    updateAdminHotList,
    updateAdminNewList,
    updateArticleList,
    updateCommentList,
    updateCategoryList,
    updateUserList,
    changeLoginStatus
};