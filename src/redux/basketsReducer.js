import { CREATE_BASKET_TO_LOCAL, DELETE_BASKET_IN_LOCAL, INCREMENT_BASKET_COUNTER, DECREMENT_BASKET_COUNTER } from "./types";


const initialState = JSON.parse(localStorage.getItem("carts")) || [];

export const basketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BASKET_TO_LOCAL:
            localStorage.setItem("carts", JSON.stringify([...state, action.payload]));
            return [...state, action.payload];
        case DELETE_BASKET_IN_LOCAL:
            const filter = state.filter((item) => item.product != action.payload);    
            localStorage.setItem("carts", JSON.stringify(filter));
            return [...filter];
        case INCREMENT_BASKET_COUNTER:
            const newStateIncrement = state.map((item) => item.id == action.payload ? { ...item, quantity: item.quantity + 1 } : item);
            localStorage.setItem("carts", JSON.stringify(newStateIncrement));
            return newStateIncrement;
        case DECREMENT_BASKET_COUNTER:
            const newStateDecrement = state.map((item) => item.id == action.payload ? { ...item, quantity: item.quantity - 1 } : item);
            localStorage.setItem("carts", JSON.stringify(newStateDecrement));
            return newStateDecrement;
        default:
            return state;
    }
}
