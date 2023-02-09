import { CREATE_USER, DELETE_USER, CREATE_CHECKOUT_IN_USER } from "./types";


const initialState = {isAuth: false};


export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_USER:
            return {...state, user: action.payload, isAuth: true};
        case DELETE_USER:
            return { isAuth: false };
        case CREATE_CHECKOUT_IN_USER:
            return {...state, user: {...state.user, checkout: [...state.user.checkout, action.payload]}};
        default:
            return state;
    }
}
