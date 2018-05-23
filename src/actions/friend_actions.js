import axios from 'axios'

export const REQUEST_FRIENDS = 'REQUEST_FRIENDS'
export const REQUEST_FRIENDS_ERROR = 'REQUEST_FRIENDS_ERROR'
export const RECEIVED_FRIENDS = 'RECEIVED_FRIENDS'
export const ADD_FRIENDS = 'ADD_FRIENDS'
export const ADD_FRIENDS_ERROR = 'ADD_FRIENDS_ERROR'
export const FULFILLED_ADD_FRIENDS = 'FULFILLED_ADD_FRIENDS'
export const REMOVE_FRIENDS = 'REMOVE_FRIENDS'
export const REMOVE_FRIENDS_ERROR = 'REMOVE_FRIENDS_ERROR'
export const FULFILLED_REMOVE_FRIENDS = 'FULFILLED_REMOVE_FRIENDS'
export const CHALLENGE_FRIENDS = 'CHALLENGE_FRIENDS'
export const CHALLENGE_FRIENDS_ERROR = 'CHALLENGE_FRIENDS_ERROR'
export const FULFILLED_CHALLENGE_FRIENDS = 'FULFILLED_CHALLENGE_FRIENDS'
export const REQUEST_FRIENDS_DETAILS = 'REQUEST_FRIENDS_DETAILS'
export const REQUEST_FRIENDS_DETAILS_ERROR = 'REQUEST_FRIENDS_DETAILS_ERROR'
export const RECEIVED_FRIENDS_DETAILS = 'RECEIVED_FRIENDS_DETAILS'

export const requestFriends = () => ({
    type: REQUEST_FRIENDS
})

export const requestFriendsError = (errorMessage) => ({
    type: REQUEST_FRIENDS_ERROR,
    errorMessage: errorMessage
})

export const receivedFriends = (friends, users) => ({
    type: RECEIVED_FRIENDS,
    friends: friends,
    users: users
})

export const addFriends = () => ({
    type: ADD_FRIENDS
})

export const addFriendsError = (errorMessage) => ({
    type: ADD_FRIENDS_ERROR,
    errorMessage: errorMessage
})

export const fulfilledAddFriends = (ids) => ({
    type: FULFILLED_ADD_FRIENDS,
    ids: ids
})

export const removeFriends = () => ({
    type: REMOVE_FRIENDS
})

export const removeFriendsError = (errorMessage) => ({
    type: REMOVE_FRIENDS_ERROR,
    errorMessage: errorMessage
})

export const fulfilledRemoveFriends = (ids) => ({
    type: FULFILLED_REMOVE_FRIENDS,
    ids: ids
})

export const challengeFriends = () => ({
    type: CHALLENGE_FRIENDS
})

export const challengeFriendsError = (errorMessage) => ({
    type: CHALLENGE_FRIENDS_ERROR,
    errorMessage: errorMessage
})

export const fulfilledChallengeFriends = () => ({
    type: FULFILLED_CHALLENGE_FRIENDS
})

export const requestFriendsDetails = () => ({
    type: REQUEST_FRIENDS_DETAILS
})

export const requestFriendsDetailsError = (errorMessage) => ({
    type: REQUEST_FRIENDS_DETAILS_ERROR,
    errorMessage: errorMessage
})

export const receivedFriendsDetails = (friendsDetails) => ({
    type: RECEIVED_FRIENDS_DETAILS,
    friendsDetails: friendsDetails
})

export const getFriends = () => {
    return (dispatch) => {
        dispatch(requestFriends())

        axios.post('/friends/get_friends')
            .then((response) => {
                let ids = response.data.usernames

                axios.post('/friends/get_users')
                    .then((response) => {
                        console.log(response)
                        let users = response.data.users.filter((item) => {
                            return item.username != null && item.username != ''
                        }).map((item) => {
                            return {
                                id: item.username,
                                name: item.username,
                                email: item.email != null ? item.email : ''
                            }
                        })
                        console.log(users)

                        let userMap = {}
                        for (let index in users) {
                            let user = users[index]
                            userMap[user.id] = user
                        }

                        let friends = Object.values(userMap).filter((item) => {
                            return ids.includes(item.id)
                        }).map((item) => {
                            return item.id
                        })

                        dispatch(receivedFriends(friends, userMap))
                    })
                    .catch((error) => {
                        dispatch(requestFriendsError(error.message))
                    })
            })
            .catch((error) => {
                dispatch(requestFriendsError(error.message))
            })
    }
}

export const attemptAddFriends = (ids) => {
    return (dispatch) => {
        dispatch(addFriends())
        
        axios.post('/friends/add_friends',{
            friendUsernames: ids
        }).then((response) => {
            dispatch(fulfilledAddFriends(ids))
        }).catch((error) => {
            dispatch(addFriendsError(error.message))
        })
    }
}

export const attemptRemoveFriends = (ids) => {
    return (dispatch) => {
        dispatch(removeFriends())
        
        axios.post('/friends/remove_friends', {
            friendUsernames: ids
        }).then((response) => {
            dispatch(fulfilledRemoveFriends(ids))
        }).catch((error) => {
            dispatch(removeFriendsError(error.message))
        })
    }
}

export const attemptChallengeFriends = (reduction, friends) => {
    return (dispatch) => {
        dispatch(challengeFriends())

        let notifications = friends.map((friend) => {
            return {
                notificationType: 'challenge',
                reductionPercent: reduction,
                issueDate: new Date(),
                toUsername: friend.name
            }
        })

        axios.post('/send_notifications',{
            notifications: notifications
        }).then((response) => {
            dispatch(fulfilledChallengeFriends())
        }).catch((error) => {
            dispatch(challengeFriendsError(error.message))
        })
    }
}

export const getFriendsDetails = (friends) => {
    return (dispatch) => {
        dispatch(requestFriendsDetails())

        axios.post('/friends/getDataForFriends', { params: {
            names: friends
        }}).then((response) => {
            let points = response.data
            let friendsDetails = new Array()

            if (points.length > 0) {
                points.forEach((element) => {
                    let data = {
                        username: element['UserName'],
                        transportation: element['TransportTotal'],
                        waste: element['WasteTotal'],
                        energy: element['EnergyTotal'],
                        lifestyle: element['LifestyleTotal'],
                        numPeople: element['NumPeople'],
                        numYears: element['NumYears'],
                        emissions: element['CalculationTotal']
                    }
                    friendsDetails.push(data)
                })
            }
            dispatch(receivedFriendsDetails(friendsDetails))
        }).catch((error) => {
            dispatch(requestFriendsDetailsError(error.message))
        })
    }
}