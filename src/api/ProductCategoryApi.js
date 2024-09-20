import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/productCategory/findAll",
        method: "get"
    });
    return resp;
}

async function addProductCategory(productCategory) {
    let resp = await api({
        url: "/productCategory/save",
        method: "post",
        data: productCategory
    });
    return resp;
}

async function updateProductCategory(productCategory) {
    let resp = await api({
        url: "/productCategory/update",
        method: "post",
        data: productCategory
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/productCategory/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/productCategory/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addProductCategory, updateProductCategory, deleteByIds }