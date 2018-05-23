import { connect } from 'react-redux'

import Login from '../login'
import { attemptLogin, attemptRegister,
    setAuthToken } from '../actions/user_actions'

const mapStateToProps = state => ({
    loggingIn: state.user.loggingIn,
    loggingInError: state.user.loggingInError,
    loggedIn: state.user.loggedIn,
    registering: state.user.registering,
    registeringError: state.user.registeringError
})

const mapDispatchToProps = dispatch => {
    return {
        attemptLogin: (username, password) => {
            dispatch(attemptLogin(username, password))
        },
        attemptRegister: (username, password) => {
            dispatch(attemptRegister(username, password))
        },
        setAuthToken: (authToken) => {
            dispatch(setAuthToken(authToken))
        }
    }
}

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default LoginContainer