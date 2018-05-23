import { connect } from 'react-redux'

import PledgeMain from '../pledge_main'
import { getPledge, takePledge, updatePledge } from '../actions/pledge_actions'

const mapStateToProps = (state) => ({
    loggedIn: state.user.loggedIn,
    username: state.user.username,
    name: state.pledge.name,
    requestingTakePledge: state.pledge.requestingTakePledge,
    requestingTakePledgeError: state.pledge.requestingTakePledgeError,
    fulfilledTakePledge: state.pledge.fulfilledTakePledge,
    requestingPledge: state.pledge.requestingPledge,
    requestingPledgeError: state.pledge.requestingPledgeError,
    receivedPledge: state.pledge.receivedPledge
})

const mapDispatchToProps = (dispatch) => {
    return {
        getPledge: () => {
            dispatch(getPledge())
        },
        takePledge: (username, name) => {
            dispatch(takePledge(username, name))
        },
        updatePledge: (name) => (dispatch(updatePledge(name)))
    }
}

const PledgeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PledgeMain)

export default PledgeContainer