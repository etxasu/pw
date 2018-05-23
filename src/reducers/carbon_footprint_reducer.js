import { REQUEST_CARBON_FOOTPRINTS,
    REQUEST_CARBON_FOOTPRINTS_ERROR,
    RECEIVED_CARBON_FOOTPRINTS,
    REQUEST_ADD_CARBON_FOOTPRINT,
    REQUEST_ADD_CARBON_FOOTPRINT_ERROR,
    FULFILLED_ADD_CARBON_FOOTPRINT } from '../actions/carbon_footprint_actions'

export default function reducer(state={
    carbonFootprints: [],
    requestingCarbonFootprints: false,
    requestingCarbonFootprintsError: null,
    receivedCarbonFootprints: false,
    requestingAddCarbonFootprint: false,
    requestingAddCarbonFootprintError: null,
    fulfilledAddCarbonFootprint: false
}, action) {

    switch (action.type) {
    
    case REQUEST_CARBON_FOOTPRINTS: {
        return {...state, requestingCarbonFootprints: true, requestingCarbonFootprintsError: null,
            receivedCarbonFootprints: false, requestingAddCarbonFootprintError: null}
    }
    case REQUEST_CARBON_FOOTPRINTS_ERROR: {
        return {...state, requestingCarbonFootprints: false, requestingCarbonFootprintsError: action.errorMessage}
    }
    case RECEIVED_CARBON_FOOTPRINTS: {
        return {...state, requestingCarbonFootprints: false, receivedCarbonFootprints: true,
            carbonFootprints: action.carbonFootprints}
    }
    case REQUEST_ADD_CARBON_FOOTPRINT: {
        return {...state, requestingAddCarbonFootprint: true, requestingAddCarbonFootprintError: null,
            fulfilledAddCarbonFootprint: false, requestingCarbonFootprintsError: null}
    }
    case REQUEST_ADD_CARBON_FOOTPRINT_ERROR: {
        return {...state, requestingAddCarbonFootprint: false, requestingAddCarbonFootprintError: action.errorMessage}
    }
    case FULFILLED_ADD_CARBON_FOOTPRINT: {
        return {...state, requestingAddCarbonFootprint: false, fulfilledAddCarbonFootprint: true,
            carbonFootprints: [...state.carbonFootprints, action.carbonFootprint]}
    }
    }

    return {...state}
}