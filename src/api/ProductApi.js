import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/product/findAll",
        method: "get"
    });
    return resp;
}

async function addProduct(product) {
    let resp = await api({
        url: "/product/save",
        method: "post",
        data: product
    });
    return resp;
}

async function updateProduct(product) {
    let resp = await api({
        url: "/product/update",
        method: "post",
        data: product
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/product/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/product/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addProduct, updateProduct, deleteByIds }