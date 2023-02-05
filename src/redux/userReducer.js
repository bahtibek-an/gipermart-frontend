import { CREATE_USER, DELETE_USER } from "./types";


const initialState = {isAuth: false};


export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_USER:
            return {...state, user: action.payload, isAuth: true};
        case DELETE_USER:
            return { isAuth: false };
        default:
            return state;
    }
}
