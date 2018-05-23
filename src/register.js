import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ReactDOM from 'react-dom'
import { VIEWS } from './app'
import './jumbotronStyle.scss'
import background from './images/trees_background.jpeg'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fname: '',
            lname: '',
            email: '',
            username: '',
            password: '',
            password2: ''
        }
        this.register = this.register.bind(this)
    }

    register(event) {
        const self = this
        if (this.state.fname == '' || this.state.email == '' || this.state.password == '' || this.state.password2 == '' || this.state.username == '') {
            alert("Please fill all the information")
        } else {
            if (this.state.password == this.state.password2) {
                sessionStorage.setItem("username", this.state.username)
                this.props.attemptRegister(this.state.username, this.state.password, this.state.email, this.state.fname, this.state.lname)
                self.props.goToView(VIEWS.login)
            } else {

                alert("The password confirmation doesn't match")
            }

        }


    }


    render() {
        return (
            <div id="main">
                <div className="content">
                    <div className="row justify-content-center pt-2">
                        <div className="col-md-6" >
                            <div className="jumbotron background-tan text-left">
                                <div style={center}>
                                    <MuiThemeProvider>
                                        <table>
                                            <tr>
                                                <td>
                                                    <label>Username: </label>
                                                </td>

                                                <td>
                                                    <TextField
                                                        className="form-control"
                                                        name='username'
                                                        placeholder='Username'
                                                        value={this.state.username}
                                                        style={{ width: 300, background: "white" }}
                                                        text="test"
                                                        onChange={(event, newValue) => this.setState({ username: newValue })} />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <label>First name: </label>
                                                </td>

                                                <td><TextField
                                                    className="form-control"
                                                    name='First name'
                                                    placeholder='First name'
                                                    value={this.state.fname}
                                                    style={{width: 300, background: "white" }}
                                                    text="test"
                                                    onChange={(event, newValue) => this.setState({ fname: newValue })} />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <label>Last Name: </label>
                                                </td>

                                                <td><TextField
                                                    className="form-control"
                                                    name='Last name'
                                                    placeholder='Last name'
                                                    value={this.state.lname}
                                                    style={{ width: 300, background: "white" }}
                                                    text="test"
                                                    onChange={(event, newValue) => this.setState({ lname: newValue })} />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <label>Email: </label>
                                                </td>
                                                <td>
                                                    <TextField
                                                        className="form-control"
                                                        name='email'
                                                        placeholder='Email'
                                                        value={this.state.email}
                                                        style={{ width: 300, background: "white" }}
                                                        text="test@test.test"
                                                        onChange={(event, newValue) => this.setState({ email: newValue })} />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <label>Password: </label>
                                                </td>
                                                <td>
                                                    <TextField
                                                        className="form-control"
                                                        name='password'
                                                        placeholder='Password'
                                                        type='password'
                                                        style={{ width: 300, background: "white" }}
                                                        value={this.state.password}
                                                        onChange={(event, newValue) => this.setState({ password: newValue })} />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <label>Confirm password: </label>
                                                </td>
                                                <td>
                                                    <TextField
                                                        className="form-control"
                                                        name='confirm password'
                                                        placeholder='Confirm Password'
                                                        type='password'
                                                        style={{ width: 300, background: "white" }}
                                                        value={this.state.password2}
                                                        onChange={(event, newValue) => this.setState({ password2: newValue })} />
                                                </td>
                                            </tr>

                                        </table>
                                        <RaisedButton label="Register" style={style} labelColor="#FFFFFF" backgroundColor="#aed581" onClick={(event) => this.register(event)} />
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
}

const center = {
    textAlign: 'center'
}
const left = {
    textAlign: 'left'
}

const style = {
    margin: 15
}
export default Register