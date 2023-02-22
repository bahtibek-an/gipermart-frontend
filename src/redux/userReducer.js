import { 
    CREATE_USER, 
    DELETE_USER, 
    CREATE_CHECKOUT_IN_USER, 
    CREATE_MAP_USER, 
    DELETE_MAP_USER, 
    UPDATE_DEFAULT_MAP_USER, 
    UPDATE_MAP_USER
} from "./types";

const defaultMap = window.localStorage.getItem("defaultMap") || -1;
const initialState = {isAuth: false, defaultMap};

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_USER:
            return {...state, user: action.payload, isAuth: true};
        case DELETE_USER:
            return { isAuth: false };
        case CREATE_CHECKOUT_IN_USER:
            return {...state, user: {...state.user, checkout: [...state.user.checkout, action.payload]}};
        case CREATE_MAP_USER:
            return { ...state, user: { ...state.user, map: [ ...state.user.map, action.payload ] } };
        case DELETE_MAP_USER:
            return { ...state, user: { ...state.user, map: state.user.map.filter((item) => item.id != action.payload) } };
        case UPDATE_DEFAULT_MAP_USER:
            window.localStorage.setItem("defaultMap", action.payload);
            return { ...state, defaultMap: action.payload }
        case UPDATE_MAP_USER:
            return { ...state, user: { ...state.user, map: [ ...state.user.map.map((item) => item.id == action.payload.id ? action.payload : item )] } };
        default:
            return state;
    }
}
