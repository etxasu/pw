import React from 'react'
import './add_friend.scss'
import '../jumbotronStyle.scss'
import background from '../images/trees_background.jpeg'

function Boilerplate(props) {
    return (
        <div id="main">
            <div className="content">
                <div id="addFriend" className="container pt-3">
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

class AddFriend extends React.Component {
    constructor(props) {
        super(props)

        this.handleInput = this.handleInput.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleBack = this.handleBack.bind(this)

        this.state = {
            searchText: '',
        }
    }

    componentDidMount() {
        let self = this
    }

    render() {
        return (
            <Boilerplate>
                <header>
                    <button type="button" className="btn btn-primary" onClick={this.handleBack}>Back</button>
                    <h1>Add Friend</h1>
                </header>

                <div className="form-group">
                    <label htmlFor="searchBox">Friend's name or email</label>
                    <input 
                        id="searchBox" 
                        name="searchText" 
                        type="text" 
                        className="form-control" 
                        value={this.state.searchText} 
                        onChange={this.handleInput}
                    />
                </div>

                {this.searchResults()}
            </Boilerplate>
        )
    }

    searchResults() {
        let users = this.searchFriends()

        if(users.length === 0) {
            return <p>No results found</p>

        } else {
            return this.addableFriends(users)
        }
    }

    addableFriends(users) {
        let items = users.map(user => {
            let userId = user.id
            let added = this.props.friends.includes(userId)

            return (
                <div key={userId}>
                    <button 
                        type="button"
                        className="btn btn-primary" 
                        onClick={evt => this.handleAdd(userId, evt)}
                        disabled={added}>
                        {added ? 'Added' : 'Add'}
                    </button>
                    <span>{user.name}</span>
                </div>
            )
        })

        return (
            <div id="addableFriends">
                {items}
            </div>
        )
    }

    searchFriends() {
        let terms = this.state.searchText.split(/\s+/)

        if(terms.length === 0) {
            return []
        }

        return Object.values(this.props.users).filter(friend => {
            return terms.some(term => {
                if(term.length === 0) {
                    return false
                } else {
                    return friend.email.includes(term) || friend.name.includes(term)
                }
            })
        })
    }

    handleInput(evt) {
        this.setState({[evt.target.name]: evt.target.value, justAddedIds: []})
    }

    handleAdd(friendId, evt) {
        evt.preventDefault()

        this.props.attemptAddFriends([friendId])
    }

    handleBack() {
        this.props.exitAdd()
    }
}

export default AddFriend
