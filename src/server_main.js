const config = require('config')
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const crypto = require('crypto')
const OAuth = require("oauth").OAuth

import {url, encrypt} from './server_modules/globals'
import * as FriendsModule from './server_modules/friends'
import * as NotificationsModule from './server_modules/notifications'
import * as TwitterModule from './server_modules/twitter'
import * as AuthModule from './server_modules/auth'

const app = express()

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.redirect('/static/index.html')
})

app.post('/login', (req, res) => {
    res.redirect('/static/index.html')
})

app.get('/api', (req, res) => {
    res.json({ msg: 'hello from carbon footprint app!' })
})

app.post('/addUser', (req, res) => {
    console.log("Attempting to add new user ... ")

    let body = ""

    req.on('data', function (chunk) {
        body += chunk
    })

    req.on('end', function () {
        let json = JSON.parse(body)
        let userName = json.params.username
        let password = encrypt(json.params.password)
        let fname = json.params.fname
        let lname = json.params.lname
        let email = json.params.email

        MongoClient.connect(url, function (err, db) {
            if (err) throw err

            let dbo = db.db("testing-carbon-footprint")
            let query = { UserName: userName }

            dbo.collection("Users").find(query).toArray(function (err, result) {
                if (err) throw err

                if (result.length === 0) {
                    let myobj = {
                        UserName: userName, Password: password, Email: email, FirstName: fname, LastName: lname, isRegister: true
                    }

                    dbo.collection("Users").insertOne(myobj, function (err, res) {
                        if (err) throw err
                        console.log("Successfully inserted")

                    })
                    res.send('OK-' + userName)
                } else {
                    res.send("Duplicate")
                }
                db.close()
            })
        })
    })
})


app.post('/attemptLogin', (req, res) => {

    let body = ""

    req.on('data', function (chunk) {
        body += chunk
    })

    req.on('end', function () {
        //get the login parameters passed
        let json = JSON.parse(body)
        let userName = json.params.username
        let password = encrypt(json.params.password)

        //connect to the DB
        MongoClient.connect(url, function (err, db) {
            if (err) throw err

            let dbo = db.db("testing-carbon-footprint")
            let query = { UserName: userName, 'Password': { $exists: true } }

            //query for the username that was entered
            dbo.collection("Users").find(query).toArray(function (err, result) {
                if (err) throw err

                //check if an account existed for that username
                if (result.length > 0) {
                    if (password === result[0]['Password']) {
                        //passwords match, send an OK message back
                        res.send('OK-' + userName)
                    } else {
                        //passwords didnt match, send an invalid password message
                        res.send('INVALID_PASS')
                    }
                } else {
                    //username wasnt found, send invalid user message
                    res.send("INVALID_USER")
                }
                db.close()
            })
        })
    })
})

app.post('/addOrLoginFBUser', (req, res) => {
    console.log("Attempting to login with facebook or add new facebook user ... ")

    let body = ""

    req.on('data', function (chunk) {
        body += chunk
    })

    req.on('end', function () {
        let json = JSON.parse(body)
        let userName = json.params.username
        let email = json.params.email
        let fname = json.params.fname
        let lname = json.params.lname

        MongoClient.connect(url, function (err, db) {
            if (err) throw err

            let dbo = db.db("testing-carbon-footprint")
            let query = { UserName: userName }

            dbo.collection("Users").find(query).toArray(function (err, result) {
                if (err) throw err

                if (userName === null) {
                    res.send("Error")
                }
                else if (result.length === 0) {
                    let myobj = {
                        UserName: userName, Email: email, FirstName: fname, LastName: lname
                    }

                    dbo.collection("Users").insertOne(myobj, function (err, res) {
                        if (err) throw err
                        console.log("Successfully inserted")
                    })
                    res.send('OK-' + userName)
                }
                else {
                    res.send("OK")
                }
                db.close()
            })
        })
    })
})


