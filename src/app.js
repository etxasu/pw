import React from 'react'
import Landing from './landing'
import CalculatorContainer from './containers/calculator_container'
import PledgeContainer from './containers/pledge_container'
import LoginContainer from './containers/login_container'
import ChartContainer from './containers/chart_container'
import LeaderboardContainer from './containers/leaderboard_container'
import InvalidPassword from './invalid_password'
import NotRegistered from './not_registered'
import ProgressDashboardContainer from './containers/progress_dashboard_container'
import './navBarStyle.scss'
import logo from './images/earth_white.png'
import GoalContainer from './containers/goal_container'
import Leaderboard from './leaderboard'
import RegisterContainer from './containers/register_container'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import FriendListContainer from './containers/friends_container'
import NotificationsScreenContainer from './containers/notifications_container'

export const VIEWS = {
    landing: Symbol(),
    calculator: Symbol(),
    agreement: Symbol(),
    login: Symbol(),
    chart: Symbol(),
    invalidPassword: Symbol(),
    notRegistered: Symbol(),
    progressDashboard: Symbol(),
    goalScreen: Symbol(),
    leaderboard: Symbol(),
    friends: Symbol(),
    register: Symbol(),
    notifications: Symbol()
}

class App extends React.Component {
    constructor(props) {
        super(props)

        this.handleNavLink = this.handleNavLink.bind(this)
        this.getNavbar = this.getNavbar.bind(this)
        this.goToView = this.goToView.bind(this)

        this.state = {
            view: VIEWS.landing
        }
    }

    render() {
        return [
            this.getNavbar(),
            this.getView()
        ]
    }

    getNavbar() {
        if (this.props.loggedIn) {
            return (
                <div key="navbar" id="navbar">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <a className="navbar-brand" href="#" onClick={evt => this.handleNavLink(VIEWS.landing, evt)}>
                            <img src={logo} width="30" height="30" className="mr-2 img-fluid d-inline align-top" alt="" />
                            We Stand With Paris
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className={this.getClassNameForNavLink(VIEWS.landing)} href="#" onClick={evt => this.handleNavLink(VIEWS.landing, evt)}>Home</a>
                                <a className={this.getClassNameForNavLink(VIEWS.calculator)} href="#" onClick={evt => this.handleNavLink(VIEWS.calculator, evt)}>Calculator</a>
                                <a className={this.getClassNameForNavLink(VIEWS.chart)} href="#" onClick={evt => this.handleNavLink(VIEWS.chart, evt)}>Chart</a>
                                <a className={this.getClassNameForNavLink(VIEWS.agreement)} href="#" onClick={evt => this.handleNavLink(VIEWS.agreement, evt)}>Paris Agreement</a>
                                <a className={this.getClassNameForNavLink(VIEWS.progressDashboard)} href="#" onClick={evt => this.handleNavLink(VIEWS.progressDashboard, evt)}>Progress Dashboard</a>
                                <a className={this.getClassNameForNavLink(VIEWS.leaderboard)} href="#" onClick={evt => this.handleNavLink(VIEWS.leaderboard, evt)}>Leaderboard</a>
                                <a className={this.getClassNameForNavLink(VIEWS.friends)} href="#" onClick={evt => this.handleNavLink(VIEWS.friends, evt)}>Friends</a>
                                <a className={this.getClassNameForNavLink(VIEWS.notifications)} href="#" onClick={evt => this.handleNavLink(VIEWS.notifications, evt)}>Notifications</a>
                                <a className="nav-item nav-link" href="#" onClick={evt => this.logoutConfirm(evt)}>Logout</a>
                                <label id="welcomeLabel"> </label>
                            </div>
                        </div>
                    </nav>
                </div>
            )
        }
        else {
            return (
                <div key="navbar" id="navbar">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <a className="navbar-brand" href="#" onClick={evt => this.handleNavLink(VIEWS.landing, evt)}>
                            <img src={logo} width="30" height="30" className="mr-2 img-fluid d-inline align-top" alt="" />
                            We Stand With Paris
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className={this.getClassNameForNavLink(VIEWS.landing)} href="#" onClick={evt => this.handleNavLink(VIEWS.landing, evt)}>Home</a>
                                <a className="nav-item nav-link" href="#" onClick={evt => this.handleNavLink(VIEWS.login, evt)}>Login/Register</a>
                            </div>
                        </div>
                    </nav>
                </div>
            )
        }
    }

    logoutConfirm() {
        confirmAlert({
            title: 'Log out?',
            message: 'Are you sure you want to log out?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.logout()
                },
                {
                    label: 'No'
                }
            ]
        })
    }

    // logout() {
    //     this.props.logout()
    // }

    getView() {
        if(this.state.view === VIEWS.landing) {
            return <Landing key="view" goToView={this.goToView}/>

        } else if (this.state.view === VIEWS.calculator) {
            return <CalculatorContainer key="view" />

        } else if (this.state.view === VIEWS.agreement) {
            return <PledgeContainer key="view" />

        } else if (this.state.view === VIEWS.login) {
            return <LoginContainer key="view" goToView={this.goToView} />

        } else if (this.state.view === VIEWS.chart) {
            return <ChartContainer key="view" />

        } else if (this.state.view === VIEWS.invalidPassword) {
            return <InvalidPassword key="view" goToView={this.goToView} />

        } else if (this.state.view === VIEWS.notRegistered) {
            return <NotRegistered key="view" goToView={this.goToView} />

        } else if (this.state.view === VIEWS.progressDashboard) {
            return <ProgressDashboardContainer key="view" goToView={this.goToView} />

        } else if (this.state.view === VIEWS.goalScreen) {
            return <GoalContainer key="view" goToView={this.goToView} />

        } else if(this.state.view === VIEWS.leaderboard) {
            return <LeaderboardContainer key="view" goToView={this.goToView}/>

        } else if (this.state.view === VIEWS.friends) {
            return <FriendListContainer key="view" goToView={this.goToView} />

        } else if (this.state.view === VIEWS.register) {
            return <RegisterContainer key="view" goToView={this.goToView} />

        } else if(this.state.view === VIEWS.notifications) {
            return <NotificationsScreenContainer key="view" goToView={this.goToView}/>

        }
    }

    handleNavLink(view, evt) {
        evt.preventDefault()
        this.setState({ view: view })
    }

    getClassNameForNavLink(view) {
        if (this.state.view === view) {
            return 'nav-item nav-link active'
        } else {
            return 'nav-item nav-link'
        }
    }

    goToView(view) {
        this.setState({ view: view })
    }
}

export default App
