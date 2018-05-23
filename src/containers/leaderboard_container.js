import { connect } from 'react-redux'

import Leaderboard from '../leaderboard'
import { getLeaderboardData,
    getDetails } from '../actions/leaderboard_actions'

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn,
    username: state.user.username,
    data: state.leaderboard.data,
    details: state.leaderboard.details,
    requestingLeaderboardData: state.leaderboard.requestingLeaderboardData,
    requestingLeaderboardDataError: state.leaderboard.requestingLeaderboardDataError,
    receivedLeaderboardData: state.leaderboard.receivedLeaderboardData,
    requestingDetails: state.leaderboard.requestingDetails,
    requestingDetailsError: state.leaderboard.requestingDetailsError
})

const mapDispatchToProps = (dispatch) => {
    return {
        getLeaderboardData: (username) => (dispatch(getLeaderboardData(username))),
        getDetails: (username) => (dispatch(getDetails(username)))
    }
}

const LeaderboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaderboard)

export default LeaderboardContainer