import axios from 'axios'

export const REQUEST_NOTIFICATIONS = 'REQUEST_NOTIFICATIONS'
export const REQUEST_NOTIFICATION_ERROR = 'REQUEST_NOTIFICATIONS_ERROR'
export const RECEIVED_NOTIFICATIONS = 'RECEIVED_NOTIFICATIONS'
export const REQUEST_CLEAR_NOTIFICATIONS = 'REQUEST_CLEAR_NOTIFICATIONS'
export const REQUEST_CLEAR_NOTIFICATIONS_ERROR = 'REQUEST_CLEAR_NOTIFICATIONS_ERROR'
export const FULFILLED_CLEAR_NOTIFICATIONS = 'FULFILLED_CLEAR_NOTIFICATIONS'

export const requestNotifications = () => ({
    type: REQUEST_NOTIFICATIONS
})

export const requestNotificationsError = (errorMessage) => ({
    type: REQUEST_NOTIFICATION_ERROR,
    errorMessage: errorMessage
})

export const receivedNotifications = (notifications) => ({
    type: RECEIVED_NOTIFICATIONS,
    notifications: notifications
})

export const requestClearNotifications = () => ({
    type: REQUEST_CLEAR_NOTIFICATIONS
})

export const requestClearNotificationsError = (errorMessage) => ({
    type: REQUEST_CLEAR_NOTIFICATIONS_ERROR
})

export const fulfilledClearNotifications = (ids) => ({
    type: FULFILLED_CLEAR_NOTIFICATIONS,
    ids: ids
})

export const getNotifications = () => {
    return (dispatch) => {
        dispatch(requestNotifications())

        axios.post('/get_notifications').then((response) => {
            let rawNotifications = response.data.notifications
            let notificationsDict = {}
            
            rawNotifications.map(item => {
                item.issueDate = new Date(item.issueDate)
                return item
            }).forEach((element) => {
                notificationsDict[element.id] = element
            })

            dispatch(receivedNotifications(notificationsDict))
        }).catch((error) => {
            dispatch(requestNotificationsError(error.message))
        })
    }
}

export const clearNotifications = (ids) => {
    return (dispatch) => {
        dispatch(requestClearNotifications())

        axios.post('/clear_notifications', {
            ids: ids
        }).then((response) => {
            dispatch(fulfilledClearNotifications(ids))
        }).catch((error) => {
            dispatch(requestClearNotificationsError(error.message))
        })
    }
}