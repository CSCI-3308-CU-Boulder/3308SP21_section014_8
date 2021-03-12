CREATE TABLE Conditions (()
  resort_name VARCHAR(30) PRIMARY KEY,
  temp INTEGER NOT NULL ,
  wind_speed INTEGER NOT NULL,
  new_snow INTEGER NOT NULL,
  sunny BOOLEAN NOT NULL,
  base_snow_depth INTEGER NOT NULL
);

CREATE TABLE Runs_table(
	resort_name VARCHAR(30) FOREIGN KEY,
	type_of_run VARCHAR(10) NOT NULL,
	vertical_feet INTEGER NOT NULL,
	run_name VARCHAR(30) NOT NULL,
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

INSERT INTO Resort (resort_name, number_runs_open, number_runs_groomed, percent_open, number_green, number_blue, number_black, number_lifts, acreage, address, phone_number) VALUES
('PowderHorn Mountain Resort',50,15,1 8,15,27,5,1600'48338 Powderhorn Rd, Mesa, CO 81643','9702685700'),
('Silverton Mountain Ski Area', 20,0,1,0,0,20,1,1819,'Silverton, CO 81433','9703875706'),
('Steamboat Ski Resort',169,90,1,24,71,74,18,2965,'2305 Mt Werner Cir, Steamboat Springs, CO 80487','9708790880'),
('Wolf Creek Ski Area'133,45,1,27,47,59,7,1600,'E Hwy 160 E, Pagosa Springs, CO 81147','9702645639');