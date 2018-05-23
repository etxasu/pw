import React from 'react'
import background from '../images/trees_background.jpeg'
import './notifications_screen.scss'
import '../jumbotronStyle.scss'

function intDeltaDays(newerDate, olderDate) {
    let deltaMilis = Math.max(newerDate - olderDate, 0)
    let milisecondsInDay = 1000 * 60 * 60 * 24
    let deltaDays = Math.floor(deltaMilis / milisecondsInDay)
    return deltaDays
}

function dateToDaysAgoStr(date) {
    let deltaDays = intDeltaDays(new Date(), date)
    
    if(deltaDays === 0) {
        return 'today'
    } else {
        return `${deltaDays} days ago`
    }
}

function isOlderThan1Week(date) {
    let deltaDays = intDeltaDays(new Date(), date)

    return deltaDays >= 7
}

function Boilerplate(props) {
    return (
        <div id="main">
            <div className="content">
                <div id="notificationsScreen" className="container pt-3">
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

class NotificationsScreen extends React.Component {
    constructor(props) {
        super(props)

        this.handleClearAll = this.handleClearAll.bind(this)
        this.handleClearOld = this.handleClearOld.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.renderNotifications = this.renderNotifications.bind(this)
    }

    render() {
        if(!this.props.loggedIn) {
            return this.renderNotLoggedIn()
        }

        return this.renderMain()
    }

    componentDidMount() {
        this.refreshTimer = setInterval(this.refreshData.bind(this), 30*1000)
        this.refreshData()
    }

    componentWillUnmount() {
        clearInterval(this.refreshTimer)
    }

    renderMain() {
        return (
            <Boilerplate>
                <h1>Notifications</h1>
                
                <div id="mainButtons">
                    <button type="button" className="btn btn-primary" onClick={this.handleClearAll}>Clear All</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleClearOld}>Clear Old (1 week)</button>
                </div>

                <div id="listItems">
                    {this.renderNotifications()}
                </div>
            </Boilerplate>
        )
    }

    renderNotifications() {
        let items = []

        for (let key in this.props.notifications) {
            let notification = this.props.notifications[key]

            items.push((
                <div className="listItem" key={key}>
                    <button type="button" className="btn btn-primary" onClick={() => this.handleClear(key)}>Clear</button>
                    <div>
                        <p>Challenge — {notification.reductionPercent}% reduction</p>
                        <p>{notification.fromUser} — {dateToDaysAgoStr(notification.issueDate)}</p>
                    </div>
                </div>
            ))
        }

        return items
    }

    renderNotLoggedIn() {
        return (
            <Boilerplate>
                <h1>Notifications</h1>
                <p>Please login to see your notifications</p>
            </Boilerplate>
        )
    }

    handleClearAll() {
        this.clearNotifications(Object.keys(this.props.notifications))
    }

    handleClearOld() {
        let oldIds = new Array()
        for (let key in this.props.notifications) {
            let notification = this.props.notifications[key]
            if (isOlderThan1Week(notification.issueDate)) {
                oldIds.push(key)
            }
        }
        this.clearNotifications(oldIds)
    }

    handleClear(id) {
        this.clearNotifications([id])
    }

    refreshData() {
        this.props.getNotifications()
    }

    clearNotifications(ids) {
        this.props.clearNotifications(ids)
    }
}

export default NotificationsScreen
