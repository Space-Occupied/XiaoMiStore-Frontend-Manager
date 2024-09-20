import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/favorite/findAll",
        method: "get"
    });
    return resp;
}

async function addFavorite(favorite) {
    let resp = await api({
        url: "/favorite/save",
        method: "post",
        data: favorite
    });
    return resp;
}

async function updateFavorite(favorite) {
    let resp = await api({
        url: "/favorite/update",
        method: "post",
        data: favorite
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/favorite/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/favorite/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addFavorite, updateFavorite, deleteByIds }