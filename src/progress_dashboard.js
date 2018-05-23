import React from 'react'
import './progress_dashboard.scss'
import './jumbotronStyle.scss'
import background from './images/trees_background.jpeg'
import {VIEWS} from './app'
import * as GoalModel from './goal_model'
import '../bower_components/bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'

// Bootstrap theme elements
function BootstrapOverhead(props) {
    return (
        <div id="main">
            <div className="content">
                <div id="progressDashboard" className="container pt-3">
                    <div className="row">
                        <div className="col">
                            <div className="jumbotron background-tan">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src={background} className="bg" alt=""/>
        </div>
    )
}

class ProgressDashboard extends React.Component {
    constructor(props) {
        super(props)

        this.handleSetGoal = this.handleSetGoal.bind(this)
        this.handleUpdateEmissions = this.handleUpdateEmissions.bind(this)
        this.handleTweetGoal = this.handleTweetGoal.bind(this)

        this.props.getGoal()
        this.props.getCarbonFootprints()
    }

    render() {
        if(this.props.loggedIn) {
            return this.renderLoggedIn()
        } else {
            return this.renderNotLoggedIn()
        }
    }

    renderLoggedIn() {
        if(this.hasGoal()) {
            return this.mainFlow()
        } else {
            return this.noGoalYetFlow()
        }
    }

    renderNotLoggedIn() {
        return (
            <BootstrapOverhead>
                <h1>Progress Dashboard</h1>
                <p>Please login to view the dashboard</p>
            </BootstrapOverhead>
        )
    }

    // Main page if the user has a goal set
    // Displays Goal, Last emissions update, and days remaining.
    mainFlow() {
        let goalP = (<p>
            {'Goal: reduce carbon emissions to '}
            <strong>{this.floatToStr(this.goalTargetAmount())}t</strong>
            {' of CO₂ per year by '}
            <strong>{this.dateToStr(this.goalTargetDate())}</strong>.
        </p>)

        let lastUpdateP = (<p>
            {'Last update: '}
            <strong>{this.floatToStr(this.lastUpdateAmount())}t</strong>
            {' of CO₂ per year, recorded on '}
            <strong>{this.dateToStr(this.lastUpdateDate())}</strong>.
        </p>)

        let statusP = (<p>
            {'Today is '}
            <strong>{this.dateToStr(this.todayDate())}</strong>
            {', so you have '}
            <strong>{this.goalDaysRemaining()} days</strong> 
            {' to reduce emissions by '}
            <strong>{this.floatToStr(this.goalDeltaAmount())}t</strong> 
            {' of CO₂ per year.'}
        </p>)

        return (
            <BootstrapOverhead>
                <h1>Progress Dashboard</h1>
                <h2>-{this.floatToStr(this.goalDeltaAmount())}t in {this.goalDaysRemaining()} days</h2>
                {goalP}
                {lastUpdateP}
                {statusP}
                <div className="spacer"/>
                <button type="button" className="btn btn-primary" onClick={this.handleSetGoal}>Update Goal</button>
                <button type="button" className="btn btn-primary" onClick={this.handleUpdateEmissions}>Update Emissions</button>
                <button className="btn btn-social btn-twitter" onClick={this.handleTweetGoal}>
                    <span className="fa fa-twitter"></span>
                    Tweet Goal
                </button>
            </BootstrapOverhead>
        )
    }

    // Returns tweet message to be sent in URL to Twitter
    getTweetMessage () {
        var tweet = 'https://twitter.com/intent/tweet?hashtags=WSWP&text='

        tweet = tweet + 'I%20have%20' + this.goalDaysRemaining() +
             '%20days%20to%20reduce%20emissions%20by%20' + 
             this.floatToStr(this.goalDeltaAmount()) + 
             '%20of%20CO₂%20per%20year.'

        return tweet
    }

    // Opens a new window for the user to tweet
    handleTweetGoal (event) {
        window.open(this.getTweetMessage())
    }

    // Returns a different page if the user has no goal set
    noGoalYetFlow() {
        return (
            <BootstrapOverhead>
                <h1>Progress Dashboard</h1>
                <p>No goal yet, set one now!</p>
                <button type="button" className="btn btn-primary" onClick={this.handleSetGoal}>Set Goal</button>
            </BootstrapOverhead>
        )
    }

    floatToStr(float) {
        return float != null ? float.toFixed(0) : ""
    }

    dateToStr(date) {
        return date != null ? date.toLocaleDateString('en-US', {month: 'short', day: '2-digit'}) : ""
    }

    goalDeltaAmount() {
        let currentAmount = 0
        if (this.props.lastCarbonFootprint != null) {
            currentAmount = Number.parseFloat(this.props.lastCarbonFootprint.CalculationTotal)
        }
        return Math.max(currentAmount - this.props.amount, 0)
    }

    goalDaysRemaining() {
        let milisInDay = 1000 * 60 * 60 * 24
        let diff = Math.floor((this.props.deadline - this.todayDate()) / milisInDay)
        return Math.max(diff, 0)
    }

    goalTargetAmount() {
        return this.props.amount
    }

    goalTargetDate() {
        return this.props.deadline
    }

    lastUpdateAmount() {
        if (this.props.lastCarbonFootprint != null) {
            return Number.parseFloat(this.props.lastCarbonFootprint.CalculationTotal)
        }
        else {
            return null
        }
    }

    lastUpdateDate() {
        if (this.props.lastCarbonFootprint != null) {
            return this.props.lastCarbonFootprint.Date
        }
        else {
            return null
        }
    }

    todayDate() {
        let now = new Date()
        return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    }

    handleSetGoal(evt) {
        evt.preventDefault()
        this.props.goToView(VIEWS.goalScreen)
    }

    handleUpdateEmissions(evt) {
        evt.preventDefault()
        this.props.goToView(VIEWS.calculator)
    }

    hasGoal() {
        return this.props.amount != null
    }
}

export default ProgressDashboard
