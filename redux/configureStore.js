import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import {Goods} from './Goods';
import {Cart} from './Cart';
import {Login} from "./Login";
import {Popups} from "./Popups";
import {Blogs} from "./Blogs";

export const ConfigureStore = () => {
    return createStore(combineReducers({
        goods: Goods,
        cart: Cart,
        session: Login,
        popups: Popups,
        blogs: Blogs
    }), applyMiddleware(thunk, logger));
}