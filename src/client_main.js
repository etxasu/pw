import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from './containers/app_container'
import store from './store'
import { setAuthToken, fulfilledLogin } from './actions/user_actions'

if(location.hash.startsWith('#twitter_login')) {
    // We just came back here from logging-in with Twitter
    // so we need to get an auth token from our server

    var req = new XMLHttpRequest()

    req.addEventListener('load', (evt) => {
        console.log('twitter_login: received ' + req.responseText)
        
        let resBody = JSON.parse(req.responseText)
        
        if(resBody.success === true) {
            setAuthToken(resBody.token)
        }
    })

    req.addEventListener('error', (evt) => {
        console.log('twitter_login: request error')
    })

    let hashSplit = location.hash.split(';')
    let username = ''

    if(hashSplit.length >= 2) {
        username = hashSplit[1]
    }

    let requestBody = {
        username: username
    }

    sessionStorage.setItem('username', username)
    store.dispatch(fulfilledLogin(username))

    req.open('POST', '/auth/get_token_unsecure')
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify(requestBody))
}

window.reduxStore = store

ReactDOM.render(<Provider store={store}>
    <AppContainer />
</Provider>, document.getElementById('root'))
