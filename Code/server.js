/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
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
//load the home page by default
app.get('/', function(req, res) {
  res.render('pages/home',{
    my_title:"Ski Bumz Home"
  });
  res.sendStatus(200);
});


// home page
app.get('/home', function(req, res) {
	res.render('pages/home',{
		my_title:"Ski Bumz Home"
	});
  res.sendStatus(200);
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
      res.render('pages/map',{
        my_title: "Resorts Map",
        resort_info: data[0],
        conditionsInfo: data[1],
        number_resorts: parseInt(data[2][0].count) 
      });
    })
    .catch(function (err) {
      console.log('error', err);
      res.render('pages/map', {
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
  var update = "update conditions set new_snow = "+inches+" where resort_id = 13";
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
      console.log(data);
      console.log(inches)
    //   console.log(data[2][0].count);
      res.render('pages/map',{
        my_title: "Resorts Map",
        resort_info: data[0],
        conditionsInfo: data[1],
        number_resorts: parseInt(data[2][0].count) 
      });
    })
    .catch(function (err) {
      console.log('error', err);
      res.render('pages/map', {
        my_title: "Resorts Map",
        resorts_info: '',
        conditionsInfo: '',
        number_resorts: ''
      });
  });
});

// resort conditions page
app.get('/resorts', function(req, res) {
	res.render('pages/resorts',{
		my_title:"Resort Conditions"
	});
});

//// stat tracker page
//app.get('/stats', function(req, res) {
//	res.render('pages/stats',{
//		my_title:"Stat Tracker"
//	});
//});

// backcountry conditions page
app.get('/backcountry', function(req, res) {
	res.render('pages/backcountry',{
		my_title:"Backcountry Conditions"
	});
});

// test backcountry conditions page
app.get('/backcountryTest', function(req, res) {
    res.render('pages/backcountryTest',{
        my_title:"Backcountry Conditions Test"
    });
});

// signup page
app.get('/register', function(req, res) {
	res.render('pages/register',{
		my_title:"Account Registration"
	});
});

// login page
app.get('/login', function(req, res) {
	res.render('pages/login',{
		my_title:"Login"
	});
});

//app.get('/stats/add', function(req, res) {
//    var resort_names = req.body.field_resort_name;
//    var resort_days = req.body.field_resort_days;
//    var runs_beginner = req.body.field_runs_beginner;
//    var runs_intermediate = req.body.field_runs_intermediate;
//    var runs_advancedPlus = req.body.field_runs_advancedPlus;
////    var runs = runs_beginner + runs_intermediate + runs_advancedPlus;
//	var insert_statement = "INSERT INTO resorts (resort_id,resort_name, number_runs_open, number_runs_groomed, percent_open, number_green, number_blue, number_black, number_lifts, acreage, address, phone_number) VALUES(1,'PowderHorn Mountain Resort',50,15,1,8,15,27,5,1600,'48338 Powderhorn Rd, Mesa, CO 81643','9702685700');";
//
//
//// VALUES('" + name + "', '" + year + "', '" + major + "', " + passing_yards + ", " + rushing_yards + ", " + receiving_yards + ", '../resources/img/player1.jpg');";
//
//
//
//	res.render('pages/stats',{
//		my_title:"Stat Tracker"
//	});
//});


app.get('/stats', function(req, res) {
    var query = 'select * from stats;';
	db.any(query)
        .then(function (rows) {
            res.render('pages/stats',{
				my_title: "Stat Tracker",
				data: rows
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/stats', {
                my_title: 'Stat Tracker',
                data: ''
            })
        })
});


app.listen(3000);
console.log('3000 is the magic port');
