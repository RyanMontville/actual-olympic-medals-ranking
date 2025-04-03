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
* actual_medal_totals (country_id, gold, silver, bronze, real_total) FK country_id references countries
* athlete_team (athlete_id, team_id) FK athlete_id references athletes FK team_id references teams
* athletes (athlete_id, athlete_name, last_name_first, gender, country_id, birth_date, gold, silver, bronze) PK athlete_id FK country_id
* countries (country_id, country_name, iso_alpha_3, gold, silver, bronze, medal_total, flag_url, original_rank, actual_rank, iso_alpha_2) PK country_id
* events (event_id, event_name, sport_id) PK event_id FK sport_id references events
* individual_medals (medal_id, medal_date, medal_type, medal_code, country_id, athlete_id, event_id) PK medal_id FK country_id references countries FK athlete_id references athletes FK event_id references events
  * The medal_id is created by combining the date, code, athlete ID, and event ID to make sure than the medals were not added into the database more than once.
* sports (sport_id, sport_code, sport_name, sport_url) PK sport_id
* team_medals (medal_id, medal_date, medal_type, medal_code, country_id, team_id, event_id) PK medal_id FK country_id references countries FK team_id references teams FK event_id references events
  * The medal_id is created similarly to how the ID for the individual_medals table. This table only has one medal per team, the total counting each athlete on the team in calculated separately.
* teams (team_id, team_name, team_gender, country_id, sport_id, event_id, num_athletes, num_coaches) PK team_id FK country_id references countries FK sport_id references sports FK event_id references events
  * The team name is created by combining the country ISO code, sport code, gender, and event ID.

## Some examples of queries used to get the medal counts
```
--Get every athlete that won a medal as part of a team, along with their country, sport, event, and medal
SELECT athlete_name, country_name, (sport_name || ' - '|| event_name) as sport_event, medal_type
FROM public.athlete_team 
JOIN athletes on athletes.athlete_id = athlete_team.athlete_id
JOIN teams on teams.team_id = athlete_team.team_id
JOIN sports on sports.sport_id = teams.sport_id
JOIN countries on countries.country_id = teams.country_id
JOIN events on events.event_id = teams.event_id
JOIN team_medals on team_medals.team_id = teams.team_id
ORDER BY country_name, teams.team_id, athlete_name

--Get all the athletes on a team
SELECT athlete_name, country_name, sport_name, event_name
FROM public.athlete_team
JOIN teams on teams.team_id = athlete_team.team_id
JOIN athletes on athletes.athlete_id = athlete_team.athlete_id
JOIN countries on countries.country_id = teams.country_id
JOIN sports on sports.sport_id = teams.sport_id
JOIN events on events.event_id = teams.event_id
WHERE athlete_team.team_id = <team ID>

--Get all medals won by an athlete, both individually and as part of a team
SELECT athlete_name, sport_name, event_name, medal_type
FROM
(
	SELECT athlete_name, sport_name, event_name, medal_type
	FROM public.athletes
	JOIN individual_medals on individual_medals.athlete_id = athletes.athlete_id
	JOIN events on events.event_id =  individual_medals.event_id
	JOIN sports on sports.sport_id = events.sport_id
	WHERE athlete_name = 'Chloe DYGERT'
	UNION ALL
	SELECT athlete_name, sport_name, event_name, medal_type
	FROM public.athletes
	JOIN athlete_team on athlete_team.athlete_id = athletes.athlete_id
	JOIN team_medals on team_medals.team_id = athlete_team.team_id
	JOIN events on events.event_id =  team_medals.event_id
	JOIN sports on sports.sport_id = events.sport_id
	WHERE athlete_name = <athlete name>
)

--Get the total numer of medals won by country, counting each team meber instead of the team as 1 medal. (My app still ranks the countries by gold, the silver, then bronze, not by total medals.)
SELECT  country_name, SUM(total_medals)
FROM
( 
	SELECT country_name, COUNT(*) as total_medals
	FROM public.individual_medals
	JOIN countries on countries.country_id = individual_medals.country_id
	GROUP BY country_name
	UNION ALL
	SELECT country_name, SUM(num_athletes) as total_medals
	FROM public.teams
	JOIN countries on countries.country_id = teams.country_id
	JOIN team_medals on team_medals.team_id = teams.team_id
	GROUP BY country_name
)
GROUP BY country_name
ORDER BY SUM(total_medals) DESC

