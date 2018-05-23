import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PledgeStatus from './pledge_status'
import './jumbotronStyle.scss'
import background from './images/trees_background.jpeg'
import {RaisedButton} from 'material-ui'
import {fulfilledTakePledge} from './actions/pledge_actions'

function Boilerplate(props) {
    return (
        <MuiThemeProvider>
            <div id="main">
                <div className="content">
                    <div className="container pt-3 pb-5">
                        <div className="row justify-content-center">
                            <div className="col">
                                <div className="jumbotron background-tan text-left">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={background} className="bg" alt=""/>
            </div>
        </MuiThemeProvider>
    )
}

class PledgeMain extends React.Component {
    constructor(props) {
        super(props)

        this.savePledge = this.savePledge.bind(this)
        this.renderError = this.renderError.bind(this)
        this.renderMessager = this.renderMessage.bind(this)

        this.props.getPledge()
    }

    // Save to the state the username and full name from pledge signature
    savePledge(name) {
        if (this.props.fulfilledTakePledge) {
            this.props.updatePledge(name)
        }
        else {
            this.props.takePledge(this.props.username, name)
        }
    }

    render() {
        if(this.props.loggedIn) {
            return this.renderMain()
        } else {
            return this.renderNotLoggedIn()
        }
    }

    renderMain() {
        return (
            <Boilerplate>
                <h1>Personal Commitment to the Paris Agreement <sup>[1]</sup></h1>
                <ol>
                    <li>By making this commitment, I agree to support the Paris Agreement as a “non-party stakeholder.” <sup>[2]</sup></li>
                    <li>I agree to join the global effort in “holding the increase in the global average temperature to well below 2°C above pre-industrial levels and pursuing efforts to limit the temperature increase to 1.5°C.”</li>
                    <li>I agree to publicly declare and track progress toward my own personal greenhouse gas reduction goal, using my nation's Nationally Determined Contribution (NDC) as a minimum target for my own efforts. <sup>[3]</sup></li>
                    <li>To the extent that I am able, I will actively support and contribute to other efforts detailed in the Paris Agreement; including, but not limited to: increasing the ambition of my reduction targets over time [Article 4]; enhancing carbon sinks [Article 5]; and contributing to adaptation funds and efforts of my choosing [Article 7].</li>
                    <li>Recognizing that as a “non-party stakeholder” I am particularly equipped to support Article 12 of the Paris Agreement, I will do my best “to enhance climate change education, training, public awareness, public participation and public access to information.”</li>
                </ol>
                {this.renderMessage()}
                <PledgeStatus authorized={this.props.fulfilledTakePledge} pledgeSubmit={(name) => this.savePledge(name)} />
                <br/>
                {this.renderError()}
                <br/>
                <br/>
                <p>[1] The Paris Agreement is a 25-page document downloadable <a href="https://unfccc.int/files/essential_background/convention/application/pdf/english_paris_agreement.pdf.">here</a>.</p>
                <p>[2] The term “non-party stakeholder” refers to sub-national constituents with an unofficial interest in the Paris Agreement. This includes states, municipalities, corporations and, by implication, smaller stakeholders such as individuals and families.</p>
                <p>[3] The American NDC is to reduce GHG emissions by 26-28% by 2025 from a 2005 baseline.   Carbon Brief maintains a nation-by-nation carbon tracker: https://www.carbonbrief.org/paris-2015-tracking-country-climate-pledges</p>
            </Boilerplate>
        )
    }

    renderNotLoggedIn() {
        return (
            <Boilerplate>
                <h1>Paris Agreement</h1>
                <p>Please login to view the Paris Agreement</p>
            </Boilerplate>
        )
    }

    renderError() {
        if (this.props.requestingPledgeError) {
            return (
                <div className="alert alert-danger">
                    {this.props.requestingPledgeError}
                </div>
            )
        }
        else if (this.props.requestingTakePledgeError) {
            return (
                <div className="alert alert-danger">
                    {this.props.requestingTakePledgeError}
                </div>
            )
        }
    }

    renderMessage() {
        let name = this.props.name
        if (this.props.fulfilledTakePledge) {
            return (
                <p>Thanks for your commitment {name}! If you wish, update your pledge name below.</p>
            )
        }
        else {
            return (
                <p>Take the pledge now! Your small commitment can change the future.</p>
            )
        }
    }
}

export default PledgeMain