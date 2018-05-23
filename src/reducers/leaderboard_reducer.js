import { REQUEST_LEADERBOARD_DATA,
    REQUEST_LEADERBOARD_DATA_ERROR,
    RECEIVED_LEADERBOARD_DATA,
    REQUEST_DETAILS, REQUEST_DETAILS_ERROR,
    RECEIVED_DETAILS } from '../actions/leaderboard_actions'

export default function reducer(state={
    data: [],
    details: {},
    requestingLeaderboardData: false,
    requestingLeaderboardDataError: null,
    receivedLeaderboardData: false,
    requestingDetails: false,
    requestingDetailsError: null
}, action) {

    switch (action.type) {
    case REQUEST_LEADERBOARD_DATA: {
        return {...state, requestingLeaderboardData: true, requestingLeaderboardDataError: null,
            receivedLeaderboardData: false}
    }
    case REQUEST_LEADERBOARD_DATA_ERROR: {
        return {...state, requestingLeaderboardData: false,
            requestingLeaderboardDataError: action.errorMessage}
    }
    case RECEIVED_LEADERBOARD_DATA: {
        return {...state, requestingLeaderboardData: false, receivedLeaderboardData: true,
            data: action.data}
    }
    case REQUEST_DETAILS: {
        return {...state, requestingDetails: true, requestingDetailsError: null}
    }
    case REQUEST_DETAILS_ERROR: {
        return {...state, requestingDetails: false, requestingDetailsError: action.errorMessage}
    }
    case RECEIVED_DETAILS: {
        return {...state, requestingDetails: false, details: action.details}
    }
    }

    return {...state}
}