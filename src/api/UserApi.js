import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/user/findAll",
        method: "get"
    });
    return resp;
}

async function addUser(user) {
    let resp = await api({
        url: "/user/save",
        method: "post",
        data: user
    });
    return resp;
}

async function updateUser(user) {
    let resp = await api({
        url: "/user/update",
        method: "post",
        data: user
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/user/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/user/findByConditionBySearchBean",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addUser, updateUser, deleteByIds }