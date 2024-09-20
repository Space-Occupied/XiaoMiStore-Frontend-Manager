import api from "@/utils/api";

async function findAll() {
    let resp = await api({
        url: "/orderDetail/findAll",
        method: "get"
    });
    return resp;
}

async function addOrderDetail(orderDetail) {
    let resp = await api({
        url: "/orderDetail/save",
        method: "post",
        data: orderDetail
    });
    return resp;
}

async function updateOrderDetail(orderDetail) {
    let resp = await api({
        url: "/orderDetail/update",
        method: "post",
        data: orderDetail
    });
    return resp;
}

async function deleteByIds(ids) {
    let resp = await api({
        url: "/orderDetail/deleteByIds",
        method: "post",
        data: ids
    });
    return resp;
}

async function findByCondition(params) {
    let resp = await api({
        url: "/orderDetail/findByCondition",
        method: "get",
        params: {
            ...params
        }
    });
    return resp;
}

export { findAll, findByCondition, addOrderDetail, updateOrderDetail, deleteByIds }