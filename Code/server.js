/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
const { Pool } = require('pg');
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.
		We'll be using `db` as this is the name of the postgres container in our
		docker-compose.yml file. Docker will translate this into the actual ip of the
		container for us (i.e. can't be access via the Internet).
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab,
		we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database. We set this in the
		docker-compose.yml for now, usually that'd be in a seperate file so you're not pushing your credentials to GitHub :).
**********************/
const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'weather_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



/*********************************
 Below we'll add the get & post requests which will handle:
   - Database access
   - Parse parameters from get (URL) and post (data package)
   - Render Views - This will decide where the user will go after the get/post request has been processed

 Web Page Requests:

  Login Page:        Provided For your (can ignore this page)
  Registration Page: Provided For your (can ignore this page)
  Home Page:
  		/home - get request (no parameters)
  				This route will make a single query to the favorite_colors table to retrieve all of the rows of colors
  				This data will be passed to the home view (pages/home)

  		/home/pick_color - post request (color_message)
  				This route will be used for reading in a post request from the user which provides the color message for the default color.
  				We'll be "hard-coding" this to only work with the Default Color Button, which will pass in a color of #FFFFFF (white).
  				The parameter, color_message, will tell us what message to display for our default color selection.
  				This route will then render the home page's view (pages/home)

  		/home/pick_color - get request (color)
  				This route will read in a get request which provides the color (in hex) that the user has selected from the home page.
  				Next, it will need to handle multiple postgres queries which will:
  					1. Retrieve all of the color options from the favorite_colors table (same as /home)
  					2. Retrieve the specific color message for the chosen color
  				The results for these combined queries will then be passed to the home view (pages/home)

  		/team_stats - get request (no parameters)
  			This route will require no parameters.  It will require 3 postgres queries which will:
  				1. Retrieve all of the football games in the Fall 2018 Season
  				2. Count the number of winning games in the Fall 2018 Season
  				3. Count the number of lossing games in the Fall 2018 Season
  			The three query results will then be passed onto the team_stats view (pages/team_stats).
  			The team_stats view will display all fo the football games for the season, show who won each game,
  			and show the total number of wins/losses for the season.

  		/player_info - get request (no parameters)
  			This route will handle a single query to the football_players table which will retrieve the id & name for all of the football players.
  			Next it will pass this result to the player_info view (pages/player_info), which will use the ids & names to populate the select tag for a form
************************************/
// global variable for user identification
app.locals.name = '';
app.locals.user = '';

//load the home page by default
app.get('/', function(req, res) {
  res.status(200).render('pages/home',{
    my_title:"Ski Bumz Home"
  });
});

app.get('/logout', function(req,res) {
  app.locals.name = '';
  app.locals.user = '';
  res.status(200).redirect('/');
});

// map page
app.get('/map', function(req, res) {
  //getting resorts
  var resorts_data = "select * from resorts;";
  //geting new snow from conditions
  var conditions_data = "select * from conditions;";
  //getting the number of resorts
  var num_resorts = "select count(*) from resorts;";
  //querying
	db.task('get-everything', task => {
        return task.batch([
            task.any(resorts_data),
            task.any(conditions_data),
            task.any(num_resorts)
        ]);
    })
  //returning the data back to the map page
    .then(function (data) {
    //   console.log(data);
    //   console.log(data[2][0].count);
      res.status(200).render('pages/map',{
        my_title: "Resorts Map",
        resort_info: data[0],
        conditionsInfo: data[1],
        number_resorts: parseInt(data[2][0].count) 
      });
    })
    .catch(function (err) {
      console.log('error', err);
      res.status(400).render('pages/map', { // Status code here
        my_title: "Resorts Map",
        resorts_info: '',
        conditionsInfo: '',
        number_resorts: ''
      });
  });
});

