import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/admin/findAll",
        method: "get"
    });
    return resp;
}

async function addAdmin(admin) {
    let resp = await api({
        url: "/admin/save",
        method: "post",
        data: admin
    });
    return resp;
}

async function updateAdmin(admin) {
    let resp = await api({
        url: "/admin/update",
        method: "post",
        data: admin
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/admin/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/admin/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addAdmin, updateAdmin, deleteByIds }