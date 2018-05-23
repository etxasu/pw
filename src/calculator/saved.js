import React from 'react'
const axios = require('axios')

import { FIELDS } from './model'


class Saved extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)

        let calculationData = {}

        FIELDS.forEach(field => {
            calculationData[field.id] = localStorage.getItem(field.id)
        })
        calculationData['transport'] = localStorage.getItem('transport')
        calculationData['waste'] = localStorage.getItem('waste')
        calculationData['energy'] = localStorage.getItem('energy')
        calculationData['lifestyle'] = localStorage.getItem('lifestyle')
        calculationData['calculation'] = localStorage.getItem('total')


        this.props.addCarbonFootprint(this.props.username, calculationData)
    }

    //last page in the step by step calculator notifying the user that their calculation results 
    //have been saved if they are logged in, or asking them to login/register if they're using the app as a guest
    render() {
        if (this.props.loggedIn) {
            return (
                <div className="form-group">
                    <br/>
                    Hooray! Your carbon footprint calculation results have been saved.<br/> <br/>

                    Transportation portion of {localStorage.getItem('transport')} tonnes has been saved. <br/>
                    Waste portion of {localStorage.getItem('waste')} tonnes has been saved. <br/>
                    Energy portion of {localStorage.getItem('energy')} tonnes has been saved. <br/>
                    Lifestyle portion of {localStorage.getItem('lifestyle')} tonnes has been saved. <br/>
                    Summed up total of {localStorage.getItem('total')} tonnes has been saved. <br/>
                </div>
            )
        } else {
            return (
                <div className="form-group">
                    <br/>
                    Unfortunetely you are not logged in so your Carbon Footprint Calculation
                    was not saved in our records.  You can start tracking your calculation by logging
                    in or registering a new account.<br/> <br/>

                    Transportation portion of {localStorage.getItem('transport')} tonnes has been saved. <br/>
                    Waste portion of {localStorage.getItem('waste')} tonnes has been saved. <br/>
                    Energy portion of {localStorage.getItem('energy')} tonnes has been saved. <br/>
                    Lifestyle portion of {localStorage.getItem('lifestyle')} tonnes has been saved. <br/>
                    Summed up total of {localStorage.getItem('total')} tonnes has been saved. <br/>
                </div>
            )
        }

    }

    handleChange(event) {
        this.props.handleChildChange(event.target.name, event.target.value)
    }
}

export default Saved