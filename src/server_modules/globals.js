const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const crypto = require('crypto')
const OAuth = require("oauth").OAuth

// MongoDB URL
export const url = 'mongodb://tdirusso:carbonfootprint@ds125896.mlab.com:25896/testing-carbon-footprint'

const algorithm = 'aes-256-ctr'

//used to encrypt the users password before being stored in the database
export function encrypt(text) {
    let cipher = crypto.createCipher(algorithm, text)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
}
