import React from 'react'
import './leaderboard.scss'
import background from './images/trees_background.jpeg'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'
const axios = require('axios')

function Boilerplate(props) {
    return (
        <div id="main">
            <div className="content">
                <div id="leaderboard" className="container pt-3">
                    <div className="row">
                        <div className="col">
                            <div className="jumbotron background-tan">
                                <h1>Leaderboard</h1>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src={background} className="bg" alt="" />
        </div>
    )
}

class Leaderboard extends React.Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.rowHtml = this.rowHtml.bind(this)
        this.dateToStr = this.dateToStr.bind(this)
        this.numToStr = this.numToStr.bind(this)
        this.relativeEmissions = this.relativeEmissions.bind(this)
        this.displayName = this.displayName.bind(this)
        this.state = {
            popoverClosed: true
        }

        this.props.getLeaderboardData(this.props.username)
    }

    render() {
        if(!this.props.loggedIn) {
            return this.renderNotLoggedIn()
        } else {
            return this.renderMain()
        }
    }

    renderMain() {
        let yourData = this.props.data.find(x => x.isYou)

        if(yourData == null) {
            return (
                <Boilerplate>
                    <p>We couldn't find any emissions data for you. Please enter your info in the calculator</p>
                </Boilerplate>
            )
        }

        let compareEmissions = yourData.emissions

        return (
            <Boilerplate>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Place</th>
                            <th scope="col">Name</th>
                            <th scope="col">Actual Emissions</th>
                            <th scope="col">Relative Emissions</th>
                            <th scope="col">Last Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((x, i) => this.rowHtml(i, x, compareEmissions))}
                    </tbody>
                </table>
            </Boilerplate>
        )
    }

    renderNotLoggedIn() {
        return (
            <Boilerplate>
                <p>Please login to see the leaderboard</p>
            </Boilerplate>
        )
    }

    renderDetails(targetId) {
        return (
            <Popover placement="bottom" isOpen={true} target={targetId}>
                <PopoverHeader>{targetId}</PopoverHeader>
                <PopoverBody>
                    Transportation: {this.props.details.TransportTotal}<br/>
                    Waste: {this.props.details.WasteTotal}<br/>
                    Energy: {this.props.details.EnergyTotal}<br/>
                    Lifestyle: {this.props.details.LifestyleTotal}<br/>
                    Persons: {this.props.details.NumPeople}<br/>
                    Years: {this.props.details.NumYears}<br/>
                    Electricity Use: {this.props.details.ElectricityUse}<br/>
                    Main Fuel: {this.props.details.MainFuel}<br/>
                    Shops Local Produce: {this.props.details.ShopLocalProduce}<br/>
                    Shops Organic Food: {this.props.details.ShopOrganicFood}
                </PopoverBody>
            </Popover>
        )
    }

    toggle(displayName) {
        if (this.state.popoverClosed === false) {
            this.setState({popoverClosed: true})
        } else {
            this.setState({popoverClosed: false})
            let username = displayName === 'You' ? self.props.username : displayName
            this.props.getDetails(username)
        }
    }

    rowHtml(keyVal, rowData, compareEmissions) {
        let rowClass = rowData.isYou ? 'youRow' : ''
        let showDetails = !this.state.popoverClosed && rowData.name == this.props.details.username
            && !this.props.requestingDetails && !this.props.requestingDetailsError
        return (
            <tr key={keyVal} className={rowClass}>
                <th scope="row">#{rowData.place}</th>
                <td>{this.displayName(rowData)}</td>
                <td>{this.numToStr(rowData.emissions)}t CO₂</td>
                <td>{this.relativeEmissions(rowData, compareEmissions)}</td>
                <td>{this.dateToStr(rowData.lastUpdate)}</td>
                <td>
                    <Button onClick={ () => this.toggle(this.displayName(rowData)) }> Details </Button>
                    <div id={this.displayName(rowData)}> </div>
                </td>
                {showDetails ? this.renderDetails(this.displayName(rowData)) : ""}
            </tr>
        )
    }

    dateToStr(date) {
        let thisYear = new Date().getFullYear()
        if (thisYear == date.getFullYear()) {
            return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        }
    }

    numToStr(num) {
        return num.toFixed(1)
    }

    relativeEmissions(rowData, compareEmissions) {
        if (rowData.isYou) {
            return ''

        } else {
            let delta = rowData.emissions - compareEmissions
            let numStr = this.numToStr(delta)
            if (delta > 0) {
                numStr = '+' + numStr
            }

            if (delta < 0) {
                return <strong className="goodText">{numStr}t</strong>
            } else {
                return <strong className="badText">{numStr}t</strong>
            }
        }
    }

    displayName(rowData) {
        if (rowData.isYou) {
            return 'You'
        } else {
            return rowData.name
        }
    }

}

export default Leaderboard
