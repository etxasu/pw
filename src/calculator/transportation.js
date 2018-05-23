import React from 'react'
import ReactDOM from 'react-dom'
import * as Model from './model'
import * as Util from './util'
const axios = require('axios')


class CalculatorTransportation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            initLoad: true
        }

        this.handleChange = this.handleChange.bind(this)
    }

    //second page in the step by step calculator getting information about the user's personal and public transportation
    render() {
        return (
            <form className="was-validated">
                <h2>Transportation</h2>
                <div className="form-group">
                    <label>Distance units</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.dist_units)}
                </div>

                <div className="form-group">
                    <label>Car type</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.car_type)}
                </div>

                {this.props.parentState[Model.FIELD_IDS.car_type] != 'none' && (
                    <div className="form-group">
                        <label>Car distance</label>
                        {Util.pageInputForField(this, Model.FIELD_IDS.car_dist)}
                    </div>
                )}

                <div className="form-group">
                    <label>Motor bike distance</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.motorcycle_dist)}
                </div>

                <div className="form-group">
                    <label>Intercity rail distance</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.intercity_rail_dist)}
                </div>

                <div className="form-group">
                    <label>Bus distance</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.bus_dist)}
                </div>

                <div className="form-group">
                    <label>Commuter rail distance</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.commuter_rail_dist)}
                </div>

                <div className="form-group">
                    <label>Tram distance</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.tram_dist)}
                </div>
                {this.updateFields()}
            </form>
        )
    }

    //load latest data entered by this user to show in the fields
    updateFields() {
        const self = this

        let username = sessionStorage.getItem('username')
        if (username !== null && username !== '' && self.state.initLoad) {
            self.setState({initLoad: false})
            axios.post('/getRecentData', {
                params: {
                    username: username
                }
            }).then(function (response) {
                document.getElementsByName('dist_units')[0].value = (response.data[0].DistUnits)
                document.getElementsByName('car_type')[0].value = (response.data[0].CarType)
                document.getElementsByName('motorcycle_dist')[0].value = parseInt(response.data[0].MotorcycleDist)
                document.getElementsByName('intercity_rail_dist')[0].value = parseInt(response.data[0].IntercityRailDist)
                document.getElementsByName('bus_dist')[0].value = parseInt(response.data[0].BusDist)
                document.getElementsByName('commuter_rail_dist')[0].value = parseInt(response.data[0].CommuterRailDist)
                document.getElementsByName('tram_dist')[0].value = parseInt(response.data[0].TramDist)
            }).catch(function (response) {
                console.log(response)
            })
        }
    }

    handleChange(event) {
        this.props.handleChildChange(event.target.name, event.target.value)
    }
}

export default CalculatorTransportation
