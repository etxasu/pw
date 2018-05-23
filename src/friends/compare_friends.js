import React from 'react'
import { Alert } from 'reactstrap'
import { ClipLoader } from 'react-spinners'

import './challenge_friends.scss'
import '../jumbotronStyle.scss'
import background from '../images/trees_background.jpeg'

function Boilerplate(props) {
    return (
        <div id="main">
            <div className="content">
                <div id="compareFriends" className="container pt-3">
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


//let rows = [{'t': 1, 'a': 1, 'b': 1, 'c':1, 'd':1, 'e':1, 'f':1, 'g':1}]

class CompareFriends extends React.Component {
    constructor(props) {
        super(props)

        this.handleBack = this.handleBack.bind(this)
        this.friendCount = this.friendCount.bind(this)
        this.renderMain = this.renderMain.bind(this)
        this.renderError = this.renderError.bind(this)
        this.renderLoading = this.renderLoading.bind(this)

        this.props.getFriendsDetails(this.props.friends.map((item) => (item.name)))
    }

    render() {
        return (
            <Boilerplate>
                <header>
                    <button type="button" className="btn btn-primary" onClick={this.handleBack}>Back</button>
                    <h1>Compare Friends</h1>
                </header>

                <p>Comparing against <strong>{this.friendCount()}</strong> friends. Note: only friends with data are shown</p>
                <hr/>
                <style>
                    {"table{border:1px solid black;width:100%;} td{border-top:1px solid black;border-right:1px solid black; border-left:1px solid black;padding:10px;text-align:center;} tr{padding:10p;text-align:center;}"}
                </style>

                {this.renderError()}
                {this.renderLoading()}
                {this.renderMain()}
                
            </Boilerplate>
        )
    }

    renderMain() {
        if (!this.props.requestingFriendsDetails) {
            return (
                <table>
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <th>Transportation</th>
                            <th>Waste</th>
                            <th>Energy</th>
                            <th>Lifestyle</th>
                            <th># People</th>
                            <th># Years</th>
                            <th>Emissions</th>
                        </tr>
                        {this.props.friendsDetails.map((element) => (
                            <tr key={element.username}>
                                <td>{element.username}</td>
                                <td>{element.transportation}</td>
                                <td>{element.waste}</td>
                                <td>{element.energy}</td>
                                <td>{element.lifestyle}</td>
                                <td>{element.numPeople}</td>
                                <td>{element.numYears}</td>
                                <td>{element.emissions}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
    }

    renderError() {
        if (this.props.requestingFriendsDetailsError) {
            return (
                <Alert color="danger">{this.props.requestingFriendsDetailsError}</Alert>
            )
        }
    }

    renderLoading() {
        if (this.props.requestingFriendsDetails) {
            return (
                <ClipLoader />
            )
        }
    }

    friendCount() {
        return this.props.friends.length
    }


    handleBack() {
        this.props.exitCompare()
    }
}

export default CompareFriends