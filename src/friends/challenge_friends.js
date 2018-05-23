import React from 'react'
import { ClipLoader } from 'react-spinners'

import './challenge_friends.scss'
import '../jumbotronStyle.scss'
import background from '../images/trees_background.jpeg'

function Boilerplate(props) {
    return (
        <div id="main">
            <div className="content">
                <div id="challengeFriends" className="container pt-3">
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

class ChallengeFriends extends React.Component {
    constructor(props) {
        super(props)

        this.renderStatus = this.renderStatus.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleChallenge = this.handleChallenge.bind(this)

        this.state = {
            reductionText: '20'
        }
    }

    render() {
        return (
            <Boilerplate>
                <header>
                    <button type="button" className="btn btn-primary" onClick={this.handleBack}>Back</button>
                    <h1>Challenge Friends</h1>
                </header>

                <p>Challenging <strong>{this.friendCount()}</strong> friends</p>

                <label htmlFor="reductionText">Carbon footprint reduction (%)</label>
                <input 
                    id="reductionText" 
                    name="reductionText"
                    type="number" 
                    min={0} 
                    max={100} 
                    step={10}
                    className="form-control" 
                    value={this.state.reductionText} 
                    onChange={this.handleInput}
                />

                <footer>
                    {this.renderStatus()}
                </footer>
            </Boilerplate>
        )
    }

    renderStatus() {
        if (this.props.challengingFriends) {
            return (<ClipLoader />)
        }
        else if (this.props.challengingFriendsError) {
            return (
                <div>
                    <div className="alert alert-danger">{this.props.challengingFriendsError}</div>
                    <button type="button" className="btn btn-primary" onClick={this.handleChallenge}>Challenge</button>
                </div>
            )
        }
        else if (this.props.challengedFriends) {
            return (
                <div>
                    <div className="alert alert-success">Successfully issued a challenge!</div>
                    <button type="button" className="btn btn-primary" onClick={this.handleChallenge}>Challenge</button>
                </div>
            )
        }
        else {
            return (
                <button type="button" className="btn btn-primary" onClick={this.handleChallenge}>Challenge</button>
            )
        }
    }

    friendCount() {
        return this.props.friends.length
    }

    handleInput(evt) {
        this.setState({[evt.target.name]: evt.target.value})
    }

    handleBack() {
        this.props.exitChallenge()
    }

    handleChallenge() {
        let reductionPercent = Number.parseInt(this.state.reductionText)

        if(Number.isNaN(reductionPercent)) {
            console.log('challenge_friends: reductionPercent is NaN')
            return
        }

        this.props.attemptChallengeFriends(reductionPercent, this.props.friends)
    }
}

export default ChallengeFriends
