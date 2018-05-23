const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const crypto = require('crypto')
const OAuth = require("oauth").OAuth

import {url, encrypt} from './globals'
import * as AuthModule from './auth'

export function applyEndpoints(app) {
    app.post('/friends/get_users', getUsers)
    app.post('/friends/get_friends', getFriends)
    app.post('/friends/add_friends', addFriends)
    app.post('/friends/remove_friends', removeFriends)
    app.post('/friends/getDataForFriends', getDataForFriends)
}

// POST /friends/get_users
// Returns a list of all users, for friend-related purposes
// Request body: {}
// Response body: {users:[{username:'', email:''}]}
function getUsers(req, res) {
    let bodyStr = ''
    req.setEncoding('utf8')
    
    req.on('data', (chunk) => {
        bodyStr += chunk
    })

    req.on('end', () => {
        try {
            MongoClient.connect(url, {}, (err, client) => {
                try {
                    if(err != null) {
                        throw err
                    }

                    let db = client.db('testing-carbon-footprint')
                    let col = db.collection('Users')
                    let cursor = col.find({})
                    
                    cursor.toArray((queryErr, documents) => {
                        if(queryErr != null) {
                            console.error(queryErr)
                            res.status(500).json({})
                            client.close(false)
                            return
                        }

                        let responseJson = ({users: documents.map(doc => {
                            return ({
                                username: doc.UserName, 
                                email: doc.Email
                            })
                        })})

                        // console.log('friends/get_users returning: ' + JSON.stringify(responseJson))

                        res.status(200).json(responseJson)

                        client.close(false)
                    })

                } catch(err) {
                    console.error(err)
                    res.status(500).json({})
                }
            })
        } catch(err) {
            console.error(err)
            res.status(500).json({})
        }
    })
}

// POST /friends/get_friends
// Returns a list of usernames which are friends of the given user
// Request body: {auth_token:''}
// Response body: {usernames:['']}
function getFriends(req, res) {
    let bodyStr = ''
    req.setEncoding('utf8')
    
    req.on('data', (chunk) => {
        bodyStr += chunk
    })

    req.on('end', () => {
        try {
            let token = req.get('AUTH')

            MongoClient.connect(url, {}, (err, client) => {
                try {
                    if(err != null) {
                        throw err
                    }

                    AuthModule.useToken(client, token, (err, username) => {
                        if(err != null) {
                            client.close()
                            res.status(500).json({})
                            return
                        }

                        let db = client.db('testing-carbon-footprint')
                        let col = db.collection('friends')
                        let cursor = col.find({mainUsername: username})
                        
                        cursor.toArray((queryErr, documents) => {
                            if(queryErr != null) {
                                console.error(queryErr)
                                res.status(500).json({})
                                client.close(false)
                                return
                            }

                            let responseJson = ({usernames: documents.map(doc => doc.friendUsername)})

                            console.log('friends/get_friends returning: ' + JSON.stringify(responseJson))

                            res.status(200).json(responseJson)

                            client.close(false)
                        })
                    })

                } catch(err) {
                    console.error(err)
                    res.status(500).json({})
                }
            })
        } catch(err) {
            console.error(err)
            res.status(500).json({})
        }
    })
}

// POST /friends/add_friends
// Adds the given usernames as friends of the given user
// Request body: {auth_token:'', friendUsernames:['']}
// Response body: {}
function addFriends(req, res) {
    let bodyStr = ''
    req.setEncoding('utf8')
    
    req.on('data', (chunk) => {
        bodyStr += chunk
    })

    req.on('end', () => {
        try {
            let bodyJson = JSON.parse(bodyStr)

            console.log('friends/add_friends got: ' + JSON.stringify(bodyJson))

            let token = req.get('AUTH')
            let friendUsernames = bodyJson.friendUsernames

            MongoClient.connect(url, {}, (err, client) => {
                try {
                    if(err != null) {
                        throw err
                    }

                    AuthModule.useToken(client, token, (err, username) => {
                        let db = client.db('testing-carbon-footprint')
                        let col = db.collection('friends')
                        let counter = {count: friendUsernames.length}

                        let oneDone = () => {
                            counter.count--
                            if(counter.count === 0) {
                                res.status(200).json({})
                                client.close()
                            }
                        }

                        for(let i = 0; i < friendUsernames.length; i++) {
                            let item = friendUsernames[i]
                            let doc = ({
                                mainUsername: username,
                                friendUsername: item
                            })
        
                            col.insertOne(doc, {}, (opErr, opResult) => {
                                if(opErr != null) {
                                    console.error(opErr)
                                    oneDone()
                                    return
                                }
        
                                if(opResult.insertedCount === 1) {
                                    console.log('friends/add_friends inserted: ' + JSON.stringify(doc))
                                } else {
                                    console.log('friends/add_friends insert failed: ' + JSON.stringify(doc))
                                }

                                oneDone()
                            })
                        }
                    })

                } catch(err) {
                    console.error(err)
                    res.status(500).json({})
                }
            })
        } catch(err) {
            console.error(err)
            res.status(500).json({})
        }
    })
}

