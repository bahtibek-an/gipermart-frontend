import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { categoryReducer } from "./categoryReducer";
import { productsReducer } from "./productsReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    products: productsReducer,
    categories: categoryReducer,
    app: appReducer,
    user: userReducer
});