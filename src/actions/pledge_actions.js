import axios from 'axios'

export const REQUEST_TAKE_PLEDGE = 'REQUEST_TAKE_PLEDGE'
export const REQUEST_TAKE_PLEDGE_ERROR = 'REQUEST_TAKE_PLEDGE_ERROR'
export const FULFILLED_TAKE_PLEDGE = 'FULFILLED_TAKE_PLEDGE'
export const REQUEST_PLEDGE = 'REQUEST_PLEDGE'
export const REQUEST_PLEDGE_ERROR = 'REQUEST_PLEDGE_ERROR'
export const RECEIVED_PLEDGE = 'RECEIVED_PLEDGE'
export const REQUEST_UPDATE_PLEDGE = 'REQUEST_UPDATE_PLEDGE'
export const REQUEST_UPDATE_PLEDGE_ERROR = 'REQUEST_UPDATE_PLEDGE_ERROR'
export const FULFILLED_UPDATE_PLEDGE = 'FULFILLED_UPDATE_PLEDGE'

export const requestTakePledge = () => ({
    type: REQUEST_TAKE_PLEDGE
})

export const requestTakePledgeError = (errorMessage) => ({
    type: REQUEST_TAKE_PLEDGE_ERROR,
    errorMessage: errorMessage
})

export const fulfilledTakePledge = (name) => ({
    type: FULFILLED_TAKE_PLEDGE,
    name: name
})

export const requestPledge = () => ({
    type: REQUEST_PLEDGE
})

export const requestPledgeError = (errorMessage) => ({
    type: REQUEST_PLEDGE_ERROR,
    errorMessage: errorMessage
})

export const receivedPledge = (name) => ({
    type: RECEIVED_PLEDGE,
    name: name
})

export const requestUpdatePledge = () => ({
    type: REQUEST_UPDATE_PLEDGE
})

export const requestUpdatePledgeError = (errorMessage) => ({
    type: REQUEST_UPDATE_PLEDGE_ERROR,
    errorMessage: errorMessage
})

export const fulfilledUpdatePledge = (name) => ({
    type: FULFILLED_UPDATE_PLEDGE,
    name: name
})

export const takePledge = (username, name) => {
    return (dispatch) => {
        dispatch(requestTakePledge())

        axios.post('/savePledge', {
            params: {
                name: name
            }
        }).then((response) => {
            if (response.data !== 'OK') {
                if (response.data === 'Guest') {
                    dispatch(requestTakePledgeError('You are not currently logged in and cannot take the pledge.'))
                }
                else {
                    dispatch(requestTakePledgeError('You have already taken the pledge! Thanks for your commitment.'))
                }
            }
            else {
                dispatch(fulfilledTakePledge(name))
            }
        }).catch((error) => {
            dispatch(requestTakePledgeError('Error occured taking pledge, please try again.'))
        })
    }
}

export const getPledge = () => {
    return (dispatch) => {
        dispatch(requestPledge())
        
        axios.post('/already_taken_pledge').then((response) => {
            let jsonResponse = response.data
            
            if (response.status === 200 && jsonResponse.name !== null) {
                dispatch(receivedPledge(jsonResponse.name))
                dispatch(fulfilledTakePledge(jsonResponse.name))
            }
        }).catch((error) => {
            dispatch(requestPledgeError(error.message))
        })
    }
}

export const updatePledge = (name) => {
    return (dispatch) => {
        dispatch(requestUpdatePledge())

        axios.post('/updatePledge', { params: {
            name: name
        }}).then((response) => {
            if (response.data === 'OK') {
                dispatch(fulfilledUpdatePledge(name))
            }
            else {
                dispatch(requestUpdatePledgeError("Error updating pledge"))
            }
        }).catch((error) => {
            dispatch(requestUpdatePledgeError(error.message))
        })
    }
}