import { DELETE_WISHLIST, FETCH_USER_WISHLISTS } from "./types";

const initialState = [];

export function wishListsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_USER_WISHLISTS:
            return [...action.payload];
        case DELETE_WISHLIST:
            return [...state.filter((item) => item?.product?.id !== action.payload)]
        default:
            return state;
    }
}