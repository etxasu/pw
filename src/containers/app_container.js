import { connect } from 'react-redux'

import { logout } from '../actions/user_actions'
import App from '../app'

const mapStateToProps = state => ({
    username: state.user.username,
    loggedIn: state.user.loggedIn
})

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {dispatch(logout())}
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer