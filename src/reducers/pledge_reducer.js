import { REQUEST_TAKE_PLEDGE, REQUEST_TAKE_PLEDGE_ERROR,
    FULFILLED_TAKE_PLEDGE, REQUEST_PLEDGE,
    REQUEST_PLEDGE_ERROR, RECEIVED_PLEDGE,
    REQUEST_UPDATE_PLEDGE,
    REQUEST_UPDATE_PLEDGE_ERROR,
    FULFILLED_UPDATE_PLEDGE } from '../actions/pledge_actions'

export default function reducer(state={
    name: null,
    requestingTakePledge: false,
    requestingTakePledgeError: null,
    fulfilledTakePledge: false,
    requestingPledge: false,
    requestingPledgeError: null,
    receivedPledge: false,
    updatingPledge: true,
    updatingPledgeError: null
}, action) {

    switch (action.type) {
    
    case REQUEST_TAKE_PLEDGE: {
        return {...state, requestingTakePledge: true, requestingTakePledgeError: null, fulfilledTakePledge: false,
            requestingPledgeError: null}
    }
    case REQUEST_TAKE_PLEDGE_ERROR: {
        return {...state, requestingTakePledge: false, requestingTakePledgeError: action.errorMessage}
    }
    case FULFILLED_TAKE_PLEDGE: {
        return {...state, requestingTakePledge: false, fulfilledTakePledge: true, name: action.name}
    }
    case REQUEST_PLEDGE: {
        return {...state, requestingPledge: true, requestingPledgeError: null, receivedPledge: false}
    }
    case REQUEST_PLEDGE_ERROR: {
        return {...state, requestingPledge: false, requestingPledgeError: action.errorMessage}
    }
    case RECEIVED_PLEDGE: {
        return {...state, requestingPledge: false, receivedPledge: true, name: action.name}
    }
    case REQUEST_UPDATE_PLEDGE: {
        return {...state, updatingPledge: true, updatingPledgeError: null}
    }
    case REQUEST_UPDATE_PLEDGE_ERROR: {
        return {...state, updatingPledge: false, updatingPledgeError: action.errorMessage}
    }
    case FULFILLED_UPDATE_PLEDGE: {
        return {...state, updatingPledge: false, name: action.name}
    }
    }

    return {...state}
}