import { connect } from 'react-redux'

import ChartMain from '../chart/main'
import { getCarbonFootprints } from '../actions/carbon_footprint_actions'

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn,
    username: state.user.username,
    carbonFootprints: state.carbonFootprint.carbonFootprints,
    requestingCarbonFootprints: state.carbonFootprint.requestingCarbonFootprints,
    requestingCarbonFootprintsError: state.carbonFootprint.requestingCarbonFootprintsError
})

const mapDispatchToProps = (dispatch) => {
    return {
        getCarbonFootprints: () => (dispatch(getCarbonFootprints()))
    }
}

const ChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChartMain)

export default ChartContainer