// POST /friends/remove_friends
// Removes the given usernames from friends of the given user
// Request body: {auth_token:'', friendUsernames:['']}
// Response body: {}
function removeFriends(req, res) {
    let bodyStr = ''
    req.setEncoding('utf8')
    
    req.on('data', (chunk) => {
        bodyStr += chunk
    })

    req.on('end', () => {
        try {
            let bodyJson = JSON.parse(bodyStr)

            console.log('friends/remove_friends got: ' + JSON.stringify(bodyJson))

            let token = req.get('AUTH')
            let friendUsernames = bodyJson.friendUsernames

            MongoClient.connect(url, {}, (err, client) => {
                try {
                    if(err != null) {
                        throw err
                    }

                    AuthModule.useToken(client, token, (err, username) => {
                        let db = client.db('testing-carbon-footprint')
                        let col = db.collection('friends')
                        let counter = {count: friendUsernames.length}

                        let oneDone = () => {
                            counter.count--
                            if(counter.count === 0) {
                                res.status(200).json({})
                                client.close()
                            }
                        }

                        for(let i = 0; i < friendUsernames.length; i++) {
                            let item = friendUsernames[i]
                            let filter = {mainUsername: username, friendUsername: item}
                            col.deleteOne(filter, {}, (opErr, opResult) => {
                                if(opErr != null) {
                                    console.error(opErr)
                                    oneDone()
                                    return
                                }
        
                                if(opResult.deletedCount === 1) {
                                    console.log('friends/remove_friends deleted: ' + JSON.stringify(filter))
                                } else {
                                    console.log('friends/remove_friends delete failed: ' + JSON.stringify(filter))
                                }
        
                                oneDone()
                            })
                        }
                    })

                } catch(err) {
                    console.error(err)
                    res.status(500).json({})
                }
            })
        } catch(err) {
            console.error(err)
            res.status(500).json({})
        }
    })
}


function getDataForFriends (req, res) {

    let body = ""
    req.setEncoding('utf8')

    req.on('data', function (chunk) {
        body += chunk
    })

    //parse the parameters for inserting in to pledges
    req.on('end', function () {
        console.log(`getDataForFriends got ${body}`)

        try {
            let json = JSON.parse(body)
            let usernames = (json.params.names) //need to query for this username

            MongoClient.connect(url, function(err, db) {
                if (err) {
                    console.error(err)
                    res.status(500).json({})
                    return
                }

                let dbo = db.db("testing-carbon-footprint")
                let query = {UserName: {$in: usernames}, calculations: {$exists: true}}
                let projection = {'_id': 0, 'UserName': 1, 'calculations': 1}

                dbo.collection("Users").find(query, projection).toArray(function(err, result) {
                    if (err) {
                        console.error(err)
                        res.status(500).json({})
                        db.close()
                        return
                    }

                    if (result.length > 0) {
                        let dups = []
                        result = result.filter(function(el) {
                            if (dups.indexOf(el.UserName) === -1) {
                                dups.push(el.UserName)
                                return true
                            }
                            return false
                        })

                        let userCalcs = result.map(userData => {
                            userData.calculations.sort((a, b) => a.valueOf() - b.valueOf())
                            let latest = userData.calculations[userData.calculations.length - 1]
                            return {UserName: userData.UserName, ...latest}
                        })

                        res.status(200).json(userCalcs)

                    } else {
                        console.error('getDataForFriends no results found')
                        res.status(500).json({})
                    }

                    db.close()
                })
            })
        } catch(err) {
            console.error(err)
        }
    })
}

