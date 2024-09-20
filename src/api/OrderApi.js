import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/order/findAll",
        method: "get"
    });
    return resp;
}

async function addOrder(order) {
    let resp = await api({
        url: "/order/save",
        method: "post",
        data: order
    });
    return resp;
}

async function updateOrder(order) {
    let resp = await api({
        url: "/order/update",
        method: "post",
        data: order
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/order/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/order/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addOrder, updateOrder, deleteByIds }