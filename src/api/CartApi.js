import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/cart/findAll",
        method: "get"
    });
    return resp;
}

async function addCart(cart) {
    let resp = await api({
        url: "/cart/save",
        method: "post",
        data: cart
    });
    return resp;
}

async function updateCart(cart) {
    let resp = await api({
        url: "/cart/update",
        method: "post",
        data: cart
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/cart/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/cart/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addCart, updateCart, deleteByIds }