const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const crypto = require('crypto')
const OAuth = require("oauth").OAuth

import {url, encrypt} from './globals'

export function applyEndpoints(app) {
    app.get('/addTwitterUser', addTwitterUser)
    app.post('/twitterAuth', twitterAuth)
}

// Twitter OAuth created with reference from:
// https://github.com/ciaranj/node-oauth/blob/master/examples/twitter-example.js

// initialize oauth
var twitterOAuth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'ZP2Ny6zpJeJkDzIN1yZ6gU0v4',   
    'bFEH4nE9dkXkylltEypi3b7FEijaX8qmF6qCVkQfGOxUwOlCOP',
    '1.0',
    'http://localhost:3000/addTwitterUser',
    'HMAC-SHA1'
)

// Stores Twitter username into the database if does not exist
function storeTwitterUser (userData) {

    let userName = userData.screen_name

    MongoClient.connect(url, function(err, db) {
        if (err) throw err

        let dbo = db.db("testing-carbon-footprint")
        let query = { UserName: userName }

        dbo.collection("Users").find(query).toArray(function(err, result) {
            if (err) throw err

            if(userName === null){
                console.log("Error getting username from Twitter data")
            } else if (result.length === 0) {
                let myobj = {UserName: userName, TransportTotal:0,
                    WasteTotal:0, EnergyTotal: 0, LifestyleTotal:0, CalculationTotal:0}

                dbo.collection("Users").insertOne(myobj, function (err, res) {
                    if (err) throw err
                    console.log("Successfully inserted: " + userName)
                })
            } else {
                console.log("Found user in database: " + userName)
            }
            db.close()
        })
    })

}

// GET /addTwitterUser
// Redirect from Twitter
// Takes Request token and gets access token from Twitter
// Gets user credentials with token, stores username, and redirects user to homepage
function addTwitterUser(req, res) {
    console.log("Attempting to add new twitter user ... ")

    twitterOAuth.getOAuthRequestToken(function (error, oAuthToken, oAuthTokenSecret, results) {
        if (error) {
            console.log(error)
        } else {
            twitterOAuth.getOAuthAccessToken(req.query.oauth_token, oAuthTokenSecret,
                req.query.oauth_verifier,
                function (error, oAuthAccessToken, oAuthAccessTokenSecret, results){
                    twitterOAuth.get('https://api.twitter.com/1.1/account/verify_credentials.json',
                        oAuthAccessToken,
                        oAuthAccessTokenSecret,
                        function (error, response, result) {
                            if (error) {
                                console.log(error)
                            } else {
                                try {
                                    var user = JSON.parse(response)
                                    storeTwitterUser(user)
                                    res.redirect('/static/index.html#twitter_login;' + user.screen_name)
                                } catch (error) {
                                    console.log("Error parsing twitter user data response")
                                }
                            }
                        })
                }
            )
        }
    })
    
}

// GET /twitterAuth
// Gets request token from twitter to be able to start the Twitter login
function twitterAuth(req, res) {
    console.log("twitter authentication")

    // get request token from twitter
    twitterOAuth.getOAuthRequestToken(function (error, oAuthToken, oAuthTokenSecret, results) {
        if (error) {
            console.log(error)
        } else {
            console.log("request token confirmed: " + results.oauth_callback_confirmed)

            res.send(oAuthToken)
        }
    })

}
