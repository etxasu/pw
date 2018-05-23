import { connect } from 'react-redux'

import Register from '../register'
import { attemptRegister } from '../actions/user_actions'

const mapStateToProps = state => ({
    registering: state.user.registering,
    registeringError: state.user.registeringError
})

const mapDispatchToProps = dispatch => {
    return {
        attemptRegister: (username, password, email, fname,lname) => {
            dispatch(attemptRegister(username, password, email, fname, lname))
        }
    }
}

const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)

export default RegisterContainer