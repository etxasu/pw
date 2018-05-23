import { REQUEST_LOGIN, REQUEST_LOGIN_ERROR,
    FULFILLED_LOGIN, REQUEST_REGISTER,
    REQUEST_REGISTER_ERROR, FULFILLED_REGISTER,
    LOGOUT, SET_AUTH_TOKEN } from '../actions/user_actions'

export default function reducer(state={
    username: null,
    loggingIn: false,
    loggingInError: null,
    loggedIn: false,
    registering: false,
    registeringError: null,
    authToken: null
}, action) {
    
    switch (action.type) {
        
    case REQUEST_LOGIN: {
        return {...state, loggingIn: true, loggedIn: false, loggingInError: null, registering: false,
            registeringError: null}
    }
    case REQUEST_LOGIN_ERROR: {
        return {...state, loggingIn: false, loggedIn: false, loggingInError: action.errorMessage}
    }
    case FULFILLED_LOGIN: {
        return {...state, loggedIn: true, loggingInError: null, loggingIn: false, username: action.username}
    }
    case REQUEST_REGISTER: {
        return {...state, registering: true, registeringError: null, loggingInError: null, loggingIn: false,
            loggedIn: false}
    }
    case REQUEST_REGISTER_ERROR: {
        return {...state, registering: false, registeringError: action.errorMessage}
    }
    case FULFILLED_REGISTER: {
        return {...state, registering: false, registeringError: null, username: action.username,
            loggedIn: true}
    }
    case LOGOUT: {
        return {...state, username: null, loggedIn: false}
    }
    case SET_AUTH_TOKEN: {
        return {...state, authToken: action.authToken}
    }
    }

    return {...state}
}