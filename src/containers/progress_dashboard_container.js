import { connect } from 'react-redux'

import ProgressDashboard from '../progress_dashboard'
import { getGoal } from '../actions/goal_actions'
import { getCarbonFootprints } from '../actions/carbon_footprint_actions'

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn,
    amount: state.goal.amount,
    deadline: state.goal.deadline,
    requestingGoal: state.goal.requestingGoal,
    requestingGoalError: state.goal.requestingGoalError,
    receivedGoal: state.goal.receivedGoal,
    lastCarbonFootprint: state.carbonFootprint.carbonFootprints[state.carbonFootprint.carbonFootprints.length-1]
})

const mapDispatchToProps = (dispatch) => {
    return {
        getGoal: () => (dispatch(getGoal())),
        getCarbonFootprints: () => (dispatch(getCarbonFootprints()))
    }
}

const ProgressDashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgressDashboard)

export default ProgressDashboardContainer