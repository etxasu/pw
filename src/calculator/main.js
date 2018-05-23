import * as React from 'react'
import CalculatorStepByStep from './stepbystep'
import CalculatorSummary from './summary'
import '../jumbotronStyle.scss'
import background from '../images/trees_background.jpeg'

const VIEWS = {
    stepbystep: Symbol(),
    summary: Symbol()
}

//calculatorMain handles the rendering of either the step by step or the summary style of the calculator

class CalculatorMain extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            view: VIEWS.stepbystep
        }

        this.handleShowStepByStep = this.handleShowStepByStep.bind(this)
        this.handleShowSummary = this.handleShowSummary.bind(this)
    }

    render() {
        if(this.props.loggedIn) {
            return this.renderLoggedIn()
        } else {
            return this.renderNotLoggedIn()
        }
    }

    renderLoggedIn() {
        let stepbystepView = <CalculatorStepByStep showSummary={this.handleShowSummary}
            loggedIn={this.props.loggedIn} username={this.props.username}
            requestingAddCarbonFootprint={this.props.requestingAddCarbonFootprint}
            requestingAddCarbonFootprintError={this.props.requestingAddCarbonFootprintError}
            fulfilledAddCarbonFootprint={this.props.fulfilledAddCarbonFootprint}
            addCarbonFootprint={this.props.addCarbonFootprint} />
        let summaryView = <CalculatorSummary showStepByStep={this.handleShowStepByStep}
            loggedIn={this.props.loggedIn} username={this.props.username}
            requestingAddCarbonFootprint={this.props.requestingAddCarbonFootprint}
            requestingAddCarbonFootprintError={this.props.requestingAddCarbonFootprintError}
            fulfilledAddCarbonFootprint={this.props.fulfilledAddCarbonFootprint}
            addCarbonFootprint={this.props.addCarbonFootprint} />

        if(this.state.view === VIEWS.stepbystep) {
            return stepbystepView

        } else if(this.state.view === VIEWS.summary) {
            return summaryView
        }
    }

    renderNotLoggedIn() {
        return (
            <div id="main">
                <div className="content">
                    <div className="container-fluid bg-light">
                        <div className="row">
                            <div className="col">
                                <h1>Carbon Footprint Calculator</h1>
                                <p>Please login to use the calculator</p>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={background} className="bg" alt=""/>
            </div>
        )
    }

    handleShowStepByStep() {
        this.setState({view: VIEWS.stepbystep})
    }

    handleShowSummary() {
        this.setState({view: VIEWS.summary})
    }
}

export default CalculatorMain
