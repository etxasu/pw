import React from 'react'
import ReactDOM from 'react-dom'
import * as Model from './model'
import * as Util from './util'

class CalculatorLifestyle extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    //fifth page in the step by step calculator is lifestyle, asking about the user's diet and shopping habits
    render() {
        return (
            <form className="was-validated">
                <h2>Lifestyle</h2>
                <div className="form-group">
                    <label>Diet</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.diet)}
                </div>

                <div className="form-group">
                    <label>Do you shop mostly for local produce?</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.shop_local_produce)}
                </div>

                <div className="form-group">
                    <label>Do you shop mostly for organic food?</label>
                    {Util.pageInputForField(this, Model.FIELD_IDS.shop_organic_food)}
                </div>
            </form>
        )
    }

    handleChange(event) {
        this.props.handleChildChange(event.target.name, event.target.value)
    }
}

export default CalculatorLifestyle
