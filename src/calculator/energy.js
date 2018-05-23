import React from 'react'
import ReactDOM from 'react-dom'
import * as Model from './model'
import * as Util from './util'
const axios = require('axios')


class CalculatorEnergy extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            initLoad: true
        }
        this.handleChange = this.handleChange.bind(this)
    }

    //fourth page in the step by step calculator getting information from the user about electricity consumption and fuel used for heating
    render() {
        return (
            <form className="was-validated">
                <h2>Energy</h2>
                <div className="form-group">
                    <label>Do you know what your yearly electricty consumption is?</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.know_electricty_use)}
                </div>

                {this.props.parentState[Model.FIELD_IDS.know_electricty_use] == 'yes' && (
                    <div className="form-group">
                        <label>Yearly household electricity consumption in Kwh</label>
                        {Util.pageInputForField(this, Model.FIELD_IDS.electricity_use)}
                    </div>
                )}

                <div className="form-group">
                    <label>Main fuel used for heating</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.main_fuel)}
                </div>

                {this.props.parentState[Model.FIELD_IDS.main_fuel] != 'electric' && this.props.parentState[Model.FIELD_IDS.main_fuel] != 'none' && (
                    <div className="form-group">
                        <label>Household floor area</label>
                        {Util.pageInputForField(this, Model.FIELD_IDS.house_floor_area)}
                        {Util.pageInputForField(this, Model.FIELD_IDS.area_units)}
                    </div>
                )}
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
                document.getElementsByName('house_floor_area')[0].value = parseInt(response.data[0].HouseFloorArea)
                //document.getElementsByName('num_years')[0].value = parseInt(response.data[0].NumYears)
            }).catch(function (response) {
                console.log(response)
            })
        }
    }

    handleChange(event) {
        this.props.handleChildChange(event.target.name, event.target.value)
    }
}

export default CalculatorEnergy
