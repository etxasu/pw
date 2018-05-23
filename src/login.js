import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
const axios = require('axios')
import ReactDOM from 'react-dom'
import { VIEWS } from './app'
import FacebookLogin from 'react-facebook-login'
import '../bower_components/bootstrap-social/bootstrap-social.css'
import twitterImage from './images/sign-in-with-twitter-gray.png'
import './jumbotronStyle.scss'
import background from './images/trees_background.jpeg'
import store from './store'
import { fulfilledLogin } from './actions/user_actions'

var OAuth = require("oauth").OAuth

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }

        this.renderError = this.renderError.bind(this)
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.fbLogin = this.fbLogin.bind(this)
        this.responseFacebook = this.responseFacebook.bind(this)
        this.twitterOAuth = this.twitterOAuth.bind(this)
    }



    render() {


        if (this.props.registering) {
            alert("Thank you for registering, you have been automatically logged in.")
            return (
                <div id="main">
                    {/* <img src={background} className="bg" alt="" /> */}
                    <div className="content">
                        <div className="row justify-content-center pt-2">
                            <div className="col-md-6" >
                                <div className="jumbotron background-tan text-left">
                                    <div id="loginID">
                                        <MuiThemeProvider>
                                            <div style={center}>
                                                <h2>Registration successful.</h2>

                                                <RaisedButton label="Calculate my carbon footprint!" labelColor="#FFFFFF" backgroundColor="#aed581" style={style} onClick={(event) => this.props.goToView(VIEWS.calculator)} />

                                            </div>
                                        </MuiThemeProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={background} className="bg" alt="" />
                </div>
            )
        }


        else if (this.props.loggedIn)
            return (
                // 
                <div id="main">
                    {/* <img src={background} className="bg" alt="" /> */}
                    <div className="content">
                        <div className="row justify-content-center pt-2">
                            <div className="col-md-6" >
                                <div className="jumbotron background-tan text-left">
                                    <div id="loginID">
                                        <MuiThemeProvider>
                                            <div style={center}>
                                                <h2> Logged in as {sessionStorage.getItem("username")}.</h2>

                                                <RaisedButton label="Calculate my carbon footprint!" labelColor="#FFFFFF" backgroundColor="#aed581" style={style} onClick={(event) => this.props.goToView(VIEWS.calculator)} />

                                            </div>
                                        </MuiThemeProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={background} className="bg" alt="" />
                </div>
            )




        else return (
            // 
            <div id="main">
                {/* <img src={background} className="bg" alt="" /> */}
                <div className="content">
                    <div className="row justify-content-center pt-2">
                        <div className="col-md-6" >
                            <div className="jumbotron background-tan text-left">
                                <div id="loginID">
                                    <MuiThemeProvider>
                                        <div style={center}>
                                            <form className="was-validated">
                                                <div className="form-froup">
                                                    <label>Username: </label>
                                                    <TextField
                                                        type="text"
                                                        placeholder="Enter your Username"
                                                        className="form-control"
                                                        style={{ margin: 10, width: 300, background: "white" }}
                                                        onChange={(event, newValue) => this.setState({ username: newValue })}
                                                    />
                                                </div>
                                                <br />
                                                <div className="form-froup">
                                                    <label>Password: </label>
                                                    <TextField
                                                        placeholder="Enter your Password"
                                                        className="form-control"
                                                        style={{ margin: 10, width: 300, background: "white" }}
                                                        type="password"
                                                        onChange={(event, newValue) => this.setState({ password: newValue })}
                                                    />
                                                </div>
                                            </form>
                                            {this.renderError()}
                                            <br />
                                            <RaisedButton label="Login" labelColor="#FFFFFF" backgroundColor="#aed581" style={style} onClick={(event) => this.login(event)} />
                                            <br />
                                            <label>Don't have an account? </label> <a href="#" onClick={(event) => this.props.goToView(VIEWS.register)} >Register! </a>

                                            {/* <RaisedButton label="Register" labelColor="#FFFFFF" backgroundColor="#aed581" style={style} onClick={(event) => this.props.goToView(VIEWS.register)}/> */}

                                            <div>
                                                <FacebookLogin
                                                    appId="130060247813821"
                                                    autoLoad={false}
                                                    fields="id,email,name"
                                                    callback={this.responseFacebook}
                                                    onClick={(event) => this.fbLogin(event)}
                                                    cssClass="btn btn-social btn-facebook"
                                                    icon="fa-facebook" /> <br />

                                                <input className="pt-2" type="image" src={twitterImage} onClick={(event) => this.twitterOAuth(event)} /> <br />

                                                <label id="errorLabel"></label>
                                            </div>

                                        </div>
                                    </MuiThemeProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={background} className="bg" alt="" />
            </div>
        )
    }

    renderError() {
        if (this.props.loggingInError) {
            return (
                <div className="alert alert-danger" role="alert">
                    {this.props.loggingInError}
                </div>
            )
        }
        else if (this.props.registeringError) {
            return (
                <div className="alert alert-danger" role="alert">
                    {this.props.registeringError}
                </div>
            )
        }
    }

    responseFacebook(response) {
        console.log(response)

        var req = new XMLHttpRequest()
        let self = this

        req.addEventListener('load', (evt) => {
            console.log('Login.responseFacebook: received ' + req.responseText)
            
            let resBody = JSON.parse(req.responseText)
            
            if(resBody.success === true) {
                this.props.setAuthToken(resBody.token)
            }
        })

        req.addEventListener('error', (evt) => {
            console.log('Login.responseFacebook: request error')
        })

        let requestBody = {
            username: response.email
        }

        req.open('POST', '/auth/get_token_unsecure')
        req.setRequestHeader('Content-Type', 'application/json')
        req.send(JSON.stringify(requestBody))

        var nameString = response.name
        sessionStorage.setItem("username", response.email)
        sessionStorage.setItem("email", response.email)
        sessionStorage.setItem("fname", nameString.substring(0, nameString.indexOf(" ")))
        sessionStorage.setItem("lname", nameString.substring(nameString.indexOf(" ") + 1, nameString.length))
    }


    login(event) {
        sessionStorage.setItem("username", this.state.username)
        this.props.attemptLogin(this.state.username, this.state.password)
    }


    register(event) {
        // this.props.attemptRegister(this.state.username, this.state.password)
        const self = this
        self.props.goToView(VIEWS.register)

    }

    fbLogin(event) {


        const self = this
        axios.post('/addOrLoginFBUser', {
            params: {
                username: sessionStorage.getItem("username"),
                email: sessionStorage.getItem("email"),
                fname: sessionStorage.getItem("fname"),
                lname: sessionStorage.getItem("lname")
            }
        }).then(function (response) {
            if (response.data === 'Error') {
                document.getElementById("errorLabel").innerHTML = "Error, please try again"

            } else {
                store.dispatch(fulfilledLogin(sessionStorage.getItem("username")))
                self.props.goToView(VIEWS.login)
            }
        }).catch(function (response) {
            console.log("error somewhere")
        })
    }

    // Starts Twitter login
    // Gets Access token from server by POST /twitterAuth
    // Redirects user to twitter login
    twitterOAuth(event) {

        axios.post('/twitterAuth'
        ).then(function (response) {
            if (response.data === 'Error') {
                document.getElementById("errorLabel").innerHTML = "Error, please try again"

            } else {
                window.open('https://api.twitter.com/oauth/authenticate?oauth_token=' + response.data)
            }
        }).catch(function (response) {
            console.log("error with twitterOAuth sign in")
        })

    }

}

const style = {
    margin: 15
}

const labelStyle = {
    color: '#C8C8C8'
}

const center = {
    textAlign: 'center'
}
const left = {
    textAlign: 'left'
}

export default Login