import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import ReactDOM from 'react-dom'
import Login from './login'
import {VIEWS} from './app'


class NotRegistered extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (

            <div style={center}>
                <MuiThemeProvider>
                    <p className="lead">The user name you entered is not registered. </p>
                    <hr/>
                    <p>Please return to the home page, enter the user-name and password and click Register</p>
                    <p className="lead">
                        <RaisedButton label="Homepage" labelColor="#FFFFFF" backgroundColor="#aed581" style={style} onClick={(event) => this.props.goToView(VIEWS.login)}/>
                    </p>
                </MuiThemeProvider>
            </div>
        )
    }
    static goHome (event) {

    }
}

const center = {
    textAlign: 'center'
}

const style = {
    margin: 15
}

export default NotRegistered