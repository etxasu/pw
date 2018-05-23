import React from 'react'
import ReactDOM from 'react-dom'
import * as Model from './model'
import * as Util from './util'

class CalculatorWaste extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    //render third page in the step by step calculator only asking about how much the user recycles
    render() {
        return (
            <form className="was-validated">
                <h2>Waste</h2>
                <div className="form-group">
                    <label>How much do you recycle?</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.recycling_amount)}
                </div>
            </form>
        )
    }

    handleChange(event) {
        this.props.handleChildChange(event.target.name, event.target.value)
    }
}

export default CalculatorWaste