app.post('/saveCalculation', (req, res) => {

    let body = ""

    req.on('data', function (chunk) {
        body += chunk
    })

    req.on('end', function () {


        let json = JSON.parse(body)

        let authToken = req.get('AUTH')
        console.log(authToken)

        if (authToken === '' || authToken == null) {
            res.send('no-token')
        } 
        else {
            let updateData = {}
            updateData.calculations = {}
            updateData.calculations['Date'] = new Date()
            updateData.calculations['TransportTotal'] = json.params.transport
            updateData.calculations['WasteTotal'] = json.params.waste
            updateData.calculations['EnergyTotal'] = json.params.energy
            updateData.calculations['LifestyleTotal'] = json.params.lifestyle
            updateData.calculations['CalculationTotal'] = json.params.calculation
            updateData.calculations['NumPeople'] = json.params.num_people
            updateData.calculations['NumYears'] = json.params.num_years
            updateData.calculations['DistUnits'] = json.params.dist_units
            updateData.calculations['CarType'] = json.params.car_type
            updateData.calculations['CarDist'] = json.params.car_dist
            updateData.calculations['MotorcycleDist'] = json.params.motorcycle_dist
            updateData.calculations['IntercityRailDist'] = json.params.intercity_rail_dist
            updateData.calculations['BusDist'] = json.params.bus_dist
            updateData.calculations['CommuterRailDist'] = json.params.commuter_rail_dist
            updateData.calculations['TramDist'] = json.params.tram_dist
            updateData.calculations['RecyclingAmount'] = json.params.recycling_amount
            updateData.calculations['KnowElectricityUse'] = json.params.know_electricity_use
            updateData.calculations['ElectricityUse'] = json.params.electricity_use
            updateData.calculations['MainFuel'] = json.params.main_fuel
            updateData.calculations['AreaUnits'] = json.params.area_units
            updateData.calculations['HouseFloorArea'] = json.params.house_floor_area
            updateData.calculations['Diet'] = json.params.diet
            updateData.calculations['ShopLocalProduce'] = json.params.shop_local_produce
            updateData.calculations['ShopOrganicFood'] = json.params.shop_organic_food


            //connect to the DB
            MongoClient.connect(url, function (err, db) {
                if (err) throw err

                AuthModule.useToken(db, authToken, (err, username) => {
                    if(err != null) {
                        db.close()
                        res.status(500).json({})
                        return
                    }

                    let dbo = db.db("testing-carbon-footprint")

                    let filter = {UserName: username}
                    dbo.collection("Users").updateOne(filter, {$push: updateData}, (dbError, dbResponse) => {
                        if (dbError) {
                            console.log(dbError)
                            throw dbError
                        }
                        else {
                            res.send('Saved')
                        }
                        db.close()
                    })
                })
            })
        }
    })
})




app.post('/savePledge', (req, res) => {

    let body = ""

    req.on('data', function (chunk) {
        body += chunk
    })

    //parse the parameters for inserting in to pledges
    req.on('end', function () {
        let json = JSON.parse(body)
        let name = json.params.name
        let authToken = req.get('AUTH')

        if (authToken !== '' && authToken != null) {

            MongoClient.connect(url, function (err, db) {
                if (err) {
                    throw err
                } else {
                    AuthModule.useToken(db, authToken, (err, username) => {
                        if(err != null) {
                            db.close()
                            res.status(500).json({})
                            return
                        }

                        let dbo = db.db("testing-carbon-footprint")
                        let query = { UserName: username }

                        //check if this user has pledged before
                        dbo.collection("Pledges").find(query).toArray(function (err, result) {
                            if (err) throw err

                            if (result.length === 0) {
                                //insert todays date and the users name in to the Pledges table
                                let myobj = { UserName: username, Name: name, Date: new Date() }

                                dbo.collection("Pledges").insertOne(myobj, function (err, res) {
                                    if (err) throw err
                                    console.log("Added into Pledges")
                                })
                                db.close()
                                res.send('OK')
                            } else {
                                res.send(name)
                            }
                        })
                    })
                }
            })
        } else {
            res.send('Guest')
        }
    })
})



app.post('/updatePledge', (req, res) => {

    let body = ""

    req.on('data', function (chunk) {
        body += chunk
    })

    //parse the parameters for inserting in to pledges
    req.on('end', function () {
        let json = JSON.parse(body)
        let name = json.params.name
        let authToken = req.get('AUTH')

        MongoClient.connect(url, function (err, db) {
            if (err) {
                throw err
            } else {
                AuthModule.useToken(db, authToken, (err, username) => {
                    if(err != null) {
                        db.close()
                        res.status(500).json({})
                        return
                    }

                    let dbo = db.db("testing-carbon-footprint")
                    let query = { UserName: username }
                    let newvalues = { $set: { Name: name } }


                    dbo.collection("Pledges").update(query, newvalues, function (err, res) {
                        if (err) {
                            throw err
                        }
                        console.log("Successfully updated")
                        db.close()
                    })

                    res.send('OK')
                })
            }
        })
    })
})

// Returns whether the authenticated user has already taken the pledge
// Request body: {auth_token:''}
// Response body: {taken:false, name:''}
app.post('/already_taken_pledge', (req, res) => {

    let body = ""

    req.on('data', function (chunk) {
        body += chunk
    })

    //parse the parameters for inserting in to pledges
    req.on('end', function () {
        let token = req.get('AUTH')

        if (token !== '' && token != null) {

            MongoClient.connect(url, function (err, db) {
                if (err) {
                    throw err
                } else {
                    AuthModule.useToken(db, token, (err, username) => {
                        if(err != null) {
                            db.close()
                            res.status(500).json({})
                            return
                        }

                        let dbo = db.db("testing-carbon-footprint")
                        let query = { UserName: username }

                        //check if this user has pledged before
                        dbo.collection("Pledges").find(query).toArray(function (err, result) {
                            if (err) throw err

                            if (result.length === 0) {
                                res.status(200).json({taken: false, name: null})
                            } else {
                                res.status(200).json({taken: true, name: result[0].Name})
                            }

                            db.close()
                        })
                    })
                }
            })
        } else {
            res.status(500).json({})
        }
    })
})

