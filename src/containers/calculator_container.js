import { connect } from 'react-redux'

import CalculatorMain from '../calculator/main'
import { addCarbonFootprint,
    getCarbonFootprints } from '../actions/carbon_footprint_actions'

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn,
    username: state.user.username,
    requestingAddCarbonFootprint: state.carbonFootprint.requestingAddCarbonFootprint,
    requestingAddCarbonFootprintError: state.carbonFootprint.requestingAddCarbonFootprintError,
    fulfilledAddCarbonFootprint:  state.carbonFootprint.fulfilledAddCarbonFootprint
})

const mapDispatchToProps = (dispatch) => {
    return {
        addCarbonFootprint: (username, calculationData) => {
            dispatch(addCarbonFootprint(username, calculationData))
        }
    }
}

const CalculatorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CalculatorMain)

export default CalculatorContainer