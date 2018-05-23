import { REQUEST_GOAL, REQUEST_GOAL_ERROR,
    RECEIVED_GOAL, REQUEST_SET_GOAL,
    REQUEST_SET_GOAL_ERROR,
    FULFILLED_SET_GOAL } from '../actions/goal_actions'

export default function reducer(state={
    amount: null,
    deadline: null,
    requestingGoal: false,
    requestingGoalError: null,
    receivedGoal: false,
    requestingSetGoal: false,
    requestingSetGoalError: null,
    fulfilledSetGoal: false
}, action) {

    switch (action.type) {
    case REQUEST_GOAL: {
        return {...state, requestingGoal: true, requestingGoalError: null, receivedGoal: false,
            requestingSetGoalError: null}
    }
    case REQUEST_GOAL_ERROR: {
        return {...state, requestingGoal: false, requestingGoalError: action.errorMessage}
    }
    case RECEIVED_GOAL: {
        return {...state, requestingGoal: false, receivedGoal: true, amount: action.amount,
            deadline: action.deadline}
    }
    case REQUEST_SET_GOAL: {
        return {...state, requestingSetGoal: true, requestingSetGoalError: null, fulfilledSetGoal: false,
            requestingGoalError: null}
    }
    case REQUEST_SET_GOAL_ERROR: {
        return {...state, requestingSetGoal: false, requestingSetGoalError: action.errorMessage}
    }
    case FULFILLED_SET_GOAL: {
        return {...state, requestingSetGoal: false, fulfilledSetGoal: true, amount: action.amount,
            deadline: action.deadline}
    }
    }

    return {...state}
}