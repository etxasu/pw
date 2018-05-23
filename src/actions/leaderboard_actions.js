import axios from 'axios'

export const REQUEST_LEADERBOARD_DATA = 'REQUEST_LEADERBOARD_DATA'
export const REQUEST_LEADERBOARD_DATA_ERROR = 'REQUEST_LEADERBOARD_DATA_ERROR'
export const RECEIVED_LEADERBOARD_DATA = 'RECEIVED_LEADERBOARD_DATA'
export const REQUEST_DETAILS = 'REQUEST_DETAILS'
export const REQUEST_DETAILS_ERROR = 'REQUEST_DETAILS_ERROR'
export const RECEIVED_DETAILS = 'RECEIVED_DETAILS'

export const requestLeaderboardData = () => ({
    type: REQUEST_LEADERBOARD_DATA
})

export const requestLeaderboardDataError = (errorMessage) => ({
    type: REQUEST_LEADERBOARD_DATA_ERROR,
    errorMessage: errorMessage
})

export const receivedLeaderboardData = (data) => ({
    type: RECEIVED_LEADERBOARD_DATA,
    data: data
})

export const requestDetails = () => ({
    type: REQUEST_DETAILS
})

export const requestDetailsError = (errorMessage) => ({
    type: REQUEST_DETAILS_ERROR,
    errorMessage: errorMessage
})

export const receivedDetails = (details) => ({
    type: RECEIVED_DETAILS,
    details: details
})

export const getLeaderboardData = (username) => {
    return (dispatch) => {
        dispatch(requestLeaderboardData())

        axios.post('/getLeaderboardData').then((response) => {
            let points = response.data
            let data = []

            if (points.length > 0) {
                points.sort((a, b) => {
                    let totalA = parseFloat(a['CalculationTotal'])
                    let totalB = parseFloat(b['CalculationTotal'])
                    return totalA - totalB
                })
                points.forEach((element, index) => {
                    let isYou = element['UserName'] === username
                    let date = new Date(element['Date'])
                    data.push({
                        place: index + 1,
                        name: element['UserName'],
                        emissions: parseFloat(element['CalculationTotal']),
                        lastUpdate: date,
                        isYou: isYou
                    })
                })
            }

            dispatch(receivedLeaderboardData(data))
        }).catch((error) => {
            dispatch(requestLeaderboardDataError(error.message))
        })
    }
}

export const getDetails = (username) => {
    return (dispatch) => {
        dispatch(requestDetails())

        axios.post('/getRecentData', {
            params: {
                username: username
            }
        }).then((response) => {
            let points = response.data
            let details = {}

            if (points.length > 0) {
                details.TransportTotal = points[0].TransportTotal
                details.WasteTotal = points[0].WasteTotal
                details.EnergyTotal = points[0].EnergyTotal
                details.LifestyleTotal = points[0].LifestyleTotal
                details.NumPeople = points[0].NumPeople
                details.NumYears = points[0].NumYears
                details.ElectricityUse = points[0].ElectricityUse
                details.MainFuel = points[0].MainFuel
                details.ShopLocalProduce = points[0].ShopLocalProduce
                details.ShopOrganicFood = points[0].ShopOrganicFood
                details.username = username
            }

            dispatch(receivedDetails(details))
        }).catch((error) => {
            dispatch(requestDetailsError(error.message))
        })
    }
}