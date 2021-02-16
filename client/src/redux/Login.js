import * as ActionTypes from './ActionTypes';

export const Login = (state = {
    isLoading: false,
    errMess: null,
    session: {
        notSet: true
    }
}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            let response;
            if(action.payload["result"] === "success"){
                response = action.payload['id'];
            } else {
                response = {
                    error: true
                }
            }
            return {...state, isLoading: false, errMess: null, session: response};



        case ActionTypes.LOGIN_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.SESSION_LOAD:
            return {...state, isLoading: false, errMess: null, session: action.payload}

        case ActionTypes.SESSION_FAILED:
            return {...state, isLoading: false, errMess: action.payload}

        default: return state
    }
}