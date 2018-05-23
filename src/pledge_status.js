import React from 'react'

import PledgeForm from './pledge_form'

class PledgeStatus extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.authorized) {
            return (
                <div>
                    <PledgeForm alreadyDone={true} pledgeSubmit={this.props.pledgeSubmit}/>
                </div>
                
            )
        }
        else {
            return (
                <PledgeForm alreadyDone={false} pledgeSubmit={this.props.pledgeSubmit}/>
            )
        }
    }
}

export default PledgeStatus