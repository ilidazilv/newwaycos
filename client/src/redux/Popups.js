import * as ActionTypes from './ActionTypes';

export const Popups = (state = {
    isLoading: true,
    errMess: null,
    popups: {
        addToCart: false
    }
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_POPUP:
            state.popups['addToCart'] = action.payload;
            return {...state, errMess: null, popups: state.popups};

        case ActionTypes.DELETE_POPUP:
            state.popups['addToCart'] = action.payload;
            return {...state, errMess: null, popups: state.popups}

        default: return state
    }
}