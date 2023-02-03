import jwtDecode from "jwt-decode";
import $host from "."
import { store } from "..";
import { getCookie, setCookie } from "../helper";
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
        const data  = await $host.post("user/signup/", {
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

export const signIn = async (number, password) => {
    const {data} = await $host.post("user/login/", {
        phone_number: number,
        code: password
    });
    return data; 
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
  
export const logout = () => {
    localStorage.removeItem("accessToken");
    setCookie("refreshToken", "", 0);
    store.dispatch(deleteUser());
}

