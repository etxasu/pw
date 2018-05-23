import { connect } from 'react-redux'

import FriendList from '../friends/friend_list'
import { getFriends, attemptAddFriends,
    attemptRemoveFriends,
    attemptChallengeFriends,
    getFriendsDetails } from '../actions/friend_actions'

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn,
    username: state.user.username,
    users: state.friend.users,
    friends: state.friend.friends,
    friendsDetails: state.friend.friendsDetails,
    requestingFriends: state.friend.requestingFriends,
    requestingFriendsError: state.friend.requestingFriendsError,
    challengingFriends: state.friend.challengingFriends,
    challengingFriendsError: state.friend.challengingFriendsError,
    challengedFriends: state.friend.challengedFriends,
    requestingFriendsDetails: state.friend.requestingFriendsDetails,
    requestingFriendsDetailsError: state.friend.requestingFriendsDetailsError
})

const mapDispatchToProps = (dispatch) => {
    return {
        getFriends: () => (dispatch(getFriends())),
        attemptAddFriends: (ids) => (dispatch(attemptAddFriends(ids))),
        attemptRemoveFriends: (ids) => (dispatch(attemptRemoveFriends(ids))),
        attemptChallengeFriends: (reduction, friends) => (dispatch(attemptChallengeFriends(reduction, friends))),
        getFriendsDetails: (friends) => (dispatch(getFriendsDetails(friends)))
    }
}

const FriendListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendList)

export default FriendListContainer
