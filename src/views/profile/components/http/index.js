import $host from "../../../../http"

export const deleteUserMapById = async (mapId) => {
    const data = await $host.delete(`/user/map/${mapId}/`);
    return data;
}