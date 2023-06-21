import jwtDecode from "jwt-decode";
import $host from "."
import { store } from "..";
import { getCookie} from "../helper";
import { createUser, deleteUser, fetchUserBasket, fetchUserWishLists } from "../redux/actions";

export const getUserById = async (id) => {
    try {
        const data  = $host.get(`user/api/v1/profile/${id}/`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const signUp = async (phoneNumber, firstName, lastName, password, confirmPassword) => {
    const { data } = await $host.post("user/signup/", {
        phone_number: phoneNumber,
        first_name: firstName,
        last_name: lastName,
        password,
        confirm_password: confirmPassword
    });
    return data;
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
        const user = await getUserById(userDecoded.user_id);
        localStorage.setItem("accessToken", data.access);
        store.dispatch(createUser(user.data[0]));
        store.dispatch(fetchUserBasket(userDecoded.user_id));
        store.dispatch(fetchUserWishLists(userDecoded.user_id));
    } catch (error) {
        console.log(error)
        store.dispatch(deleteUser());
    } finally {
        // this.setLoading(false);
    }
}
  