app.post('/goals', (req, res) => {

    let body = ""

    req.on('data', (chunk) => {
        body += chunk
    })

    req.on('end', () => {
        let json = JSON.parse(body)
        let authToken = req.get('AUTH')
        let goalAmount = json.goalAmount
        let goalDeadline = json.goalDeadline

        MongoClient.connect(url, function (err, db) {
            if (err) throw err

            AuthModule.useToken(db, authToken, (err, username) => {
                if(err != null) {
                    db.close()
                    res.status(500).json({})
                    return
                }

                let dbo = db.db("testing-carbon-footprint")
                let myquery = { UserName: username }
                let newvalues = {
                    $set: {
                        GoalAmount: goalAmount,
                        GoalDeadline: goalDeadline
                    }
                }

                //update the calculation with the username currently in session
                dbo.collection("Users").update(myquery, newvalues, function (err, res) {
                    if (err) throw err
                    console.log("Successfully updated")
                    db.close()
                })
                res.send('OK')
            })
        })
    })
})

// POST /get_goal
// Returns the current goal for the authenticated user
// Request body: {auth_token:''}
// Response body: {amount:0.0, deadline:<Date.valueOf()>}
app.post('/get_goal', (req, res) => {
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
                        let col = db.collection('Users')
                        
                        col.findOne({UserName: username}, (err, userDoc) => {
                            if(err != null) {
                                console.error(err)
                                res.status(500).json({})
                                client.close()
                                return
                            }

                            if(userDoc.GoalAmount == null || userDoc.GoalDeadline == null) {
                                console.error('/get_goal no goal data found')
                                res.status(500).json({})
                                client.close()
                                return
                            }

                            let resJson = {
                                amount: userDoc.GoalAmount, 
                                deadline: userDoc.GoalDeadline
                            }

                            console.log('/get_goal returning ' + JSON.stringify(resJson))

                            res.status(200).json(resJson)

                            client.close()
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
})



app.post('/getPoints', (req, res) => {

    let body = ""

    req.on('data', function (chunk) {
        body += chunk
    })

    //parse the parameters for inserting in to pledges
    req.on('end', function () {
        let authToken = req.get('AUTH')

        MongoClient.connect(url, function (err, db) {
            if (err) {

                throw err

            } else {
                AuthModule.useToken(db, authToken, (err, username) => {
                    if(err != null) {
                        db.close()
                        res.status(500).json({})
                        return
                    }

                    let dbo = db.db("testing-carbon-footprint")
                    let query = { UserName: username}

                    dbo.collection("Users").find(query).toArray(function (err, result) {
                        if (err) {
                            db.close() //close the db connection
                            throw err
                        }
                        if (result.length > 0) {
                            console.log(result)
                            res.send(result[0].calculations) //send the results we got back
                        } else {
                            res.send('') //didnt find anything, just send 0
                        }
                    })
                })
            }
        })
    })
})

app.post('/getRecentData', (req, res) => {

    let body = ""

    req.on('data', function (chunk) {
        body += chunk
    })

    //parse the parameters for inserting in to pledges
    req.on('end', function () {
        let json = JSON.parse(body)
        let username = json.params.username //need to query for this username

        MongoClient.connect(url, function(err, db) {
            if (err) {
                throw err
            } else {
                let dbo = db.db("testing-carbon-footprint")
                let query = { UserName: username}

                dbo.collection("Users").find(query).sort({Date: -1}).limit(1).toArray(function(err, result) {
                    console.log("RETRIEVING RECENT DATA")
                    if (err) {
                        db.close() //close the db connection
                        throw err
                    }
                    if (result.length > 0) {
                        console.log(result)
                        res.send(result[0].calculations) //send the results we got back
                    } else {
                        res.send('') //didnt find anything, just send 0
                    }
                })
            }
        })
    })
})


app.post('/getUsernames', (req, res) => {


    //connect to the DB
    MongoClient.connect(url, function(err, db) {
        if (err) throw err

        let dbo = db.db("testing-carbon-footprint")

        //query for the username that was entered
        dbo.collection("Users").find({'isRegister': {$exists:false}}, {'UserName': 1, '_id': 0}).toArray(function(err, result) {
            if (err) throw err

            if (result.length > 0) {
                let dups = []
                result = result.filter(function(el) {
                    if (dups.indexOf(el.UserName) === -1) {
                        dups.push(el.UserName)
                        return true
                    }
                    return false
                })
                res.send(result)
            }
            db.close()
        })
    })
})


app.post('/getLeaderboardData', (req, res) => {

    //connect to the DB
    MongoClient.connect(url, function(err, db) {
        if (err) throw err

        let dbo = db.db("testing-carbon-footprint")

        dbo.collection("Users").find({calculations: {$exists:true}}, {'_id': 0, 'UserName': 1, 'calculations': 1}).toArray(function(err, result) {
            if (err) throw err

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

                res.send(userCalcs)
            }
            db.close()
        })
    })
})


FriendsModule.applyEndpoints(app)
NotificationsModule.applyEndpoints(app)
TwitterModule.applyEndpoints(app)
AuthModule.applyEndpoints(app)

app.listen(config.get('port'), () => {
    console.log(`Carbon footprint app listening on port ${config.get('port')}`)
})

module.exports = app
