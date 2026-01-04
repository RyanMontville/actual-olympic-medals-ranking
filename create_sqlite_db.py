import sqlite3

def create_canvas_database_and_tables(db_name):
    conn = None  # Initialize connection to None
    try:
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()

        print(f"Successfully connected to database: {db_name}")

        # country name, flag url, actual gold total, actual silver total, actual bronze total, actual medal total, original ranking, actual ranking
        create_table_sql = """
        CREATE TABLE IF NOT EXISTS countries (
            country_id INTEGER PRIMARY KEY AUTOINCREMENT,
            country_name TEXT NOT NULL,
            iso_alpha_3 TEXT,
            iso_alpha_2 TEXT,
            gold INTEGER DEFAULT 0,
            silver INTEGER DEFAULT 0,
            bronze INTEGER DEFAULT 0,
            medal_total INTEGER DEFAULT 0,
            original_rank INTEGER,
            actual_rank INTEGER,
            flag_url TEXT
        );
        """
        cursor.execute(create_table_sql)
        conn.commit()
        print("Table 'countries' created or already exists successfully.")

        create_table_sql = """
        CREATE TABLE IF NOT EXISTS actual_medal_totals (
            country_id INTEGER NOT NULL,
            actual_gold INTEGER NOT NULL,
            actual_silver INTEGER NOT NULL,
            actual_bronze INTEGER NOT NULL,
            actual_total INTEGER NOT NULL,
            FOREIGN KEY (country_id) REFERENCES countries (country_id)
        );
        """
        cursor.execute(create_table_sql)
        conn.commit()
        print("Table 'actual_medal_totals' created or already exists successfully.")

        create_table_sql = """
        CREATE TABLE IF NOT EXISTS athletes (
            athlete_id INTEGER PRIMARY KEY AUTOINCREMENT,
            athlete_name TEXT NOT NULL,
            gender TEXT,
            country_id INTEGER, 
            birth_date DATE,
            gold INTEGER DEFAULT 0,
            silver INTEGER DEFAULT 0, 
            bronze INTEGER DEFAULT 0,
            FOREIGN KEY (country_id) REFERENCES countries (country_id)
        );
        """
        cursor.execute(create_table_sql)
        conn.commit()
        print("Table 'athletes' created or already exists successfully.")


        # sport_id,sport_code,sport_name,sport_url
        create_table_sql = """
        CREATE TABLE IF NOT EXISTS sports (
            sport_id INTEGER PRIMARY KEY AUTOINCREMENT,
            sport_code TEXT NOT NULL,
            sport_name TEXT, 
            sport_url TEXT
        );
        """
        cursor.execute(create_table_sql)
        conn.commit()
        print("Table 'sports' created or already exists successfully.")

        # event_id, sport_id, event_name
        create_table_sql = """
        CREATE TABLE IF NOT EXISTS events (
            event_id INTEGER PRIMARY KEY AUTOINCREMENT,
            sport_id INTEGER NOT NULL,
            event_name TEXT NOT NULL,
            FOREIGN KEY (sport_id) REFERENCES sports (sport_id)
        );
        """
        cursor.execute(create_table_sql)
        conn.commit()
        print("Table 'events' created or already exists successfully.")

        create_table_sql = """
        CREATE TABLE IF NOT EXISTS teams (
            team_id INTEGER PRIMARY KEY AUTOINCREMENT,
            team_name TEXT,
            team_gender TEXT,
            country_id INTEGER NOT NULL,
            sport_id INTEGER,
            event_id INTEGER,
            num_athletes INTEGER, 
            FOREIGN KEY (country_id) REFERENCES countries (country_id),
            FOREIGN KEY (sport_id) REFERENCES sports (sport_id),
            FOREIGN KEY (event_id) REFERENCES events (event_id)
        );
        """
        cursor.execute(create_table_sql)
        conn.commit()
        print("Table 'teams' created or already exists successfully.")

        create_table_sql = """
        CREATE TABLE IF NOT EXISTS athlete_team (
            athlete_id INTEGER,
            team_id INTEGER,
            FOREIGN KEY (athlete_id) REFERENCES athletes (athlete_id),
            FOREIGN KEY (team_id) REFERENCES teams (team_id)
        );
        """
        cursor.execute(create_table_sql)
        conn.commit()
        print("Table 'athlete_team' created or already exists successfully.")

        create_table_sql = """
        CREATE TABLE IF NOT EXISTS team_medals (
            medal_id INTEGER PRIMARY KEY AUTOINCREMENT,
            medal_date DATE,
            medal_type TEXT,
            medal_code INTEGER,
            country_id INTEGER,
            team_id INTEGER,
            event_id INTEGER,
            FOREIGN KEY (country_id) REFERENCES countries (country_id),
            FOREIGN KEY (team_id) REFERENCES teams (team_id),
            FOREIGN KEY (event_id) REFERENCES events (event_id)
        );
        """
        cursor.execute(create_table_sql)
        conn.commit()
        print("Table 'team_medals' created or already exists successfully.")

        create_table_sql = """
        CREATE TABLE IF NOT EXISTS individual_medals (
            medal_id INTEGER PRIMARY KEY AUTOINCREMENT,
            medal_date DATE,
            medal_type TEXT,
            medal_code INTEGER,
            country_id INTEGER,
            athlete_id INTEGER,
            event_id INTEGER,
            FOREIGN KEY (country_id) REFERENCES countries (country_id),
            FOREIGN KEY (athlete_id) REFERENCES athletes (athlete_id),
            FOREIGN KEY (event_id) REFERENCES events (event_id)
        );
        """
        cursor.execute(create_table_sql)
        conn.commit()
        print("Table 'individual_medals' created or already exists successfully.") 

#-----------------------------------------------------------------------------------------
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        # Ensure the connection is closed even if an error occurs.
        if conn:
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    create_canvas_database_and_tables("paris2024.sqlite")