import React from 'react'

import {VIEWS} from './app'
import * as GoalModel from './goal_model'
import './goal_screen.scss'
import './jumbotronStyle.scss'
import background from './images/trees_background.jpeg'

class GoalScreen extends React.Component {
    constructor(props) {
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDone = this.handleDone.bind(this)

        let emissionsData = GoalModel.loadEmissionsData()
        let goal = GoalModel.loadGoal()

        this.state = {
            targetInput: goal != null ? goal.amount : 0,
            deadlineInput: goal != null ? this.dateToDaysFromNow(goal.date) : 0,
            currentAmount: emissionsData.amount,
            hadGoal: goal != null
        }
    }

    render() {
        return (
            <div id="main">
                <div className="content">
                    <div id="goalScreen" className="container pt-3">
                        <div className="row">
                            <div className="col">
                                <div className="jumbotron background-tan">
                                    <h1>{this.getTitleText()}</h1>

                                    <p>Current: <strong>{this.getCurrentAmount()}t</strong> CO₂ / year</p>

                                    <div className="form-group">
                                        <label>Target (t CO₂ / year)</label>
                                        <input 
                                            name="targetInput" 
                                            type="number" 
                                            className="form-control" 
                                            min={0} 
                                            value={this.state.targetInput} 
                                            onChange={this.handleInputChange}
                                        />
                                    </div>

                                    <p><strong>{this.getReductionPercent()}%</strong> reduction</p>

                                    <div className="form-group">
                                        <label>Deadline (days from now)</label>
                                        <input 
                                            name="deadlineInput" 
                                            type="number" 
                                            className="form-control" 
                                            min={0} 
                                            step={1}
                                            value={this.state.deadlineInput}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>

                                    <p>{this.dateToStr(this.getDeadlineDate())}</p>

                                    <button type="submit" className="btn btn-primary" onClick={this.handleDone}>Done</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={background} className="bg" alt=""/>
            </div>
        )
    }

    renderError() {
        if (this.props.requestingSetGoalError) {
            return (
                <div className="alert alert-danger">
                    {this.props.requestingSetGoalError}
                </div>
            )
        }
    }

    handleInputChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    handleDone(evt) {
        evt.preventDefault()
        GoalModel.storeGoal(this.state.targetInput, this.getDeadlineDate())
        this.props.setGoal(this.props.username, this.state.targetInput,
            this.getDeadlineDate().valueOf())

        this.props.goToView(VIEWS.progressDashboard)
    }

    getTitleText() {
        if(this.state.hadGoal) {
            return "Update your Goal"
        } else {
            return "Set your Goal"
        }
    }

    getReductionPercent() {
        let current = this.state.currentAmount
        let target = this.state.targetInput
        let delta = Math.max(current - target, 0)
        let relDelta = delta / current
        relDelta = Number.isNaN(relDelta) ? 0 : relDelta
        return this.numToStr(relDelta * 100)
    }

    getDeadlineDate() {
        let now = new Date()
        let today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
        let daysFromNow = Math.round(Math.max(this.state.deadlineInput, 0))
        let daysInMilis = daysFromNow * 24 * 60 * 60 * 1000
        let deadline = new Date(today.valueOf() + daysInMilis)
        return deadline
    }

    numToStr(num) {
        return num.toFixed(1)
    }

    dateToStr(date) {
        return date.toLocaleDateString('en-US', {month: 'short', day: '2-digit', year: 'numeric'})
    }

    getCurrentAmount() {
        return this.numToStr(this.state.currentAmount)
    }

    dateToDaysFromNow(date) {
        let now = new Date()
        let today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
        let todayMilis = today.valueOf()
        let dateMilis = date.valueOf()
        let deltaMilis = Math.max(dateMilis - todayMilis, 0)
        let deltaDays = deltaMilis / 1000 / 60 / 60 / 24
        deltaDays = Math.round(deltaDays)
        return deltaDays
    }
}

export default GoalScreen
