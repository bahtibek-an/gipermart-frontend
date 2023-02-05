import $host from "../../../http";


export const signIn = async (number, password) => {
    const {data} = await $host.post("user/login/", {
        phone_number: number,
        code: password
    });
    return data;
}