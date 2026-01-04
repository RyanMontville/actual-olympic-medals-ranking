import sqlite3
from bs4 import BeautifulSoup
import requests

conn = sqlite3.connect("paris2024.sqlite")
cursor = conn.cursor()


def make_athlete_id_dict():
    athletes = {}
    cursor.execute("SELECT athlete_name, athlete_id from athletes")
    rows = cursor.fetchall()
    num_athletes = len(rows)
    count = 1
    for row in rows:
        athlete_name, athlete_id = row
        athletes[athlete_name] = athlete_id
        count += 1
    print(f"\nCreated dictionary of {num_athletes} athletes")
    return athletes

def make_country_id_dict():
    countries = {}
    cursor.execute("SELECT country_name, country_id FROM countries")
    rows = cursor.fetchall()
    num_countires = len(rows)
    count = 1
    for row in rows:
        country_name, country_id = row
        countries[country_name] = country_id
        count += 1
    print(f"\nCreated dictionary of {num_countires} countries")
    return countries

# team_id, team_name, team_gender, country_id, sport_id, event_id, num_athletes

sql = '''
SELECT team_name, country_name, sport_name, event_name, num_athletes
FROM teams
JOIN countries ON countries.country_id = teams.country_id
JOIN sports ON teams.sport_id = sports.sport_id
JOIN events ON events.event_id = teams.event_id'''
cursor.execute(sql)
rows = cursor.fetchall()
for row in rows:
    print(row)

