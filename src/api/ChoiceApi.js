import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/choice/findAll",
        method: "get"
    });
    return resp;
}

async function addChoice(choice) {
    let resp = await api({
        url: "/choice/save",
        method: "post",
        data: choice
    });
    return resp;
}

async function updateChoice(choice) {
    let resp = await api({
        url: "/choice/update",
        method: "post",
        data: choice
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/choice/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/choice/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addChoice, updateChoice, deleteByIds }