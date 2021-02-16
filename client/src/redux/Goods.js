import * as ActionTypes from './ActionTypes';

export const Goods = (state = {
    isLoading: true,
    errMess: null,
    goods: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_GOODS:
            return {...state, isLoading: false, errMess: null, goods: action.payload};

        case ActionTypes.LOAD_GOODS:
            return {...state, isLoading: true, errMess: null, goods: []}

        case ActionTypes.FAILED_GOODS:
            return {...state, isLoading: false, errMess: action.payload};

        default: return state
    }
}