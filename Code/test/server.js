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

// //test cases
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

	//UAT positive test case for user acceptance
    it("Making sure that a user is signed in with correct credentials", done => {
		//sending correct credentials
      chai
        .request(server)
        .get('/login/login')
        .query({username: "ralphie1"})
        .query({password: "buffs1"})
        .end((err, res) => {
        	//console.log("res render" + res.text);
        	//expecting the page to load and return 200 tells us that
          expect(res).to.have.status(200);
          //expecting the be redirected to the home page where a welcome message is
          expect(res.text).to.contain('<h3 class="home text-center">Welcome , Ralphie Buffalo!</h3>');
          done();
        });
    });

    //UAT negative test case for user acceptance
    it("Making sure that a user doesn't sign in with incorrect credentials", done => {
		//sending incorrect credentials
      chai
        .request(server)
        .get('/login/login')
        .query({username: "ralphie1"})
        .query({password: "buffs"})
        .end((err, res) => {
        	//console.log("res" + res);
        	//expecting the page to load and return 200 tells us that
          expect(res).to.have.status(200);
          //expecting an error to happen an be thrown
          expect(err);
          done();
        });
    });

    //UAT positive test case for user creation
    it("Making sure that a user signs up with correct credentials", done => {
		//sending correct credentials
      chai
        .request(server)
        .post('/login/register')
        .send({firstName: "test", lastName: "user", email: "test@gmail.com", username: "tester", psw: "123abc", cpsw: "123abc", acts: '1', resort_days: '2'})
        .end((err, res) => {
        	//console.log("res" + res.text);
        //expecting the page to load and return 200 tells us that
          expect(res).to.have.status(200);
          //expecting the be redirected to the home page where a welcome message is with the user's name
          expect(res.text).to.contain('<h3 class="home text-center">Welcome , test user!</h3>');
          done();
        });
    });

     //UAT negative test case for user creation
    it("Making sure that an error is thrown if the passwords don't match for user registration", done => {
		//sending correct credentials
      chai
        .request(server)
        .post('/login/register')
        .send({firstName: "test", lastName: "user", email: "test@gmail.com", username: "tester", psw: "123abc", cpsw: "3abc", visitor_type: '1', resort_days: '2'})
        .end((err, res) => {
        	//console.log("res" + res.text);
        //expecting the page to load and return 200 tells us that
          expect(res).to.have.status(200);
          //expecting there to be an error message
          expect(err);
          done();
        });
    });
});

describe('Conditions Tests', () => {
    it("Making sure that resort conditions page is loaded", done => {
        //making sure resorts page loads
        chai
            .request(server)
            .get('/resorts')
            .end((err, res) => {
                // console.log("res.body" + res.body);
                expect(res).to.have.status(200);
                done();
            });
    });
    it("Making sure that backcountry conditions page is loaded", done => {
        //making sure resorts page loads
        chai
            .request(server)
            .get('/backcountry')
            .end((err, res) => {
                // console.log("res.body" + res.body);
                expect(res).to.have.status(200);
                done();
            });
    });
});