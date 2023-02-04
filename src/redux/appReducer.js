import { HIDE_LOADER, HIDE_RIGHT_MODAL, SHOW_LOADER, SHOW_RIGHT_MODAL } from "./types";

const initialState = {
    isLoading: true,
    rightModal: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, isLoading: true };
        case HIDE_LOADER:
            return { ...state, isLoading: false };
        case SHOW_RIGHT_MODAL:
            return { ...state, rightModal: true };
        case HIDE_RIGHT_MODAL:
            return { ...state, rightModal: false };
        default:
            return state;
    }
}