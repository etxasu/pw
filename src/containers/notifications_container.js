import { connect } from 'react-redux'

import NotificationsScreen from '../notifications/notifications_screen'
import { getNotifications,
    clearNotifications } from '../actions/notification_actions'

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn,
    username: state.user.username,
    notifications: state.notification.notifications,
    requestingNotifications: state.notification.requestingNotifications,
    requestingNotificationsError: state.notification.requestingNotificationsError,
    clearingNotifications: state.notification.clearingNotifications,
    clearingNotificationsError: state.notification.clearingNotificationsError
})

const mapDispatchToProps = (dispatch) => {
    return {
        getNotifications: () => (dispatch(getNotifications())),
        clearNotifications: (ids) => (dispatch(clearNotifications(ids)))
    }
}

const NotificationsScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationsScreen)

export default NotificationsScreenContainer
