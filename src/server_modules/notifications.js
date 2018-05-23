const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const crypto = require('crypto')
const OAuth = require("oauth").OAuth

import {url, encrypt} from './globals'
import * as AuthModule from './auth'

export function applyEndpoints(app) {
    app.post('/get_notifications', getNotifications)
    app.post('/send_notifications', sendNotifications)
    app.post('/clear_notifications', clearNotifications)
}

// POST /get_notifications
// Returns a list of all notifications for the given user
// Request body: {auth_token:''}
// Response body: {notifications:[{
//      notificationType:'', 
//      reductionPercent:0, 
//      fromUser:'<username>', 
//      issueDate:new Date(), 
//      id:''}]}
function getNotifications(req, res) {
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
                        let db = client.db('testing-carbon-footprint')
                        let col = db.collection('notifications')
                        let cursor = col.find({toUsername: username})
                        
                        cursor.toArray((queryErr, documents) => {
                            if(queryErr != null) {
                                console.error(queryErr)
                                res.status(500).json({})
                                client.close(false)
                                return
                            }

                            let responseJson = ({notifications: documents.map(doc => {
                                return ({
                                    notificationType: doc.notificationType, 
                                    reductionPercent: doc.reductionPercent,
                                    fromUser: doc.fromUsername,
                                    issueDate: doc.issueDate,
                                    id: doc._id
                                })
                            })})

                            // console.log('get_notifications returning: ' + JSON.stringify(responseJson))

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

// POST /send_notifications
// Sends the given notifications
// Request body: {auth_token:'', notifications:[{
//      notificationType:'',
//      reductionPercent:0,
//      issueDate:new Date(),
//      toUsername:''}]}
// Response body: {}
function sendNotifications(req, res) {
    let bodyStr = ''
    req.setEncoding('utf8')
    
    req.on('data', (chunk) => {
        bodyStr += chunk
    })

    req.on('end', () => {
        try {
            let bodyJson = JSON.parse(bodyStr)

            console.log('send_notification got: ' + JSON.stringify(bodyJson))

            let token = req.get('AUTH')
            let notifications = bodyJson.notifications

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
                        let col = db.collection('notifications')
                        let counter = {count: notifications.length}

                        let oneDone = () => {
                            counter.count--
                            if(counter.count === 0) {
                                res.status(200).json({})
                                client.close()
                            }
                        }

                        for(let i = 0; i < notifications.length; i++) {
                            let item = notifications[i]
                            let doc = ({
                                notificationType: item.notificationType,
                                reductionPercent: item.reductionPercent,
                                fromUsername: username,
                                issueDate: item.issueDate,
                                toUsername: item.toUsername
                            })
        
                            col.insertOne(doc, {}, (opErr, opResult) => {
                                if(opErr != null) {
                                    console.error(opErr)
                                    oneDone()
                                    return
                                }
        
                                if(opResult.insertedCount === 1) {
                                    console.log('send_notification inserted: ' + JSON.stringify(doc))
                                } else {
                                    console.log('send_notification insert failed: ' + JSON.stringify(doc))
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

// POST /clear_notifications
// Clears the given notifications by ID
// Request body: {ids:['']}
// Response body: {}
function clearNotifications(req, res) {
    let bodyStr = ''
    req.setEncoding('utf8')
    
    req.on('data', (chunk) => {
        bodyStr += chunk
    })

    req.on('end', () => {
        try {
            let bodyJson = JSON.parse(bodyStr)

            console.log('clear_notification got: ' + JSON.stringify(bodyJson))

            let ids = bodyJson.ids

            MongoClient.connect(url, {}, (err, client) => {
                try {
                    if(err != null) {
                        throw err
                    }

                    let db = client.db('testing-carbon-footprint')
                    let col = db.collection('notifications')
                    let counter = {count: ids.length}

                    let oneDone = () => {
                        counter.count--
                        if(counter.count === 0) {
                            res.status(200).json({})
                            client.close()
                        }
                    }

                    for(let i = 0; i < ids.length; i++) {
                        let id = ids[i]
                        col.deleteOne({_id: new ObjectID(id)}, {}, (opErr, opResult) => {
                            if(opErr != null) {
                                console.error(opErr)
                                oneDone()
                                return
                            }
    
                            if(opResult.deletedCount === 1) {
                                console.log('clear_notification deleted: ' + id)
                            } else {
                                console.log('clear_notification delete failed: ' + id)
                            }
    
                            oneDone()
                        })
                    }

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
