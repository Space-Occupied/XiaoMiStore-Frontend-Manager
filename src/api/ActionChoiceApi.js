import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/actionChoice/findAll",
        method: "get"
    });
    return resp;
}

async function addActionChoice(actionChoice) {
    let resp = await api({
        url: "/actionChoice/save",
        method: "post",
        data: actionChoice
    });
    return resp;
}

async function updateActionChoice(actionChoice) {
    let resp = await api({
        url: "/actionChoice/update",
        method: "post",
        data: actionChoice
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/actionChoice/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/actionChoice/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addActionChoice, updateActionChoice, deleteByIds }