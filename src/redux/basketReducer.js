import {
    CREATE_BASKET_PRODUCT,
    DECREMENT_BASKET_COUNTER,
    DELETE_BASKET_PRODUCT,
    FETCH_BASKET_PRODUCTS,
    INCREMENT_BASKET_COUNTER
} from "./types";

const initialState = [];

export const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BASKET_PRODUCTS:
            return [...action.payload];
        case DELETE_BASKET_PRODUCT:
            return state.map((item) => {
                if(item.id === action.payload) {
                    item.cart_status = true;
                    return item;
                }
                return item;
            });
        case CREATE_BASKET_PRODUCT:
            return [...state, action.payload];
        case DECREMENT_BASKET_COUNTER:
            return [...state.map(item => {
                if(item.id === action.payload) {
                    item.quantity = item.quantity - 1;
                    return item;
                }
                return item;
            })];
        case INCREMENT_BASKET_COUNTER:
            return [...state.map(item => {
                if(item.id === action.payload) {
                    item.quantity = item.quantity + 1;
                    return item;
                }
                return item;
            })];
        default:
            return state;
    }
}