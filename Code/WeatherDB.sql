CREATE TABLE Conditions (
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
	address VARCHAR(100) NOT NULL,
	phone_number VARCHAR(10)
);
