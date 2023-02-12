import $host from "../../../../../http"

export const updateUser = async (userId, first_name, email, phone_number, password) => {
    const { data } = $host.put(`user/api/v1/update-user/${userId}/`, { first_name, email, phone_number, password });
    return data;
}