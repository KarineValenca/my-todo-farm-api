const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const request = require('request')
chai.use(chaiHttp)
chai.should()

describe("Auth", () => {
    describe("Signup", () => {
        it("should signup successfully", async () => {
            await chai.request(app)
                .post('/signup')
                .send({
                    'email': 'tes1t@test.com',
                    'password': 'test1',
                    'username': 'test1'
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    //res.should.be.a('object')
                    done()
                })
        })
    })
})