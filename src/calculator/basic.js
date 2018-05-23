import React from 'react'
import ReactDOM from 'react-dom'
import * as Model from './model'
import * as Util from './util'
const axios = require('axios')


class CalculatorBasic extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            initLoad: true
        }
        this.handleChange = this.handleChange.bind(this)
    }

    //first page of step by step calculator asking for number of people and the numper of years to be used in calculation
    render() {
        return (
            <form className="was-validated">
                <h2>Basic</h2>
                <div className="form-group">
                    <label>Number of people</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.num_people)}
                </div>
                <div className="form-group">
                    <label>Number of years</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.num_years)}
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
                document.getElementsByName('num_people')[0].value = parseInt(response.data[0].NumPeople)
                document.getElementsByName('num_years')[0].value = parseInt(response.data[0].NumYears)
            }).catch(function (response) {
                console.log(response)
            })
        }
    }

    handleChange(event) {
        this.props.handleChildChange(event.target.name, event.target.value)
    }
}

export default CalculatorBasic
