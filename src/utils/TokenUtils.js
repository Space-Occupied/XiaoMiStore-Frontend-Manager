function getToken() {
    return localStorage.getItem("token");
}

function setToken(token) {
    localStorage.setItem("token", token);
    return true;
}

function removeToken() {
    localStorage.removeItem("token");
    return true;
}

export { getToken, setToken, removeToken }