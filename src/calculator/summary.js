import React from 'react'
import * as Model from './model'
import * as Util from './util'
import FootprintFormula from './footprint_formula'
import style from '../jumbotronStyle.scss'
import background from '../images/trees_background.jpeg'
import Saved from './saved'

import {Card, CardHeader, CardText} from 'material-ui/Card'
import { MuiThemeProvider } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import { blueGrey50 } from 'material-ui/styles/colors'


//this view can be displayed when the button "Go to summary" is clicked while on any 
//section of the step by step calculator
class CalculatorSummary extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.newState()

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleShowFormula = this.handleShowFormula.bind(this)
        this.handleHideFormula = this.handleHideFormula.bind(this)
        this.onBasicExpandChange = this.onBasicExpandChange.bind(this)
        this.onTransportationExpandChange = this.onTransportationExpandChange.bind(this)
        this.onWasteExpandChange = this.onWasteExpandChange.bind(this)
        this.onEnergyExpandChange = this.onEnergyExpandChange.bind(this)
        this.onLifestyleExpandChange = this.onLifestyleExpandChange.bind(this)
        this.handleSummaryFinish = this.handleSummaryFinish.bind(this)

        //starts with the basic part displayed
        this.state.showingBasic = true
        this.state.showingTransportation = false
        this.state.showingWaste = false
        this.state.showingEnergy = false
        this.state.showingLifestyle = false
        this.state.page = 'summary'

    }

    //the UI for the summary page contains expandable cards and dividers to show the information entered
    //on a single page for convenience
    render() {
        if (this.state.page == 'saved') {

            return (

                <div id="main">
                    <div className="content">

                        <div className="container-fluid bg-light">
                            <div className="row">
                                <div className="col">
                                    <h1>Carbon Footprint Calculator Summary</h1>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <div className="container pt-3" style={{overflowY:"auto"}}>
                                <div className="row justify-content-center pt-2">
                                    <div className="col jumbotron background-tan">
                
                                        <Saved 
                                            parentState={this.state} handleChildChange={this.handleChildChange}
                                            loggedIn={this.props.loggedIn} username={this.props.username}
                                            requestingAddCarbonFootprint={this.props.requestingAddCarbonFootprint}
                                            requestingAddCarbonFootprintError={this.props.requestingAddCarbonFootprintError}
                                            fulfilledAddCarbonFootprint={this.props.fulfilledAddCarbonFootprint}
                                            addCarbonFootprint={this.props.addCarbonFootprint} />

                                    </div>
                               
                                </div>
                            </div>
                        </div>

                    </div>

                    <img src={background} className="bg" alt=""/>

                </div>)

        } else {  
            return (
                <div id="main">
                    <div className="content">

                        <div className="container-fluid bg-light">
                            <div className="row">
                                <div className="col">
                                    <h1>Carbon Footprint Calculator Summary</h1>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <div className="container pt-3" style={{overflowY:"auto"}}>

                                <div className="row">
                                    <button type="button" className="btn btn-primary" onClick={this.props.showStepByStep}>Go to step-by-step</button>
                                </div>
                                <div className="row justify-content-center pt-2">
                                    <div className="col jumbotron background-tan">

                                        <div className="row-fluid pb-2">
                                            <MuiThemeProvider>
                                                <Card style={{backgroundColor:blueGrey50}}
                                                    initiallyExpanded={true}
                                                    expanded={this.state.showingBasic}
                                                    onExpandChange={this.onBasicExpandChange}>
                                                    <CardHeader
                                                        title="Basic"
                                                        actAsExpander={true}
                                                        showExpandableButton={true}
                                                    />
                                                    <Divider />
                                                    <CardText expandable={true}>
                                                        <div id="basic" className="text-left">
                                                            {this.getFieldView(Model.FIELDS[0])}
                                                            {this.getFieldView(Model.FIELDS[1])}
                                                        </div>
                                                    </CardText>
                                                </Card>
                                            </MuiThemeProvider>
                                        </div>

                                        <div className="row-fluid pb-2">
                                            <MuiThemeProvider>
                                                <Card style={{backgroundColor:blueGrey50}}
                                                    expanded={this.state.showingTransportation}
                                                    onExpandChange={this.onTransportationExpandChange}>
                                                    <CardHeader
                                                        title="Transportation"
                                                        actAsExpander={true}
                                                        showExpandableButton={true}
                                                    />
                                                    <Divider />
                                                    <CardText expandable={true}>
                                                        <div id="transportation" className="text-left">
                                                            {this.getFieldView(Model.FIELDS[2])}
                                                            {this.getFieldView(Model.FIELDS[3])}
                                                            {this.getFieldView(Model.FIELDS[4])}
                                                            {this.getFieldView(Model.FIELDS[5])}
                                                            {this.getFieldView(Model.FIELDS[6])}
                                                            {this.getFieldView(Model.FIELDS[7])}
                                                            {this.getFieldView(Model.FIELDS[8])}
                                                            {this.getFieldView(Model.FIELDS[9])}
                                                        </div>
                                                    </CardText>
                                                </Card>
                                            </MuiThemeProvider>
                                        </div>

                                        <div className="row-fluid pb-2">
                                            <MuiThemeProvider>
                                                <Card style={{backgroundColor:blueGrey50}}
                                                    expanded={this.state.showingWaste}
                                                    onExpandChange={this.onWasteExpandChange}>
                                                    <CardHeader
                                                        title="Waste"
                                                        actAsExpander={true}
                                                        showExpandableButton={true}
                                                    />
                                                    <Divider />
                                                    <CardText expandable={true}>
                                                        <div id="waste" className="text-left">
                                                            {this.getFieldView(Model.FIELDS[10])}
                                                        </div>
                                                    </CardText>
                                                </Card>
                                            </MuiThemeProvider>
                                        </div>

                                        <div className="row-fluid pb-2">
                                            <MuiThemeProvider>
                                                <Card style={{backgroundColor:blueGrey50}}
                                                    expanded={this.state.showingEnergy}
                                                    onExpandChange={this.onEnergyExpandChange}>
                                                    <CardHeader
                                                        title="Energy"
                                                        actAsExpander={true}
                                                        showExpandableButton={true}
                                                    />
                                                    <Divider />
                                                    <CardText expandable={true}>
                                                        <div id="energy" className="text-left">
                                                            {this.getFieldView(Model.FIELDS[11])}
                                                            {this.getFieldView(Model.FIELDS[12])}
                                                            {this.getFieldView(Model.FIELDS[13])}
                                                            {this.getFieldView(Model.FIELDS[14])}
                                                            {this.getFieldView(Model.FIELDS[15])}
                                                        </div>
                                                    </CardText>
                                                </Card>
                                            </MuiThemeProvider>
                                        </div>

                                        <div className="row-fluid pb-2">
                                            <MuiThemeProvider>
                                                <Card style={{backgroundColor:blueGrey50}}
                                                    expanded={this.state.showingLifestyle}
                                                    onExpandChange={this.onLifestyleExpandChange}>
                                                    <CardHeader
                                                        title="Lifestyle"
                                                        actAsExpander={true}
                                                        showExpandableButton={true}
                                                    />
                                                    <Divider />
                                                    <CardText expandable={true}>
                                                        <div id="lifestyle" className="text-left">
                                                            
                                                            {this.getFieldView(Model.FIELDS[16])}
                                                            {this.getFieldView(Model.FIELDS[17])}
                                                            {this.getFieldView(Model.FIELDS[18])}
                                                        </div>
                                                    </CardText>
                                                </Card>
                                            </MuiThemeProvider>
                                        </div>

                                        <div>
                                            <button type="button" className="btn btn-primary" onClick={this.handleSummaryFinish} >Update Carbon Footprint</button>
                                        </div>

                                    </div>

                                    <div className="col">
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

                    </div>

                    <img src={background} className="bg" alt=""/>

                </div>
            )
        }
    }

    componentDidUpdate(prevProps, prevState) {
        Model.store(this.state)
    }

    getFieldView(field) {
        return (
            <div key={field.id}>
                <span>{field.text}</span>
                {Util.inputForField(field.id, this.state, this.handleInputChange)}
            </div>
        )
    }

    newState() {
        return Model.load()
    }

    handleInputChange(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    handleShowFormula(evt) {
        this.setState({showingFormulas: true})
    }

    handleHideFormula(evt) {
        this.setState({showingFormulas: false})
    }

    // Handles updating the user's carbon footprint on the server
    handleSummaryFinish(evt) {

        this.setState({page: 'saved'})

    }

    //same as in step by step, the results for each part of the calculation will show on the side
    //and the information about formulas can also be toggled to show or hide
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

    //handling the expanding of each sections so that when that specific part is showing, all others are collapsed
    onBasicExpandChange (expanded) {

        this.setState({
            showingBasic: Boolean(expanded),
            showingTransportation: false,
            showingWaste: false,
            showingEnergy: false,
            showingLifestyle: false
        })

    }

    //handling the expanding of each sections so that when that specific part is showing, all others are collapsed
    onTransportationExpandChange (expanded) {

        this.setState({
            showingBasic: false,
            showingTransportation: Boolean(expanded),
            showingWaste: false,
            showingEnergy: false,
            showingLifestyle: false
        })

    }

    //handling the expanding of each sections so that when that specific part is showing, all others are collapsed
    onWasteExpandChange (expanded) {

        this.setState({
            showingBasic: false,
            showingTransportation: false,
            showingWaste: Boolean(expanded),
            showingEnergy: false,
            showingLifestyle: false
        })

    }

    //handling the expanding of each sections so that when that specific part is showing, all others are collapsed
    onEnergyExpandChange (expanded) {

        this.setState({
            showingBasic: false,
            showingTransportation: false,
            showingWaste: false,
            showingEnergy: Boolean(expanded),
            showingLifestyle: false
        })

    }

    //handling the expanding of each sections so that when that specific part is showing, all others are collapsed
    onLifestyleExpandChange (expanded) {

        this.setState({
            showingBasic: false,
            showingTransportation: false,
            showingWaste: false,
            showingEnergy: false,
            showingLifestyle: Boolean(expanded)
        })

    }

}

export default CalculatorSummary
