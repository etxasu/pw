import React from 'react'
import ReactDOM from 'react-dom'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Toolbar from 'material-ui/Toolbar'
import './jumbotronStyle.scss'
import background from './images/trees_background.jpeg'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import { green50 } from 'material-ui/styles/colors'
import { VIEWS } from './app'

class Landing extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="main" style={{backgroundImage: "url(" + background + ")", backgroundSize: "cover"}}>
                <div className="container-fluid pt-3 bg-light">        
                    <h1> We Stand With Paris </h1>
            
                    <p className="text-center pb-3"> A sub-national, grassroots movement of Americans committed to upholding the Paris Agreement </p>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="jumbotron background-tan text-left">
                                <h3> About Us </h3>
                                <p>
                                    We Stand with Paris is a sub-national, grassroots movement of Americans committed
                                    to upholding the Paris Agreement and dedicated to fulfilling our portion of the 
                                    United States’ original commitments.
                                </p>
                                <br/>
                                <p>
                                    We believe the Paris Agreement represents one of the most important global efforts
                                    to address climate change, and that American leadership is vital to its success.  
                                    Furthermore, we believe that taking bold action on climate change and adhering to the
                                    Paris Agreement are in the best interests of the United States, our economy, our health,
                                    our environment, and our global standing in the world. As the world’s second largest
                                    emitter of greenhouse gases--and the largest from a historical perspective--the United
                                    States cannot ethically sit on the sidelines while others work to address this problem.
                                    Will you join us by committing to reduce your carbon footprint?  Will you STAND WITH PARIS?
                                </p>
                                <br/>
                                <label>Take the </label> <a href="#" onClick={(event) => this.props.goToView(VIEWS.agreement)}>pledge! </a>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="jumbotron background-tan text-left">
                                <h3>Why The Paris Agreement?</h3>
                                <p>
                                    In December 2015, leaders from 195 nations gathered in Paris to sign one of the most 
                                    important climate agreements in history. Unlike previous efforts, the Paris Agreement 
                                    was founded on the premise that all nations must play a role in combating global climate 
                                    change. To accomplish this, the agreement relies entirely on voluntary commitments and 
                                    positive peer pressure to achieve greenhouse gas emission reductions. Only two nations 
                                    declined to sign the Paris Agreement, marking an unprecedented level of global cooperation.
                                </p>
                                <br/>
                                <p>
                                    By withdrawing from the Paris Agreement, the United States risks abandoning our leadership 
                                    and moral credibility on the global stage. Fortunately, we can do something about it.  
                                    While the Paris Agreement may be an official pact between sovereign nations, there’s 
                                    nothing stopping a sub-national, grassroots movement of Americans from rising up to 
                                    Stand with Paris. Imagine the powerful statement it would make for thousands—or 
                                    millions—of Americans working together to help achieve our Paris goals!  It’s entirely 
                                    possible, and you can help us get there.
                                </p>
                                <br/>
                                <label>Calculate your carbon footprint</label> <a href="#" onClick={(event) => this.props.goToView(VIEWS.calculator)} >here! </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row ">
                        <div className="col">
                            <div className="jumbotron background-tan text-left">
                                <h3>FAQ</h3>
                                
                                <div>
                                    <div className="row-fluid pt-2">
                                        <MuiThemeProvider>
                                            <Card>
                                                <CardHeader
                                                    title="Why 28%?"
                                                    actAsExpander={true}
                                                    showExpandableButton={true}
                                                    style={{backgroundColor:green50}}
                                                />
                                                <Divider />
                                                <CardText expandable={true}>
                                                    <div className="text-left">
                                                        When the United States signed the Paris Agreement in 2015, the original commitment called 
                                                        for a 26% - 28% reduction in greenhouse gas emissions by 2025.  Most experts believe this 
                                                        commitment falls significantly short of what is needed to limit global warming to a maximum 
                                                        2 degrees Celsius. We’re thus aiming for the high end of that range.  Achieving a 28% 
                                                        reduction in our greenhouse gas emissions thus meets our original commitment under the Paris Agreement.
                                                    </div>
                                                </CardText>
                                            </Card>
                                        </MuiThemeProvider>
                                    </div>
                                    
                                    <div className="row-fluid pt-2">
                                        <MuiThemeProvider>
                                            <Card>
                                                <CardHeader
                                                    title="What’s the difference between the Basic Footprint and the Advanced Footprint?"
                                                    actAsExpander={true}
                                                    showExpandableButton={true}
                                                    style={{backgroundColor:green50}}
                                                />
                                                <Divider />
                                                <CardText expandable={true}>
                                                    <div className="text-left">
                                                        Getting an accurate carbon footprint can be tricky and requires access to information that 
                                                        many people may find hard to obtain, including past utility bills, vehicle mileage information, 
                                                        flights, etc.  And yet accuracy is important for reporting meaningful greenhouse gas emission 
                                                        data.  To strike the balance between simplicity and accuracy, we’ve created two different ways 
                                                        for signatories to calculate their carbon footprint.  The “Basic Footprint” creates a rough 
                                                        estimate based on simple information that you likely already know. It’s not as accurate, but 
                                                        is far simpler for most people.  The “Advanced Footprint” calculator creates a far more accurate 
                                                        summary of your carbon footprint, but requires you to dig a little more deeply into your utility, 
                                                        vehicle, and flight data.
                                                    </div>
                                                </CardText>
                                            </Card>
                                        </MuiThemeProvider>
                                    </div>

                                    <div className="row-fluid pt-2">
                                        <MuiThemeProvider>
                                            <Card>
                                                <CardHeader
                                                    title="What’s significant about November 2020?"
                                                    actAsExpander={true}
                                                    showExpandableButton={true}
                                                    style={{backgroundColor:green50}}
                                                />
                                                <Divider />
                                                <CardText expandable={true}>
                                                    <div className="text-left">
                                                        Because leaving the Paris Agreement requires a waiting period, this is the earliest possible 
                                                        date for official U.S. withdrawal from the agreement. We hope to demonstrate support for the 
                                                        Paris Agreement by achieving the original U.S. target before the United States can officially withdraw. 
                                                    </div>
                                                </CardText>
                                            </Card>
                                        </MuiThemeProvider>
                                    </div>

                                    <div className="row-fluid pt-2">
                                        <MuiThemeProvider>
                                            <Card>
                                                <CardHeader
                                                    title="How does reducing my own carbon footprint help anything?"
                                                    actAsExpander={true}
                                                    showExpandableButton={true}
                                                    style={{backgroundColor:green50}}
                                                />
                                                <Divider />
                                                <CardText expandable={true}>
                                                    <div className="text-left">
                                                        It’s true that one person’s 28% reduction in greenhouse gas emissions has a negligible impact 
                                                        on a global scale.  But thousands or millions of people committed to a unified cause DOES make 
                                                        an impact.  Moreover, our commitments don’t sit in isolation.  By Standing with Paris, we are 
                                                        joining our commitments to those of the other 194 nations still party to the Paris Agreement.  
                                                        In other words, your commitment is part of a network that includes almost every other human being 
                                                        on the planet!  That’s the pathway to a livable future and to climate success. 
                                                    </div>
                                                </CardText>
                                            </Card>
                                        </MuiThemeProvider>
                                    </div>

                                    <div className="row-fluid pt-2">
                                        <MuiThemeProvider>
                                            <Card>
                                                <CardHeader
                                                    title="How can I calculate my greenhouse gas emissions?"
                                                    actAsExpander={true}
                                                    showExpandableButton={true}
                                                    style={{backgroundColor:green50}}
                                                />
                                                <Divider />
                                                <CardText expandable={true}>
                                                    <div className="text-left">
                                                        Don’t worry, we have tools to help you.  Start by visiting our carbon footprint calculator.  
                                                        Ideally you’ll need to gather information from your electric bills, gas bills, heating oil usage, 
                                                        and any other utilities. You’ll also need to calculate or estimate the miles driven on your vehicle(s), 
                                                        as well as other modes of transportation.  Gather the information, then follow the prompts.  
                                                        Once you have your personal data in front of you, it should only take 20-30 minutes to calculate 
                                                        your footprint. If all that sounds too overwhelming, we can help you get rough approximations 
                                                        without the specific info—just use the “Basic Footprint” method.
                                                    </div>
                                                </CardText>
                                            </Card>
                                        </MuiThemeProvider>
                                    </div>

                                    <div className="row-fluid pt-2">
                                        <MuiThemeProvider>
                                            <Card>
                                                <CardHeader
                                                    title="What about other “lifestyle” factors, like food choices and personal purchases?"
                                                    actAsExpander={true}
                                                    showExpandableButton={true}
                                                    style={{backgroundColor:green50}}
                                                />
                                                <Divider />
                                                <CardText expandable={true}>
                                                    <div className="text-left">
                                                        A complete and accurate picture of your personal greenhouse gas emissions should take into 
                                                        account all aspects of your lifestyle, including food choices, goods purchased, services used, 
                                                        etc.  Unfortunately, accounting for these items is extremely complex, and existing carbon 
                                                        footprint calculators vary widely on how to incorporate these numbers into your overall footprint.  
                                                        Because of the difficulty of calculating these items, we have chosen to omit these from our standard 
                                                        Stand with Paris commitments.  Signatories may choose to include these items if you wish, but it is not required.
                                                    </div>
                                                </CardText>
                                            </Card>
                                        </MuiThemeProvider>
                                    </div>

                                    <div className="row-fluid pt-2">
                                        <MuiThemeProvider>
                                            <Card>
                                                <CardHeader
                                                    title="What if I don’t have data about my vehicle usage?"
                                                    actAsExpander={true}
                                                    showExpandableButton={true}
                                                    style={{backgroundColor:green50}}
                                                />
                                                <Divider />
                                                <CardText expandable={true}>
                                                    <div className="text-left">
                                                        Many of us don’t keep information related to how many miles we drive our vehicle(s) each year.  
                                                        Not to worry.  You can estimate this data a number of ways, including looking for mileage information 
                                                        on service records or past oil changes, calculating the difference in mileage between today and 
                                                        when you purchased the vehicle, or tracking your usage for a month then multiplying by 12.  
                                                        Getting exact information is not as important as getting a close approximation.
                                                    </div>
                                                </CardText>
                                            </Card>
                                        </MuiThemeProvider>
                                    </div>

                                    <div className="row-fluid pt-2">
                                        <MuiThemeProvider>
                                            <Card>
                                                <CardHeader
                                                    title="What if I can’t find past utility bills?"
                                                    actAsExpander={true}
                                                    showExpandableButton={true}
                                                    style={{backgroundColor:green50}}
                                                />
                                                <Divider />
                                                <CardText expandable={true}>
                                                    <div className="text-left">
                                                        Call your utility and ask for past bills.  Most utilities provide this information online, 
                                                        and it should be a simple matter of downloading past bills and adding the numbers for 12 months.  
                                                        If your is not available online, call and ask for copies of past bills.  It may even be enough 
                                                        to ask for a single bill from 12 months ago, then to compare that meter reading to a current 
                                                        reading in order to get a full 12-months of data.
                                                    </div>
                                                </CardText>
                                            </Card>
                                        </MuiThemeProvider>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            
                <div>
                        Copyright 2018
                </div>
            </div>
        )
    }
}

export default Landing