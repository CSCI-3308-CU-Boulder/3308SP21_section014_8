CREATE TABLE Conditions (
  resort_name VARCHAR(30) PRIMARY KEY,
  temp INTEGER ,
  wind_speed INTEGER,
  new_snow INTEGER NOT NULL,
  sunny BOOLEAN,
  base_snow_depth INTEGER NOT NULL,
  total_snowfall INTEGER NOT NULL
);

CREATE TABLE Runs_table(
	resort_name VARCHAR(30) FOREIGN KEY,
	type_of_run VARCHAR(10) NOT NULL,
	vertical_feet INTEGER,
	run_name VARCHAR(30) NOT NULL PRIMARY KEY,
	groomed BOOLEAN
);

CREATE TABLE Resort(
	resort_name VARCHAR(30) PRIMARY KEY,
	number_runs_open INTEGER NOT NULL,
	number_runs_groomed INTEGER,
	percent_open REAL NOT NULL,
	number_green INTEGER,
	number_blue INTEGER,
	number_black INTEGER,
	number_lifts INTEGER,
	acreage INTEGER,
	address VARCHAR(100) NOT NULL,
	phone_number VARCHAR(10)
);

CREATE TABLE User(
	user_name VARCHAR(30) PRIMARY KEY,
	password VARCHAR(30),
	email VARCHAR(30)
);

CREATE TABLE Stat_tracker_table(
	num_runs_done INTEGER,
	vertical_feet INTEGER,
	num_resorts_visited INTEGER,
	resorts_visited text[],
	days INTEGER,
	user_name VARCHAR(30) PRIMARY KEY
);

INSERT INTO Resort (resort_name, number_runs_open, number_runs_groomed, percent_open, number_green, number_blue, number_black, number_lifts, acreage, address, phone_number) VALUES
('PowderHorn Mountain Resort',50,15,1 8,15,27,5,1600'48338 Powderhorn Rd, Mesa, CO 81643','9702685700'),
('Silverton Mountain Ski Area',20,0,1,0,0,20,1,1819,'Silverton, CO 81433','9703875706'),
('Steamboat Ski Resort',169,90,1,24,71,74,18,2965,'2305 Mt Werner Cir, Steamboat Springs, CO 80487','9708790880'),
('Wolf Creek Ski Area',133,45,1,27,47,59,7,1600,'E Hwy 160 E, Pagosa Springs, CO 81147','9702645639'),
('Vail Ski Resort',263,134,.97,62,94,114,33,5289,'Vail, CO 81657','9704771777'),
('Keystone Resort',116,46,.92,19,35,72,21,3148,'100 Dercum Square, Keystone, CO 80435','8556030049'),
('Eldora Mountain',53,40,.96,11,28,16,10,363,'2861 Eldora Ski Rd, Nederland, CO 80466','3034408700'),
('Breckenridge',188,67,.98,29,40,124,34,2908,'1599 Ski Hill Rd, Breckenridge, CO 80424','9704535000'),
('Copper Mountain',140,64,1,29,35,76,23,2490,'209 Ten Mile Cir, Frisco, CO 80443','8004588386'),
('Arapahoe Basin Ski Area',145,39,.92,10,29,106,9,1428,'28194 US-6, Dillon, CO 80435','9704680718'),
('Aspen Highlands Ski Resort',117,30,.91,0,32,85,5,1053,'199 Prospector Rd, Aspen, CO 81611','9709251220'),
('Beaver Creek Resort',148,104,.97,60,44,48,23,1815,'210 Beaver Creek Plaza, Beaver Creek, CO 81620','9707544636'),
('Winter Park Resort',167,12,1,13,30,124,23,3081,'85 Parsenn Rd, Winter Park, CO 80482','9707265514'); 

