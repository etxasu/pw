import axios from 'axios'

export const REQUEST_GOAL = 'REQUEST_GOAL'
export const REQUEST_GOAL_ERROR = 'REQUEST_GOAL_ERROR'
export const RECEIVED_GOAL = 'RECEIVED_GOAL'
export const REQUEST_SET_GOAL = 'REQUEST_SET_GOAL'
export const REQUEST_SET_GOAL_ERROR = 'REQUEST_SET_GOAL_ERROR'
export const FULFILLED_SET_GOAL = 'FULFILLED_SET_GOAL'

export const requestGoal = () => ({
    type: REQUEST_GOAL
})

export const requestGoalError = (errorMessage) => ({
    type: REQUEST_GOAL_ERROR,
    errorMessage: errorMessage
})

export const receivedGoal = (amount, deadline) => ({
    type: RECEIVED_GOAL,
    amount: amount,
    deadline: deadline
})

export const requestSetGoal = () => ({
    type: REQUEST_SET_GOAL
})

export const requestSetGoalError = (errorMessage) => ({
    type: REQUEST_SET_GOAL_ERROR,
    errorMessage: errorMessage
})

export const fulfilledSetGoal = (amount, deadline) => ({
    type: FULFILLED_SET_GOAL,
    amount: amount,
    deadline: deadline
})

export const getGoal = () => {
    return (dispatch) => {
        dispatch(requestGoal())
        
        axios.post('/get_goal').then((response) => {
            if (response.status == 200) {
                let amount = Number.parseFloat(response.data.amount)
                let deadline = new Date(response.data.deadline)
                dispatch(receivedGoal(amount, deadline))
            }
            else {
                dispatch(requestGoalError("Error requesting previously set goal from server"))
            }
        }).catch((error) => {
            dispatch(requestGoalError(error.message))
        })
    }
}

export const setGoal = (username, amount, deadline) => {
    return (dispatch) => {
        dispatch(requestSetGoal())

        axios.post('/goals', {
            goalAmount: amount,
            goalDeadline: deadline
        }).then((res) => {
            dispatch(fulfilledSetGoal(Number.parseFloat(amount), new Date(deadline)))
        }).catch((err) => {
            dispatch(requestSetGoalError(err.message))
        })
    }
}