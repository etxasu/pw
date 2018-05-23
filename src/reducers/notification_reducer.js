import { REQUEST_NOTIFICATIONS, REQUEST_NOTIFICATION_ERROR,
    RECEIVED_NOTIFICATIONS, REQUEST_CLEAR_NOTIFICATIONS,
    REQUEST_CLEAR_NOTIFICATIONS_ERROR,
    FULFILLED_CLEAR_NOTIFICATIONS } from '../actions/notification_actions'

export default function reducer(state={
    notifications: {},
    requestingNotifications: false,
    requestingNotificationsError: null,
    clearingNotifications: false,
    clearingNotificationsError: null
}, action) {

    switch (action.type) {
    case REQUEST_NOTIFICATIONS: {
        return {...state, requestingNotifications: true, requestingNotificationsError: null}
    }
    case REQUEST_NOTIFICATION_ERROR: {
        return {...state, requestingNotifications: false, requestingNotificationsError: action.errorMessage}
    }
    case RECEIVED_NOTIFICATIONS: {
        return {...state, notifications: action.notifications, requestingNotifications: false}
    }
    case REQUEST_CLEAR_NOTIFICATIONS: {
        return {...state, clearingNotifications: true, clearingNotificationsError: null}
    }
    case REQUEST_CLEAR_NOTIFICATIONS_ERROR: {
        return {...state, clearingNotifications: false, clearingNotificationsError: action.errorMessage}
    }
    case FULFILLED_CLEAR_NOTIFICATIONS: {
        let notifications = {...state.notifications}
        for (let i in action.ids) {
            delete notifications[action.ids[i]]
        }
        return {...state, clearingNotifications: false, notifications: notifications}
    }
    }

    return {...state}
}