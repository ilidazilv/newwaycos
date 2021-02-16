import * as ActionTypes from './ActionTypes';

export const Blogs = (state = {
    isLoading: true,
    errMess: null,
    blogs: []
}, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_BLOGS:
            return {...state, isLoading: false, errMess: null, blogs: action.payload}

        case ActionTypes.FAILED_BLOGS:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.LOADING_BLOGS:
            return {...state, isLoading: true}

        default: return state
    }
}