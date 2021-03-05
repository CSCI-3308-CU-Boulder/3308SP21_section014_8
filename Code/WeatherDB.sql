CREATE TABLE weatherDB (
  location TEXT NOT NULL,
  temp INT NOT NULL ,
  wind_speed INT NOT NULL
);

INSERT INTO weatherDB(location, temp, wind_speed)
VALUES ('Breckenridge', '20', '15');