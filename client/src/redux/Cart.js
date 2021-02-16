import * as ActionTypes from './ActionTypes';

export const Cart = (state = {
    isLoading: false,
    errMess: null,
    cart: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            let product = action.payload;
            return {...state, isLoading: false, errMess: null, cart: state.cart.concat(product)};

        case ActionTypes.CHANGE_QUANTITY_CART:
            state.cart.filter((productTemp) => productTemp.id === action.payload.id)[0].quantity = action.payload.quantity;
            return {...state, isLoading: false, errMess: null, cart: state.cart};

        case ActionTypes.DELETE_FROM_CART:
            state.cart = state.cart.filter((productTemp => productTemp.id !== action.payload));
            return {...state, isLoading: false, errMess: null, cart: state.cart};

        case ActionTypes.FAILED_CART:
            return {...state, isLoading: false, errMess: action.payload};

        default: return state
    }
}