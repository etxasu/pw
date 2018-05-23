import React from 'react'
import { RingLoader } from 'react-spinners'

import background from '../images/trees_background.jpeg'
import './friend_list.scss'
import '../jumbotronStyle.scss'
import AddFriend from './add_friend'
import ChallengeFriends from './challenge_friends'
import CompareFriends from './compare_friends'

function Boilerplate(props) {
    return (
        <div id="main">
            <div className="content">
                <div id="friendList" className="container pt-3">
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

class FriendList extends React.Component {
    constructor(props) {
        super(props)

        this.renderFriends = this.renderFriends.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleRemoveNevermind = this.handleRemoveNevermind.bind(this)
        this.handleRemoveDoIt = this.handleRemoveDoIt.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
        this.handleCheckAll = this.handleCheckAll.bind(this)
        this.handleChallenge = this.handleChallenge.bind(this)
        this.exitAdd = this.exitAdd.bind(this)
        this.exitChallenge = this.exitChallenge.bind(this)
        this.handleCompare = this.handleCompare.bind(this)
        this.exitCompare = this.exitCompare.bind(this)
        this.getSelectedFriends = this.getSelectedFriends.bind(this)

        this.state = this.initialState()
    }

    initialState() {
        return ({
            confirmingRemove: false,
            selection: [],
            isAdding: false,
            isChallenging: false,
            isComparing: false
        })
    }

    refreshData() {
        let self = this
        this.props.getFriends()
    }

    render() {
        if(!this.props.loggedIn) {
            return this.renderNotLoggedIn()
        }

        let selectedFriends = this.getSelectedFriends()
        if (this.state.isAdding) {
            return <AddFriend exitAdd={this.exitAdd} friends={this.props.friends}
                users={this.props.users} attemptAddFriends={this.props.attemptAddFriends} />
        } else if(this.state.isChallenging) {
            return <ChallengeFriends exitChallenge={this.exitChallenge} friends={selectedFriends}
                challengingFriends={this.props.challengingFriends}
                challengingFriendsError={this.props.challengingFriendsError}
                challengedFriends={this.props.challengedFriends}
                attemptChallengeFriends={this.props.attemptChallengeFriends} />
        } else if (this.state.isComparing) {
            return <CompareFriends exitCompare={this.exitCompare} friends={selectedFriends}
                requestingFriendsDetails={this.props.requestingFriendsDetails}
                requestingFriendsDetailsError={this.props.requestingFriendsDetailsError}
                friendsDetails={this.props.friendsDetails}
                getFriendsDetails={this.props.getFriendsDetails} />
        } else {
            return this.renderMain()
        }
    }

    renderMain() {
        return (
            <Boilerplate>
                <h1>Friends</h1>
                
                <div id="mainButtons">
                    <button type="button" className="btn btn-primary" onClick={this.handleAdd}>Add</button>

                    {!this.state.confirmingRemove ? (
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={this.handleRemove} 
                            disabled={this.state.selection.every(x => !x)}>
                            Remove
                        </button>
                    ) : null}

                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={this.handleChallenge} 
                        disabled={this.state.selection.every(x => !x)}>
                        Challenge
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.handleCompare}
                        disabled={this.state.selection.every(x => !x)}>
                        Comparison
                    </button>
                </div>

                {this.state.confirmingRemove ? (
                    <div id="confirmRemove">
                        <span>Remove <strong>{this.nSelected()}</strong> friends?</span>
                        <button type="button" className="btn btn-primary" onClick={this.handleRemoveNevermind}>Nevermind</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleRemoveDoIt}>Do it!</button>
                    </div>
                ) : null}

                <div id="listItems">
                    <div className="form-check" id="allFriendsCheck">
                        <input className="form-check-input" type="checkbox" id="checkAll" ref={x => this.checkAll = x} onChange={this.handleCheckAll}/>
                        <label className="form-check-label" htmlFor="checkAll"><strong>All Friends</strong></label>
                    </div>

                    {this.renderFriends()}
                </div>
            </Boilerplate>
        )
    }

    renderFriends() {
        if (this.props.requestingFriends) {
            return <RingLoader />
        }
        else {
            let items = []

            for (let i in this.props.friends) {
                let friend = this.props.users[this.props.friends[i]]
                let htmlId = 'check_' + i.toString()
                items.push(
                    <div className="form-check" key={i}>
                        <input className="form-check-input" type="checkbox" id={htmlId} name={htmlId} checked={this.state.selection[i]} onChange={this.handleCheck}/>
                        <label className="form-check-label" htmlFor={htmlId}>{friend.name}</label>
                    </div>
                )
            }

            return items
        }
    }

    getSelectedFriends() {
        let friends = []
        for (let i in this.state.selection) {
            if (this.state.selection[i]) {
                let friend = this.props.users[this.props.friends[i]]
                friends.push(friend)
            }
        }
        return friends
    }

    renderNotLoggedIn() {
        return (
            <Boilerplate>
                <h1>Friends</h1>
                <p>Please login to see your friends</p>
            </Boilerplate>
        )
    }

    handleCompare() {
        this.setState({isComparing: true})
    }

    componentDidMount() {
        this.updateCheckAll()
        this.refreshData()
    }

    componentDidUpdate(prevProps, prevState) {
        this.updateCheckAll()
    }

    handleAdd() {
        this.setState({isAdding: true})
    }

    handleRemove() {
        if(this.state.selection.some(x => x)) {
            this.setState({confirmingRemove: true})
        }
    }

    handleRemoveNevermind() {
        this.setState({confirmingRemove: false})
    }

    handleRemoveDoIt() {
        let friendIds = this.getSelectedFriends().map((item) => {return item.id})
        this.props.attemptRemoveFriends(friendIds)
    }

    handleCheck(evt) {
        let idx = Number.parseInt(evt.target.name.split('_')[1])
        this.setState(prevState => {
            prevState.selection[idx] = !prevState.selection[idx]
            return {selection: prevState.selection, confirmingRemove: false}
        })
    }

    handleCheckAll() {
        let len = this.state.selection.length
        let allSelected = this.state.selection.every(x => x)
        if(this.isCheckAllIndeterminate() || allSelected) {
            this.setState({selection: new Array(len).fill(false), confirmingRemove: false})
        } else {
            this.setState({selection: new Array(len).fill(true), confirmingRemove: false})
        }
    }

    handleChallenge() {
        this.setState({isChallenging: true})
    }

    nSelected() {
        return this.state.selection.filter(x => x).length
    }

    updateCheckAll() {
        if(this.checkAll == null) {
            return
        }

        let allSelected = this.state.selection.every(x => x)
        this.checkAll.checked = allSelected && this.state.selection.length > 0
        this.checkAll.indeterminate = this.isCheckAllIndeterminate()
    }

    isCheckAllIndeterminate() {
        let allSelected = this.state.selection.every(x => x)
        return this.state.selection.some(x => x) && !allSelected
    }

    exitAdd() {
        this.setState(this.initialState())
        this.refreshData()
    }

    exitChallenge() {
        this.setState({isChallenging: false})
    }

    exitCompare() {
        this.setState({isComparing: false})
    }
}

export default FriendList
