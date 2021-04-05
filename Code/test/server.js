// Imports the server.js file to be tested.
let server = require("../server");
//Assertion (Test Driven Development) and Should, Expect(Behaviour driven development) library
let chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp); 
const { expect } = chai;
var assert = chai.assert;


//Import complete

//test cases
describe("Server!", () => {

	//testing that test cases work by testing if Resorts loads
	it("Making sure that resorts page (/map) is loaded", done => {
		//making sure resorts page loads
      chai
        .request(server)
        .get('/map')
        .end((err, res) => {
        	// console.log("res.body" + res.body);
          expect(res).to.have.status(200);
          done();
        });
    });
});