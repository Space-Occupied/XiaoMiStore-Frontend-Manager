import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/comment/findAll",
        method: "get"
    });
    return resp;
}

async function addComment(comment) {
    let resp = await api({
        url: "/comment/save",
        method: "post",
        data: comment
    });
    return resp;
}

async function updateComment(comment) {
    let resp = await api({
        url: "/comment/update",
        method: "post",
        data: comment
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/comment/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/comment/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addComment, updateComment, deleteByIds }