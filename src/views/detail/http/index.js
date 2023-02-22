import $host from "../../../http"

export const createRatingProduct = async ( ratingData ) => {
    const { data } = await $host.post("product/ratings/", ratingData);
    return data;
}