import React from 'react'
import ReactDOM from 'react-dom'

import CalculatorBasic from './basic'
import CalculatorTransportation from './transportation'
import CalculatorWaste from './waste'
import CalculatorEnergy from './energy'
import CalculatorLifestyle from './lifestyle'

import FootprintFormula from './footprint_formula'
import * as Model from './model'
import Saved from './saved'

import '../jumbotronStyle.scss'
import background from '../images/trees_background.jpeg'


//the different pages to be scrolled through with the next and previous buttons within the step by step calculator
const PAGES = ['basic', 'transport', 'waste', 'energy', 'lifestyle', 'saved']

class CalculatorStepByStep extends React.Component {
    constructor(props) {
        super(props)

        let partialState = {
            pageIdx: 0,
            showingFormulas: false
        }


        this.state = Object.assign(partialState, Model.load())

        this.handleNext = this.handleNext.bind(this)
        this.handlePrevious = this.handlePrevious.bind(this)
        this.handleChildChange = this.handleChildChange.bind(this)
        this.handleShowFormula = this.handleShowFormula.bind(this)
        this.handleHideFormula = this.handleHideFormula.bind(this)
    }

    //the main UI present through all "pages" of the calculator
    //with the current page ui rendered in the middle with the getPage() function
    render() {
        return (
            <div id="main">

                <div className="content">
                    <div className="container-fluid bg-light">
                        <div className="row">
                            <div className="col">
                                <h1>Carbon Footprint Calculator</h1>
                            </div>
                        </div>
                    </div>


                    <div className="container pt-3">

                        <div className="row">
                            <button type="button" className="btn btn-primary" onClick={this.props.showSummary}>Go to summary</button>
                        </div>

                        <div className="row justify-content-center pt-2">
                            <div className="col-md-8">
                                <div className="jumbotron background-tan text-left">
                                    {this.getPage()}

                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn btn-secondary" onClick={this.handlePrevious} disabled={this.getPreviousDisabled()}>Previous</button>
                                        <button type="button" className="btn btn-primary" onClick={this.handleNext} disabled={this.getNextDisabled()}>Next</button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="jumbotron background-tan text-left">
                                    <h2>Result</h2>
                                    {this.getResultText()}
                                    {!this.state.showingFormulas && <button type="button" className="btn btn-info" onClick={this.handleShowFormula}>Show Formulas</button>}
                                    {this.state.showingFormulas && <button type="button" className="btn btn-info" onClick={this.handleHideFormula}>Hide Formulas</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <img src={background} className="bg" alt=""/>

            </div>
        )
    }

    //results for each part of the calculation stored in localStorage
    componentDidUpdate(prevProps, prevState) {
        localStorage.setItem('transport', new FootprintFormula(this.state).transport().toFixed(2))
        localStorage.setItem('waste', new FootprintFormula(this.state).waste().toFixed(2))
        localStorage.setItem('energy', new FootprintFormula(this.state).energy().toFixed(2))
        localStorage.setItem('lifestyle', new FootprintFormula(this.state).lifestyle().toFixed(2))
        localStorage.setItem('total', new FootprintFormula(this.state).total().toFixed(2))
        Model.store(this.state)
    }

    //gets the current page depending on which step the user is on during the calculation
    getPage() {
        let page = PAGES[this.state.pageIdx]

        if(page == 'basic') {
            return <CalculatorBasic parentState={this.state} handleChildChange={this.handleChildChange} />

        } else if(page == 'transport') {
            return <CalculatorTransportation parentState={this.state} handleChildChange={this.handleChildChange} />

        } else if(page == 'waste') {
            return <CalculatorWaste parentState={this.state} handleChildChange={this.handleChildChange} />

        } else if(page == 'energy') {
            return <CalculatorEnergy parentState={this.state} handleChildChange={this.handleChildChange} />

        } else if(page == 'lifestyle') {
            return <CalculatorLifestyle parentState={this.state} handleChildChange={this.handleChildChange} />

        } else if(page == 'saved') {
            return <Saved parentState={this.state} handleChildChange={this.handleChildChange}
                loggedIn={this.props.loggedIn} username={this.props.username}
                requestingAddCarbonFootprint={this.props.requestingAddCarbonFootprint}
                requestingAddCarbonFootprintError={this.props.requestingAddCarbonFootprintError}
                fulfilledAddCarbonFootprint={this.props.fulfilledAddCarbonFootprint}
                addCarbonFootprint={this.props.addCarbonFootprint} />
        }
    }

    //handles the event for the next button in the step by step calculator to change the pageIdx to the next page
    handleNext() {
        this.setState(prevState => ({
            pageIdx: (prevState.pageIdx + 1) % PAGES.length
        }))
    }

    //handles the event for the previous button in the step by step calculator to change the pageIdx to the previous page
    handlePrevious() {
        this.setState(prevState => ({
            pageIdx: prevState.pageIdx == 0 ? PAGES.length - 1 : prevState.pageIdx - 1
        }))
    }

    //handles the showing of the formulas used in calculation
    handleShowFormula(evt) {
        this.setState({showingFormulas: true})
    }

    //handles the hiding of the formulas used in calculation
    handleHideFormula(evt) {
        this.setState({showingFormulas: false})
    }

    //disables the next button when on the last page
    getNextDisabled() {
        return this.state.pageIdx == PAGES.length - 1
    }

    //disables the previous button when on the first page
    getPreviousDisabled() {
        return this.state.pageIdx == 0
    }

    handleChildChange(inputName, value) {
        this.setState({[inputName]: value})
    }

    //contains the formulas used in calculations when showing/hiding formulas
    //renders current carbon footprint results for each part and the grand total as they are calculated
    getResultText() {
        let showFormula = this.state.showingFormulas

        let transFormula = 'Value in tonnes of CO₂ = (52) * (Emissions Factor which depends on mode of transportation) * (distance travelled) / (1000).'
        let wasteFormula = 'Value calculated based on averages which depend on the selected option.'
        let elecFormula = 'Electricity: Value in tonnes of CO₂ =  * (yearly electricity consumption in Kwh) * (electricity emissions factor) / (1000).'
        let fuelFormula = 'Fuel: Value in tonnes of CO₂ = (Number of years selected) * (heat emission factor) * (floor area in m²) * (fuel emissions factor which depends on fuel used) * (36 * 10⁻¹¹).'
        let lifestyleFormula = 'Value calculated based on averages which depend on the selected option.'

        let smallWithBr = (str) => [<small key="1">{str}</small>, <br key="2"/>]

        return (
            <p>
                Transport: {new FootprintFormula(this.state).transport().toFixed(2)} <br/> 
                {showFormula && smallWithBr(transFormula)}

                Waste: {new FootprintFormula(this.state).waste().toFixed(2)} <br/>
                {showFormula && smallWithBr(wasteFormula)}

                Energy: {new FootprintFormula(this.state).energy().toFixed(2)} <br/>
                {showFormula && smallWithBr(elecFormula)}
                {showFormula && smallWithBr(fuelFormula)}

                Lifestyle: {new FootprintFormula(this.state).lifestyle().toFixed(2)} <br/>
                {showFormula && smallWithBr(lifestyleFormula)}

                <br/>Total: {new FootprintFormula(this.state).total().toFixed(2)} tonnes of CO<sub>2</sub>
            </p>
        )
    }
}

export default CalculatorStepByStep
