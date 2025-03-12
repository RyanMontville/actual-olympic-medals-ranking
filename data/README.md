# Data for Actual Olympic Medals Ranking
## CSV files
The Angular app uses 5 csv files to load the data:
* [actul_totals.csv](https://github.com/RyanMontville/actual-olympic-medals-ranking/blob/main/actual_totals.csv) which has the columns country name, flag url, actual gold total, actual silver total, actual bronze total, actual medal total, original ranking, actual ranking
* [athlete_medals.csv](https://github.com/RyanMontville/actual-olympic-medals-ranking/blob/main/data/athlete_medals.csv) which has the columns athlete name, country, flag url, gold medals won, silver medals won, bronze medals won 
* [medas_for_every_athlete.csv](https://github.com/RyanMontville/actual-olympic-medals-ranking/blob/main/data/medals_for_every_athlete.csv) which has the columns date awarded, athlete name, sport and event name, event ID, medal code (1-gold, 2-silver, 3-bronze)
* [team_and_individual_medals.csv](https://github.com/RyanMontville/actual-olympic-medals-ranking/blob/main/data/team_and_individual_medals.csv) which has the columns date awarded, country, athlete name/team name, event, medal code (1-gold, 2-silver, 3-bronze), the number of athletes to multiply by, the team ID
* [team_members.csv](https://github.com/RyanMontville/actual-olympic-medals-ranking/blob/main/data/team_members.csv) which has the columns team ID, athlete name

## SQL file
The [.sql databse export file]((https://raw.githubusercontent.com/RyanMontville/actual-olympic-medals-ranking/main/data/postgresql-db.sql)) includes 8 tables:
* actual_medal_totals which has the country ID, actual gold total, actual silver total, actual bronze total, and actual totals for the countries
* athlete_team which links athlete_id to team_id
* athletes which has the athlete ID, name, name with last name first, gender, country ID, birth date, and the gold/silver/brpnze medals for the athletes
* countries which has the country ID, name, ISO alpha3 code, original gold total, original silver total, original bronze total, flag url, original rank, actual rank, and iso alpha2 code for the countries
* events which has the event ID, event name, and sport ID for every event
* individual_medals which has a medal ID, the date the medal was awarded, medal type, medal code, the country ID, the athlete ID, and the event ID for every medal awarded to an individual athlete. I generated the medal ID by combining the date, code, athlete ID, and event ID to make sure than the medals were not added into the database more than once.
* sports which has the sport ID, 3 letter sport code, sport name, and the url to the sport on the Paris 2024 website for every sport
* team_medals which has a medal ID, the date the medal was awarded, medal type, medal code, the country ID, the team ID, and the event Id for every medal awarded to a team. I generated the medal ID similarly to how I generated the ID for the individual_medals table. This table only has one medal per team, the total counting each athlete on the team in calculated separately.
* teams which has the team ID included in the dataset I found, team name, team gender, the country ID, the sport ID, the event ID, the number of athletes on the team, and the number of coaches on the team. I generated the team name by combining the country ISO code, sport code, gender, and event ID.