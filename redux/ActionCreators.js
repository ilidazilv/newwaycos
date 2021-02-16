import * as ActionTypes from './ActionTypes';
import {baseUrl} from "../shared/baseURL";
import fetch from "cross-fetch";

export const fetchGoods = () => (dispatch) => {
    dispatch(goodsLoading(true));

    return fetch(baseUrl + 'server/goods')
        .then(response => {
            if(response.ok){
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
            throw new Error(error.message);
            })
        .then(response => response.json())
        .then(goods => dispatch(addGoods(goods)))
        .catch(error => {
            dispatch(goodsFailed(error.message));
        });
}

export const goodsLoading = () => ({
    type: ActionTypes.LOAD_GOODS
});

export const goodsFailed = (errmess) => ({
    type: ActionTypes.FAILED_GOODS,
    payload: errmess
});

export const addGoods = (goods) => ({
    type: ActionTypes.ADD_GOODS,
    payload: goods
});

export const addToCartFunc =  (id, quantity) => (dispatch) => {
    const newProdInCart = {
        id: id,
        quantity: quantity
    }

    dispatch(addToCart(newProdInCart));
    dispatch(handlePopup({type: 1}))
};

export const changeQuantityCart = (id, quantity) => (dispatch) => {
    return dispatch({
        type: ActionTypes.CHANGE_QUANTITY_CART,
        payload: {
            id: id,
            quantity: quantity
        }})
};

export const deleteFromCart = (id) => (dispatch) => {
    return dispatch({
        type: ActionTypes.DELETE_FROM_CART,
        payload: id
})};

export const addToCart = (cart) => {
    return{
        type: ActionTypes.ADD_TO_CART,
        payload: cart
    }
}
export const cartFailed = (errmess) => ({
    type: ActionTypes.FAILED_CART,
    payload: errmess
});

export const login = (login, password) => (dispatch) => {
    const login_data = {
        login: login,
        password: password
    };
    return fetch(baseUrl + 'server/login', {
        method: "POST",
        body: JSON.stringify(login_data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(data => dispatch(loginSuccess(data)))
        .catch(error => dispatch(loginFailed(error.message)));
};
export const loginSuccess = (data) => ({
    type: ActionTypes.LOGIN,
    payload: data
});

export const loginFailed = (errmess) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: errmess
});

export const fetchSession = () => dispatch => {
    return fetch(baseUrl + 'server/sessionCheck')
        .then(response => {
                if(response.ok){
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(data => dispatch(sessionLoad(data)))
        .catch(error => {
            dispatch(goodsFailed(error.message));
        });
}

export const sessionLoad = (data) =>({
    type: ActionTypes.SESSION_LOAD,
    payload: data,
})

export const sessionFailed = (err) => ({
    type: ActionTypes.SESSION_FAILED,
    payload: err
})

export const postOrder = (orderData) => dispatch => {
    let order_data = {
        name: orderData.name,
        surname: orderData.surname,
        tel: orderData.tel,
        email: orderData.email,
        delivery: {
            type: orderData.delivery.type,
            inputNPState: orderData.delivery.inputNPState,
            inputNP2State: orderData.delivery.inputNP2State
        },
        payment: orderData.payment,
        products: {}
    };
    orderData.products.forEach((item, i) => {
        order_data.products[parseInt(i, 2)] = item;
    })
    return fetch(baseUrl + 'server/postOrder', {
        method: "POST",
        body: JSON.stringify(order_data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(data => dispatch(addOrder(data)))
        .catch(error => dispatch(failedOrder(error.message)));
}

export const addOrder = (data) => ({
    type: ActionTypes.ADD_ORDER,
    payload: data
})
export const failedOrder = (err) => ({
    type: ActionTypes.FAILED_ORDER,
    payload: err
})

export const handlePopup = (data) => {
    if(data.type === 1){
        return{
            type: ActionTypes.ADD_POPUP,
            payload: true
        }
    } else {
        return {
            type: ActionTypes.DELETE_POPUP,
            payload: false
        }
    }
}

export const sendEmail = (name, email, text) => dispatch => {
    let emailBody = {
        name: name,
        email: email,
        text: text
    }
    return fetch(baseUrl + 'server/email', {
        method: "POST",
        body: JSON.stringify(emailBody),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(data => dispatch(emailSuccess(data)))
        .catch(error => dispatch(emailFailed(error.message)));
}

export const emailSuccess = (data) => ({
    type: ActionTypes.SEND_EMAIL,
    payload: data
})

export const emailFailed = (err) => ({
    type: ActionTypes.EMAIL_FAILED,
    payload: err
})


export const fetchBlogs = () => (dispatch) => {
    dispatch(loadingBlogs());

    return fetch(baseUrl + 'server/blogs')
        .then(response => {
                if(response.ok){
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(blogs => dispatch(loadBlogs(blogs)))
        .catch(error => {
            dispatch(blogsFailed(error.message));
        });
}

export const loadBlogs = (data) => ({
    type: ActionTypes.LOAD_BLOGS,
    payload: data
});

export const blogsFailed = (errmess) => ({
    type: ActionTypes.FAILED_BLOGS,
    payload: errmess
});

export const loadingBlogs = () => ({
    type: ActionTypes.LOADING_BLOGS
})
