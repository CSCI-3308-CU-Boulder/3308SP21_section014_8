# 3308SP21_section014_8
This is a README  
Our project is a ski website that will display resorts in Colorado, keep track of user statistics and will display conditions at several resorts as well as conditions in the backcountry for skiers and riders to make the best decision of where they want to ski. The website will also have data on the resorts all in one place for users to easily compare new snow, percentage open, and other statistics. There will be user accounts that will keep track of statistics such as number of days skied and vertical feet. 

## Team Members: 

- Neo Rieck
- Caleb Caulk
- Bill Black
- Drew Hockstein.

## Project Architecture

- Frontend - HTML/ ejs, CSS, Javascript
- Server - Node.js
- Backend - postgres

## Description
Our website will allow users to easily plan their ski/snowboard trip in Colorado, by giving them access to maps, traffic, and weather. The website will also allow users to track their stats throughout the season. 

## Dependencies  
If you want to run on localhost and docker compose is not working run
docker-compose run web npm install  
Otherwise the project is deployed to Heroku here  
http://skibumz.herokuapp.com/   

##Organization 
All code is in the Code folder  
- db has datebase files  
- heroku has files to be hosted on heroku  
-src has the source code  
 -assests has the assests for the conditions page and for css style for website  
 -test has test cases  
 -views has the ejs files  
  -pages has pages to load  
  -partials has header, footer, and nav bar  
 -server.js is the nodejs to run server side  
-other files are dependencies  

