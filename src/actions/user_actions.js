import axios from 'axios'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const REQUEST_LOGIN_ERROR = 'REQUEST_LOGIN_ERROR'
export const FULFILLED_LOGIN = 'FULFILLED_LOGIN'
export const REQUEST_REGISTER = 'REQUEST_REGISTER'
export const REQUEST_REGISTER_ERROR = 'REQUEST_REGISTER_ERROR'
export const FULFILLED_REGISTER = 'FULFILLED_REGISTER'
export const LOGOUT = 'LOGOUT'
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'

export const requestLogin = () => ({
    type: REQUEST_LOGIN
})

export const requestLoginError = (errorMessage) => ({
    type: REQUEST_LOGIN_ERROR,
    errorMessage: errorMessage
})

export const fulfilledLogin = (username) => ({
    type: FULFILLED_LOGIN,
    username: username
})

export const requestRegister = () => ({
    type: REQUEST_REGISTER
})

export const requestRegisterError = (errorMessage) => ({
    type: REQUEST_REGISTER_ERROR,
    errorMessage: errorMessage
})

export const fulfilledRegister = (username) => ({
    type: FULFILLED_REGISTER,
    username: username
})

export const logout = () => ({
    type: LOGOUT
})

export const setAuthToken = (authToken) => {
    return (dispatch) => {
        axios.defaults.headers.common['AUTH'] = authToken

        dispatch({
            type: SET_AUTH_TOKEN,
            authToken: authToken
        })
    }
}

export const attemptLogin = (username, password) => {
    return (dispatch) => {
        dispatch(requestLogin())
        axios.post('/auth/get_token', {
            username: username,
            password: password
        }).then((response) => {
            let resBody = response.data
            let success = resBody.success
            let token = resBody.token
            
            if (success === true) {
                dispatch(setAuthToken(token))
                dispatch(fulfilledLogin(username))
            }
            else {
                dispatch(requestLoginError("Username and password don't match"))
            }
        }).catch((response) => {
            dispatch(requestLoginError('Unknown error'))
        })
    }
}

export const attemptRegister = (username, password, email, fname, lname) => {
    return (dispatch) => {
        dispatch(requestRegister())
        axios.post('/addUser', {
            params: {
                username: username,
                password: password,
                email: email,
                fname: fname,
                lname: lname
            }
        }).then((response) => {
            if (response.data === 'Duplicate') {
                dispatch(requestRegisterError('Username already exists'))
            }
            else {
                dispatch(fulfilledRegister(username))
                dispatch(attemptLogin(username, password))
            }
        }).catch((response) => {
            dispatch(requestRegisterError('Unknown error'))
        })
    }
}