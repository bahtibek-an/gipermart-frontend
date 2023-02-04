import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { basketReducer } from "./basketReducer";
import { categoryReducer } from "./categoryReducer";
import { productsReducer } from "./productsReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    products: productsReducer,
    categories: categoryReducer,
    app: appReducer,
    user: userReducer,
    basket: basketReducer
});