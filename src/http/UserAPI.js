import jwtDecode from "jwt-decode";
import $host, { getCookie } from "."
import { store } from "..";
import { createUser, deleteUser } from "../redux/actions";

export const getUserById = async (id) => {
    try {
        const { data } = $host.get(`user/api/v1/profile/${id}`, { withCredentials: true });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const signUp = async (phoneNumber, firstName, lastName, password, confirmPassword) => {
    try {
        const { data } = await $host.post("user/signup/", {
            phone_number: phoneNumber,
            first_name: firstName,
            last_name: lastName,
            password,
            confirm_password: confirmPassword
        });
        
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const checkAuth = async () => {
    try {
        const refreshToken = getCookie("refreshToken");
        const {data} = await $host.post("user/api/v1/token/refresh/", {refresh: refreshToken});
        const userDecoded = jwtDecode(data.access); 
        localStorage.setItem("accessToken", data.access);
        store.dispatch(createUser(userDecoded.user_id));
    } catch (error) {
        store.dispatch(deleteUser());
    } finally {
        // this.setLoading(false);
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
export const logout = () => {
    localStorage.removeItem("accessToken");
    setCookie("refreshToken", "", 0);
    store.dispatch(deleteUser());
}