//post test to update new snow for a certain resort
app.post('/map',function(req,res){
  //update the table
  var inches = req.body.newSnowFall;
  var area = req.body.skiResort;
  var update = "update conditions set new_snow = '"+inches+"' where resort_name = '"+area+"';";
  //getting resorts
  var resorts_data = "select * from resorts;";
  //geting new snow from conditions
  var conditions_data = "select * from conditions;";
  //getting the number of resorts
  var num_resorts = "select count(*) from resorts;";
  db.task('get-everything', task => {
        return task.batch([
            task.any(update),
            task.any(resorts_data),
            task.any(conditions_data),
            task.any(num_resorts)
        ]);
    })
  //returning the data back to the map page
    .then(function (data) {
      res.status(200).render('pages/map',{
        my_title: "Resorts Map",
        resort_info: data[1],
        conditionsInfo: data[2],
        number_resorts: parseInt(data[3][0].count) 
      });
    })
    .catch(function (err) {
      console.log('error', err);
      res.render('pages/map', { // Status code here
        my_title: "Resorts Map",
        resorts_info: '',
        conditionsInfo: '',
        number_resorts: ''
      });
  });
});

// resort conditions page
app.get('/resorts', function(req, res) {
	res.status(200).render('pages/resorts',{
		my_title:"Resort Conditions"
	});
});

// backcountry conditions page
app.get('/backcountry', function(req, res) {
	res.status(200).render('pages/backcountry',{
		my_title:"Backcountry Conditions"
	});
});

// test backcountry conditions page
app.get('/backcountryTest', function(req, res) {
    res.status(200).render('pages/backcountryTest',{
        my_title:"Backcountry Conditions Test"
    });
});

// login page
app.get('/login', function(req, res) {
  
	res.status(200).render('pages/login',{
		my_title:"Login",
    validUsr: true,
    validPass: false,
    userExists: false,
    passMatch: true
	});
});

// login form
app.get('/login/login', function(req, res) {
  var usr = req.query.username;
  var psw = req.query.password;
  var query = `select * from users where user_name = '${usr}' and password = '${psw}';`;
  //console.log(query);
  if(usr && psw) {
    db.one(query)
      .then(function(data) {
        app.locals.name = data.name;
        app.locals.user = data.user_name;
        res.status(200).redirect('/');
      })
      .catch(function(err) {
        console.log('error',err);
        res.status(400).render('pages/login', { // Status code here
          my_title: "Login",
          passMatch: true,
          validUsr: false,
          userExists: false,
          validPass: true
        });
      });
    }
    else {
      console.log('no user and/or password');
      res.status(400).render('pages/login', { // Status code here
        my_title: "Login",
        passMatch: true,
        validUsr: false,
        userExists: false,
        validPass: true
    });
  }
});

app.post('/login/register',function(req,res) {
  var name = req.body.firstName + ' ' + req.body.lastName;
  var email = req.body.email;
  var usr = req.body.username;
  var psw = req.body.psw;
  var cpsw = req.body.cpsw;
  var acts = req.body.visitor_type;
  var days = req.body.resort_days;

  var query = `select * from users where user_name = '${usr}';`;
  var insert = `INSERT INTO users (user_name,password,email,name,visitor_type,days) VALUES(
    '${usr}','${psw}','${email}','${name}',ARRAY [${acts}],ARRAY [${days}]);`;
    console.log(insert);
  db.none(query)
    .then(function (data) {
      if(psw == cpsw) {
        app.locals.name = name;
        app.locals.user = usr;
        db.query(insert);
        if(usr == "tester"){
        	db.query("delete from users where user_name = 'tester';");
        }
        res.status(200).redirect('/');
      }
      else {
        console.log(data);
        res.status(400).render('pages/login', {
          my_title: "Login",
          validUsr: true,
          passMatch: false,
          userExists: true
        });
      }
    })
    .catch(function (err) {
      console.log('error', err);
      res.status(400).render('pages/login', { // Status code here
        my_title: "Login",
        validUsr: true,
        passMatch: true,
        userExists: true
      });
    });
});


app.get('/stats', function(req, res) {
    var query = 'select * from stats;';
	db.any(query)
        .then(function (rows) {
            res.status(200).render('pages/stats',{
				my_title: "Stat Tracker",
				data: rows
			});

        })
        .catch(function (err) {
            console.log('error', err);
            res.status(400).render('pages/stats', { // Status code here
                my_title: 'Stat Tracker',
                data: ''
            });
        });
});


module.exports = app.listen(3000);
console.log('3000 is the magic port');
