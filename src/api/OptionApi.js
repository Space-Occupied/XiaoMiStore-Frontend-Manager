import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/option/findAll",
        method: "get"
    });
    return resp;
}

async function addOption(option) {
    let resp = await api({
        url: "/option/save",
        method: "post",
        data: option
    });
    return resp;
}

async function updateOption(option) {
    let resp = await api({
        url: "/option/update",
        method: "post",
        data: option
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/option/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/option/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addOption, updateOption, deleteByIds }