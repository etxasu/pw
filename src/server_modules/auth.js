const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const crypto = require('crypto')
const OAuth = require("oauth").OAuth

import {url, encrypt} from './globals'

// Applies endpoints to Express app
export function applyEndpoints(app) {
    app.post('/auth/get_token', getAuthToken)
    app.post('/auth/get_token_unsecure', getAuthTokenUnsecure)
    app.post('/auth/test', authTest)
}

// Resolves auth token to username
// callback(err, username)
export function useToken(dbClient, token, callback) {
    let db = dbClient.db('testing-carbon-footprint')
    let filter = {_id: new ObjectID(token)}
    db.collection('auth_tokens').findOne(filter, (err, findResult) => {
        if(err != null) {
            console.log(err)
            callback(err, null)
        } else {
            callback(null, findResult.username)
        }
    })
}

// POST /auth/get_token
// Performs authentication and returns an auth token if successful
// Request body: {username:'', password:''}
// Response body: {success:false, token:''}
function getAuthToken(req, res) {
    endpointBoilerplate(req, res, (reqBody, dbClient, db) => {
        let username = reqBody.username != null ? reqBody.username : ''
        let password = reqBody.password != null ? encrypt(reqBody.password) : ''
        let filter = {UserName: reqBody.username, Password: password}

        db.collection('Users').find(filter).toArray((findErr, findResult) => {
            if(findErr != null) {
                handleError(req, res, findErr)
                dbClient.close()
                return
            }

            if(findResult.length > 0) {
                db.collection('auth_tokens').insertOne({username: username}, null, (insertErr, insertResult) => {
                    if(insertErr != null) {
                        handleError(req, res, insertErr)
                        dbClient.close()
                        return
                    }

                    if(insertResult.insertedCount === 1) {
                        let tokenId = insertResult.insertedId.toHexString()
                        res.status(200).json({success: true, token: tokenId})
                    } else {
                        handleError(req, res, 'auth.getAuthToken: Expected insertedCount to be 1')
                    }

                    dbClient.close()
                })
            } else {
                res.status(200).json({success: false, token: ''})
                dbClient.close()
            }
        })
    })
}

// POST /auth/get_token_unsecure
// Performs unsecure authentication and returns an auth token if successful
// Request body: {username:''}
// Response body: {success:false, token:''}
function getAuthTokenUnsecure(req, res) {
    endpointBoilerplate(req, res, (reqBody, dbClient, db) => {
        let username = reqBody.username != null ? reqBody.username : ''
        let filter = {UserName: reqBody.username}

        db.collection('Users').find(filter).toArray((findErr, findResult) => {
            if(findErr != null) {
                handleError(req, res, findErr)
                dbClient.close()
                return
            }

            if(findResult.length > 0) {
                db.collection('auth_tokens').insertOne({username: username}, null, (insertErr, insertResult) => {
                    if(insertErr != null) {
                        handleError(req, res, insertErr)
                        dbClient.close()
                        return
                    }

                    if(insertResult.insertedCount === 1) {
                        let tokenId = insertResult.insertedId.toHexString()
                        res.status(200).json({success: true, token: tokenId})
                    } else {
                        handleError(req, res, 'auth.getAuthTokenUnsecure: Expected insertedCount to be 1')
                    }

                    dbClient.close()
                })
            } else {
                res.status(200).json({success: false, token: ''})
                dbClient.close()
            }
        })
    })
}

// POST /auth/test
// Tests authentication by taking auth token and returning username
// Request body: {token:''}
// Response body: {username:''}
function authTest(req, res) {
    endpointBoilerplate(req, res, (reqBody, dbClient, db) => {
        useToken(dbClient, reqBody.token, (err, username) => {
            if(err != null) {
                res.status(500).send({})
            } else {
                res.status(200).send({username: username})
            }
        })
    })
}

function handleError(req, res, err) {
    console.error(err)
    res.status(500).send({})
}

function parseReqJsonBody(req, res, callback) {
    let bodyStr = ''
    req.setEncoding('utf8')
    
    req.on('data', (chunk) => {
        bodyStr += chunk
    })

    req.on('end', () => {
        try {
            let bodyJson = JSON.parse(bodyStr)
            callback(bodyJson)

        } catch(err) {
            handleError(req, res, err)
        }
    })

    req.on('error', (err) => {
        handleError(req, res, err)
    })
}

function connectToDb(req, res, callback) {
    MongoClient.connect(url, {}, (err, client) => {
        try {
            if(err != null) {
                throw err
            }

            let db = client.db('testing-carbon-footprint')
            callback(client, db)

        } catch(err) {
            handleError(req, res, err)
            client.close()
        }
    })
}

function endpointBoilerplate(req, res, callback) {
    parseReqJsonBody(req, res, (reqBody) => {
        connectToDb(req, res, (dbClient, db) => {
            callback(reqBody, dbClient, db)
        })
    })
}
