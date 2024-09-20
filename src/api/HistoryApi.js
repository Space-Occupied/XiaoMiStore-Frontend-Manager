import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/history/findAll",
        method: "get"
    });
    return resp;
}

async function addHistory(history) {
    let resp = await api({
        url: "/history/save",
        method: "post",
        data: history
    });
    return resp;
}

async function updateHistory(history) {
    let resp = await api({
        url: "/history/update",
        method: "post",
        data: history
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/history/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/history/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addHistory, updateHistory, deleteByIds }