INSERT INTO Conditions (resort_name, temp, wind_speed, new_snow, sunny, base_snow_depth, total_snowfall) VALUES
('PowderHorn Mountain Resort',25,0,0,FALSE,47,108 ),
('Silverton Mountain Ski Area',23,0,0,FALSE,68,162),
('Steamboat Ski Resort',30,0,0,FALSE,48,208),
('Wolf Creek Ski Area',29,0,0,FALSE,99,308),
('Vail Ski Resort',24,0,0,FALSE,53,192),
('Keystone Resort',28,0,0,FALSE,42,163),
('Eldora Mountain',20,0,0,FALSE,50,113),
('Breckenridge',23,0,0,FALSE,49,188),
('Copper Mountain',24,0,0,FALSE,38,153),
('Arapahoe Basin Ski Area',28,0,0,FALSE,50,169),
('Aspen Highlands Ski Resort',29,0,0,FALSE,61,173),
('Beaver Creek Resort',26,0,0,FALSE,41,162),
('Winter Park Resort',23,0,0,FALSE,61,241); 

INSERT INTO Runs_table (resort_name, type_of_run, run_name) VALUES
('PowderHorn Mountain Resort','green','Boardwalk'),
('PowderHorn Mountain Resort','green','Bottoms Up'),
('PowderHorn Mountain Resort','green','EZ'),
('PowderHorn Mountain Resort','green','Lower Dude'),
('PowderHorn Mountain Resort','green','Greenhorn'),
('PowderHorn Mountain Resort','green','Magic Forest'),
('PowderHorn Mountain Resort','green','Peacemaker'),
('PowderHorn Mountain Resort','green','Stagecoach'),
('PowderHorn Mountain Resort','blue','Midway Traverse'),
('PowderHorn Mountain Resort','blue','Whistle Pig'),
('Silverton Mountain Ski Area','black','Colorado'),
('Silverton Mountain Ski Area','black','Joey'),
('Silverton Mountain Ski Area','black','Curly'),
('Silverton Mountain Ski Area','black','Moe'),
('Silverton Mountain Ski Area','black','Larry'),
('Silverton Mountain Ski Area','black','Sugarhill'),
('Silverton Mountain Ski Area','black','Raff'),
('Silverton Mountain Ski Area','black','Riff'),
('Silverton Mountain Ski Area','black','Waterfall'),
('Silverton Mountain Ski Area','black','Two Smokes'),
('Steamboat Ski Area','black','Alarm Clock'),
('Steamboat Ski Area','black','Ambush'),
('Steamboat Ski Area','green','Arc'),
('Steamboat Ski Area','blue','Baby Powder'),
('Steamboat Ski Area','blue','Bail Out'),
('Steamboat Ski Area','blue','Bashor'),
('Steamboat Ski Area','black','B.C. Lift Line'),
('Steamboat Ski Area','green','B.C. Ski Way'),
('Steamboat Ski Area','blue','Bear Claw'),
('Steamboat Ski Area','green','Beeline'),
('Wolf Creek Ski Area','green','A-Way'),
('Wolf Creek Ski Area','green','Bunny Hop'),
('Wolf Creek Ski Area','green','Divide Trail'),
('Wolf Creek Ski Area','green','Easy Out'),
('Wolf Creek Ski Area','green','Kelly Boyce Trail'),
('Wolf Creek Ski Area','green','Lower Powder Puff'),
('Wolf Creek Ski Area','green','Nova'),
('Wolf Creek Ski Area','green','Okey Dokey'),
('Wolf Creek Ski Area','green','Susans'),
('Wolf Creek Ski Area','green','Turnpike'),
('Vail Ski Resort','blue','Big Rock Park - East'),
('Vail Ski Resort','blue','Big Rock Park - West'),
('Vail Ski Resort','blue','China Spur'),
('Vail Ski Resort','blue','Cloud 9 - Lower'),
('Vail Ski Resort','blue','Cloud 9 - Middle'),
('Vail Ski Resort','blue','Cloud 9 - Upper'),
('Vail Ski Resort','blue','Grand Review'),
('Vail Ski Resort','blue','Grand Review - Lower'),
('Vail Ski Resort','blue','In The Wuides'),
('Vail Ski Resort','blue','Kellys Toll Road'),
('Keystone Resort','green','Discovery'),
('Keystone Resort','green','Easy Street'),
('Keystone Resort','green','Endeavor'),
('Keystone Resort','green','Fredas'),
('Keystone Resort','green','Inas Way'),
('Keystone Resort','green','Jaybird'),
('Keystone Resort','green','Last Chance'),
('Keystone Resort','green','Modest Girl'),
('Keystone Resort','green','Schoolmarm'),
('Keystone Resort','green','Scout'),
('Eldora Mountain','green','Bunnyfair'),
('Eldora Mountain','blue','Chute'),
('Eldora Mountain','blue','EZ Liftline'),
('Eldora Mountain','green','Easyway'),
('Eldora Mountain','green','Foxtail'),
('Eldora Mountain','green','Fun Gully'),
('Eldora Mountain','green','Fun Zone'),
('Eldora Mountain','blue','Gabors'),
('Eldora Mountain','green','Little Hawk'),
('Eldora Mountain','green','Ryders'),
('Breckenridge','blue','Upper 4 OClock'),
('Breckenridge','black','Adios'),
('Breckenridge','black','Amen'),
('Breckenridge','black','Hombre'),
('Breckenridge','black','Lobo'),
('Breckenridge','black','No Name'),
('Breckenridge','black','Psychopath'),
('Breckenridge','black','Quandary'),
('Breckenridge','black','Solitude'),
('Breckenridge','black','Too Much'),
('Copper Mountain','black','17 Glade'),
('Copper Mountain','blue','American Flyer'),
('Copper Mountain','blue','Bittersdweet(L)'),
('Copper Mountain','blue','Bittersdweet(U)'),
('Copper Mountain','blue','Bouncer(L)'),
('Copper Mountain','blue','Bouncer(U)'),
('Copper Mountain','black','Brennans Grin'),
('Copper Mountain','black','CDLs Trail #20'),
('Copper Mountain','black','Cache Glades'),
('Copper Mountain','green','Carefree'),
('Arapahoe Basin Ski Area','blue','High Noon'),
('Arapahoe Basin Ski Area','blue','Lynx Lane'),
('Arapahoe Basin Ski Area','blue','Moose Hollow'),
('Arapahoe Basin Ski Area','blue','North Fork'),
('Arapahoe Basin Ski Area','blue','Ramrod'),
('Arapahoe Basin Ski Area','blue','TB Glades'),
('Arapahoe Basin Ski Area','blue','Weasel Way'),
('Arapahoe Basin Ski Area','green','Lower Chisholm Trail'),
('Arapahoe Basin Ski Area','green','Upper Chisholm Trail'),
('Arapahoe Basin Ski Area','green','Sundance'),
('Aspen Highlands Ski Resort','black','Y-12'),
('Aspen Highlands Ski Resort','black','Hot Ys'),
('Aspen Highlands Ski Resort','black','Whips Veneration'),
('Aspen Highlands Ski Resort','black','Filips Leap'),
('Aspen Highlands Ski Resort','black','Ballroom'),
('Aspen Highlands Ski Resort','black','Mosh Pit'),
('Aspen Highlands Ski Resort','black','Boxcar'),
('Aspen Highlands Ski Resort','black','Grahamsters'),
('Aspen Highlands Ski Resort','black','B-force'),
('Aspen Highlands Ski Resort','black','Sheep & Deep'),
('Beaver Creek Resort','green','Piece O Cake'),
('Beaver Creek Resort','green','Stirrup'),
('Beaver Creek Resort','blue','Cresta'),
('Beaver Creek Resort','blue','Cross Bow'),
('Beaver Creek Resort','blue','Golden Bear'),
('Beaver Creek Resort','blue','Little Brave'),
('Beaver Creek Resort','blue','Pow Wow'),
('Beaver Creek Resort','black','Flint'),
('Beaver Creek Resort','black','Tomahawk'),
('Beaver Creek Resort','black','Wapiti'),
('Winter Park Resort','green','Jack Kendrick'),
('Winter Park Resort','blue','Butchs Breezeway'),
('Winter Park Resort','green','Allan Phipps'),
('Winter Park Resort','green','Village Way'),
('Winter Park Resort','blue','Crammer'),
('Winter Park Resort','green','Bill Wilsons Way'),
('Winter Park Resort','green','Marmot Flats'),
('Winter Park Resort','green','Turnpike'),
('Winter Park Resort','green','Bobcat'),
('Winter Park Resort','blue','Larry Sale');