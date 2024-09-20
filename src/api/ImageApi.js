import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/image/findAll",
        method: "get"
    });
    return resp;
}

async function addImage(image) {
    let resp = await api({
        url: "/image/save",
        method: "post",
        data: image
    });
    return resp;
}

async function updateImage(image) {
    let resp = await api({
        url: "/image/update",
        method: "post",
        data: image
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/image/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/image/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addImage, updateImage, deleteByIds }