import { CREATE_BASKET_TO_LOCAL, DELETE_BASKET_IN_LOCAL } from "./types";


const initialState = JSON.parse(localStorage.getItem("carts") || []);

export const basketsReducer = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_BASKET_TO_LOCAL:
            localStorage.setItem("carts", JSON.stringify([...state, action.payload]));
            return [...state, action.payload];  
        case DELETE_BASKET_IN_LOCAL:
            const filter = state.filter((item) => item.product?.id != action.payload);    
            localStorage.setItem("carts", JSON.stringify([...filter])); 
            return [...filter];
        default:
            return state;
    }
}
