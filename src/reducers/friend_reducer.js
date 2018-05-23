import { REQUEST_FRIENDS,
    REQUEST_FRIENDS_ERROR,
    RECEIVED_FRIENDS,
    ADD_FRIENDS,
    ADD_FRIENDS_ERROR,
    FULFILLED_ADD_FRIENDS,
    REMOVE_FRIENDS,
    REMOVE_FRIENDS_ERROR,
    FULFILLED_REMOVE_FRIENDS,
    CHALLENGE_FRIENDS,
    CHALLENGE_FRIENDS_ERROR,
    FULFILLED_CHALLENGE_FRIENDS,
    REQUEST_FRIENDS_DETAILS,
    REQUEST_FRIENDS_DETAILS_ERROR,
    RECEIVED_FRIENDS_DETAILS } from '../actions/friend_actions'

export default function reducer(state={
    users: {},
    friends: [],
    friendsDetails: [],
    requestingFriends: false,
    requestingFriendsError: null,
    receivedFriends: false,
    addingFriends: false,
    addingFriendsError: null,
    removingFriends: false,
    removingFriendsError: null,
    challengingFriends: false,
    challengingFriendsError: null,
    challengedFriends: false,
    requestingFriendsDetails: false,
    requestingFriendsDetailsError: null
}, action) {
    switch (action.type) {
    case REQUEST_FRIENDS: {
        return {...state, requestingFriends: true, requestingFriendsError: null}
    }
    case REQUEST_FRIENDS_ERROR: {
        return {...state, requestingFriends: false, requestingFriendsError: action.errorMessage}
    }
    case RECEIVED_FRIENDS: {
        return {...state, requestingFriends: false, receivedFriends: true,
            friends: action.friends, users: action.users}
    }
    case ADD_FRIENDS: {
        return {...state, addingFriends: true, addingFriendsError: null}
    }
    case ADD_FRIENDS_ERROR: {
        return {...state, addingFriends: false, addingFriendsError: action.errorMessage}
    }
    case FULFILLED_ADD_FRIENDS: {
        let newState = {...state, addingFriends: false}
        newState.friends = state.friends.concat(action.ids)
        return newState
    }
    case REMOVE_FRIENDS: {
        return {...state, removingFriends: true, removingFriendsError: null}
    }
    case REMOVE_FRIENDS_ERROR: {
        return {...state, removingFriends: false, removingFriendsError: action.errorMessage}
    }
    case FULFILLED_REMOVE_FRIENDS: {
        let newState = {...state, removingFriends: false}
        newState.friends = state.friends.filter((item) => {
            return !action.ids.includes(item)
        })
        return newState
    }
    case CHALLENGE_FRIENDS: {
        return {...state, challengingFriends: true, challengingFriendsError: null,
            challengedFriends: false}
    }
    case CHALLENGE_FRIENDS_ERROR: {
        return {...state, challengingFriends: false, challengingFriendsError: action.errorMessage}
    }
    case FULFILLED_CHALLENGE_FRIENDS: {
        return {...state, challengingFriends: false, challengedFriends: true}
    }
    case REQUEST_FRIENDS_DETAILS: {
        return {...state, requestingFriendsDetails: true, requestingFriendsDetailsError: null}
    }
    case REQUEST_FRIENDS_DETAILS_ERROR: {
        return {...state, requestingFriendsDetails: false, requestingFriendsDetailsError: action.errorMessage}
    }
    case RECEIVED_FRIENDS_DETAILS: {
        return {...state, requestingFriendsDetails: false, friendsDetails: action.friendsDetails}
    }
    }
    return {...state}
}