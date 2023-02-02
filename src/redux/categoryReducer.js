import { FETCH_CATEGORIES } from "./types";

const initialState = {}


export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return { ...state, categories: action.payload };
        default:
            return state;
    }
}