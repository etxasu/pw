import axios from 'axios'

export const REQUEST_CARBON_FOOTPRINTS = 'REQUEST_CARBON_FOOTPRINTS'
export const REQUEST_CARBON_FOOTPRINTS_ERROR = 'REQUEST_CARBON_FOOTPRINTS_ERROR'
export const RECEIVED_CARBON_FOOTPRINTS = 'RECEIVED_CARBON_FOOTPRINTS'
export const REQUEST_ADD_CARBON_FOOTPRINT = 'REQUEST_ADD_CARBON_FOOTPRINT'
export const REQUEST_ADD_CARBON_FOOTPRINT_ERROR = 'REQUEST_ADD_CARBON_FOOTPRINT_ERROR'
export const FULFILLED_ADD_CARBON_FOOTPRINT = 'FULFILLED_ADD_CARBON_FOOTPRINT'

export const requestCarbonFootprints = () => ({
    type: REQUEST_CARBON_FOOTPRINTS
})

export const requestCarbonFootprintsError = (errorMessage) => ({
    type: REQUEST_CARBON_FOOTPRINTS_ERROR,
    errorMessage: errorMessage
})

export const receivedCarbonFootprints = (carbonFootprints) => ({
    type: RECEIVED_CARBON_FOOTPRINTS,
    carbonFootprints: carbonFootprints
})

export const requestAddCarbonFootprint = () => ({
    type: REQUEST_ADD_CARBON_FOOTPRINT
})

export const requestAddCarbonFootprintError = (errorMessage) => ({
    type: REQUEST_ADD_CARBON_FOOTPRINT_ERROR,
    errorMessage: errorMessage
})

export const fulfilledAddCarbonFootprint = (carbonFootprint) => ({
    type: FULFILLED_ADD_CARBON_FOOTPRINT,
    carbonFootprint: carbonFootprint
})

export const getCarbonFootprints = () => {
    return (dispatch) => {
        dispatch(requestCarbonFootprints())

        axios.post('/getPoints').then((response) => {
            let points = response.data
            let footprints = []

            if (points.length > 0) {
                points.forEach((element) => {
                    element.Date = new Date(element['Date'])
                })
                footprints = points.sort((a, b) => a.Date - b.Date)
            }
            dispatch(receivedCarbonFootprints(footprints))
        }).catch((error) => {
            dispatch(requestCarbonFootprintsError(error.message))
        })
    }
}

export const addCarbonFootprint = (username, calculationData) => {
    return (dispatch) => {
        dispatch(requestAddCarbonFootprint())

        let params = {...calculationData}

        axios.post('/saveCalculation', {
            params
        }).then((response) => {
            if (response.data === 'no-token') {
                dispatch(requestAddCarbonFootprintError('Invalid auth token'))
            } else {
                calculationData.Date = new Date()
                dispatch(fulfilledAddCarbonFootprint(calculationData))
            }
        }).catch((error) => {
            dispatch(requestAddCarbonFootprintError(error.message))
        })
    }
}