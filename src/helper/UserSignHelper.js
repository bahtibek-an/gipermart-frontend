import { setCookie } from ".";

export const setTokens = (data) => {
    window.localStorage.setItem("accessToken", data.token.access);
    setCookie("refreshToken", data.token.refresh, 7);
}