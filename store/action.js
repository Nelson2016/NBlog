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

export {updateAdminHotList, updateAdminNewList, updateArticleList};