import { connect } from 'react-redux'

import GoalScreen from '../goal_screen'
import { setGoal } from '../actions/goal_actions'

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn,
    username: state.user.username,
    requestingSetGoal: state.goal.requestingSetGoal,
    requestingSetGoalError: state.goal.requestingSetGoalError,
    fulfilledSetGoal: state.goal.fulfilledSetGoal
})

const mapDispatchToProps = (dispatch) => {
    return {
        setGoal: (username, amount, deadline) => {
            dispatch(setGoal(username, amount, deadline))
        }
    }
}

const GoalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GoalScreen)

export default GoalContainer