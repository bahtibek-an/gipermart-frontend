import $host from "../../../../../http"

export const updateUser = async (userId, first_name, last_name, email, phone_number, password) => {
    const { data } = await $host.put(`user/api/v1/update-user/${userId}/`, { first_name, email, phone_number, password, last_name });
    return data;
}

export const updateUserMap = async ({ mapId, title, phone_number, address, town, user }) => {
    const { data } = await $host.put(`user/map/${mapId}/`, {
        title, phone_number, address, town, user
    });
    return data
}