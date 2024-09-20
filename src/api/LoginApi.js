import api from "@/utils/api";

async function login(data) {
    let resp = await api({
        url: "/login",
        method: "post",
        data: data
    });
    return resp;
}

async function getCaptchaImage() {
    let resp = await api({
        url: "/getCaptchaImage",
        method: "post",
    });
    return resp;
}

export { login, getCaptchaImage }