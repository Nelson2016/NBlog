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

export {updateAdminHotList, updateAdminNewList};