import chai from 'chai'
import serverMain from '../src/server_main'
import { should } from 'chai'
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('Server', function() {
    before(function() {
        should()
    })
    after(function() {
        
    })
    it('should get homepage on / GET', function(done) {
        chai.request(serverMain)
            .get('/')
            .end(function(err, res) {
                res.should.have.property('status')
                res.status.should.equal(200)
                done()
            })
    })
})
