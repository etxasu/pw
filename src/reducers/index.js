import { combineReducers } from 'redux'

import userReducer from './user_reducer'
import pledgeReducer from './pledge_reducer'
import goalReducer from './goal_reducer'
import carbonFootprintReducer from './carbon_footprint_reducer'
import friendReducer from './friend_reducer'
import notificationReducer from './notification_reducer'
import leaderboardReducer from './leaderboard_reducer'

export default combineReducers({
    user: userReducer,
    pledge: pledgeReducer,
    goal: goalReducer,
    carbonFootprint: carbonFootprintReducer,
    friend: friendReducer,
    notification: notificationReducer,
    leaderboard: leaderboardReducer
})