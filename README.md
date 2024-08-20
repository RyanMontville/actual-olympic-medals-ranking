# The Actual Olympic Medals Ranking
Sanjay Amirthraj created a website to ranked all of the countries not by the total number of medals, but by the total value of the medals. You can check out his website [here](https://olympics-better-rankings.vercel.app/). Then Hank green [retweeted](https://x.com/hankgreen/status/1824509431352266788) his website. In the comments of Hank's post, several people suggested ranking the countries by total medals earned including athletes on teams, so a relay team of 4 would be counted as 4 medals instead of 1. After spending the weekend finding a dataset that was more than just the total medal counts and building a database, I have created the ACTUAL olympic rankings.

You can view the Actual Olympic rankings [here](https://ryanmontville.com/actual-olympic-medals-ranking/).

I found a [dataset on Kaggle](https://www.kaggle.com/datasets/piterfm/paris-2024-olympic-summer-games) by Petro and created a PostgreSQL database from the dataset. I then used some python to calculate the Actual rankings and then build an Angular app to display the rankings.

The flags are from [flagapi.com](https://flagsapi.com/).

You can find a .sql file of the database I created [here](https://raw.githubusercontent.com/RyanMontville/actual-olympic-medals-ranking/main/postgresql-db.sql). The database has 8 tables: 
* actual_medal_totals which has the country ID, actual gold total, actual silver total, actual bronze total, and actual totals for the countries
* athletes which has the athlete ID, name, name with last name first, gender, country ID and birth date for the athletes
* countries which has the country ID, name, ISO alpha3 code, original gold total, original silver total, original bronze total, flag url, original rand and actual rank for the countries
* events which has the event ID, event name, and sport ID for every event
* individual_medals which has a medal ID, the date the medal was awarded, medal type, medal code, the country ID, the athlete ID, and the event ID for every medal awarded to an individual athlete. I generated the medal ID by combining the date, code, athlete ID, and event ID to make sure than the medals were not added into the database more than once.
* sports which has the sport ID, 3 letter sport code, sport name, and the url to the sport on the Paris 2024 website for every sport
* team_medals which has a medal ID, the date the medal was awarded, medal type, medal code, the country ID, the team ID, and the event Id for every medal awarded to a team. I generated the medal ID similarly to how I generated the ID for the individual_medals table. This table only has one medal per team, the total counting each athlete on the team in calculated separately.
* teams which has the team ID included in the dataset I found, team name, team gender, the country ID, the sport ID, the event ID, the number of athletes on the team, and the number of coaches on the team. I generated the team name by combining the country ISO code, sport code, gender, and event Id.

The Angular app uses to csv files to load the data:
* [actul_totals.csv](https://github.com/RyanMontville/actual-olympic-medals-ranking/blob/main/actual_totals.csv) which has the columns country name, flag url, actual gold total, actual silver total, actual bronze total, actual medal total, original ranking, and actual ranking
* [allmedals.csv](https://github.com/RyanMontville/actual-olympic-medals-ranking/blob/main/allmedals.csv) which has the columns date awarded, country, athlete name/team name, event, medal code (1-gold, 2-silver, 3-bronze), and the number of athletes to multiply by