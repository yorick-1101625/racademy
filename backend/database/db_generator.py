import sqlite3
from pathlib import Path

class WP4DatabaseGenerator:
    def __init__(self, database_file, overwrite=False):
        self.database_file = Path(database_file)
        self.database_overwrite = overwrite
        self.test_file_location()
        self.conn = sqlite3.connect(self.database_file)

    def generate_database(self):
        self.create_table_user()
        self.create_table_post()
        self.create_table_comment()
        self.create_table_tag()
        self.create_table_post_tag()
        self.create_table_liked_post()
        self.create_table_favorited_post()
        self.create_table_source()
        self.create_table_favorited_source()
        self.create_table_ratings()
        print("✅ Alle tabellen succesvol aangemaakt.")

    def create_table_user(self):
        statement = """
        CREATE TABLE IF NOT EXISTS User (
            user_id INTEGER PRIMARY KEY,
            email TEXT,
            username TEXT,
            password TEXT,
            study TEXT,
            is_blocked BOOLEAN,
            is_admin BOOLEAN
        );
        """
        self.__execute(statement)

    def create_table_post(self):
        statement = """
        CREATE TABLE IF NOT EXISTS Post (
            post_id INTEGER PRIMARY KEY,
            title TEXT,
            content TEXT,
            created_at DATE,
            updated_at DATETIME,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES User(user_id)
        );
        """
        self.__execute(statement)

    def create_table_comment(self):
        statement = """
        CREATE TABLE IF NOT EXISTS Comment (
            comment_id INTEGER PRIMARY KEY,
            title TEXT,
            content TEXT,
            created_at DATE,
            updated_at DATETIME,
            user_id INTEGER,
            post_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES User(user_id),
            FOREIGN KEY (post_id) REFERENCES Post(post_id)
        );
        """
        self.__execute(statement)

    def create_table_tag(self):
        statement = """
        CREATE TABLE IF NOT EXISTS Tag (
            tag_id INTEGER PRIMARY KEY,
            name TEXT
        );
        """
        self.__execute(statement)

    def create_table_post_tag(self):
        statement = """
        CREATE TABLE IF NOT EXISTS PostTag (
            post_id INTEGER,
            tag_id INTEGER,
            PRIMARY KEY (post_id, tag_id),
            FOREIGN KEY (post_id) REFERENCES Post(post_id),
            FOREIGN KEY (tag_id) REFERENCES Tag(tag_id)
        );
        """
        self.__execute(statement)

    def create_table_liked_post(self):
        statement = """
        CREATE TABLE IF NOT EXISTS LikedPost (
            post_id INTEGER,
            user_id INTEGER,
            PRIMARY KEY (post_id, user_id),
            FOREIGN KEY (post_id) REFERENCES Post(post_id),
            FOREIGN KEY (user_id) REFERENCES User(user_id)
        );
        """
        self.__execute(statement)

    def create_table_favorited_post(self):
        statement = """
        CREATE TABLE IF NOT EXISTS FavoritedPost (
            post_id INTEGER,
            user_id INTEGER,
            PRIMARY KEY (post_id, user_id),
            FOREIGN KEY (post_id) REFERENCES Post(post_id),
            FOREIGN KEY (user_id) REFERENCES User(user_id)
        );
        """
        self.__execute(statement)

    def create_table_source(self):
        statement = """
        CREATE TABLE IF NOT EXISTS Source (
            source_id INTEGER PRIMARY KEY,
            type TEXT,
            url TEXT,
            name TEXT,
            description TEXT,
            created_at DATE,
            isbn TEXT,
            school_subject TEXT,
            subject TEXT,
            difficulty TEXT
        );
        """
        self.__execute(statement)

    def create_table_favorited_source(self):
        statement = """
        CREATE TABLE IF NOT EXISTS FavoritedSource (
            source_id INTEGER,
            user_id INTEGER,
            PRIMARY KEY (source_id, user_id),
            FOREIGN KEY (source_id) REFERENCES Source(source_id),
            FOREIGN KEY (user_id) REFERENCES User(user_id)
        );
        """
        self.__execute(statement)

    def create_table_ratings(self):
        statement = """
        CREATE TABLE IF NOT EXISTS Ratings (
            rating_id INTEGER PRIMARY KEY,
            source_id INTEGER,
            rating INTEGER,
            description TEXT,
            user_id INTEGER,
            created_at DATE,
            FOREIGN KEY (source_id) REFERENCES Source(source_id),
            FOREIGN KEY (user_id) REFERENCES User(user_id)
        );
        """
        self.__execute(statement)

    def __execute(self, statement):
        c = self.conn.cursor()
        c.execute(statement)
        self.conn.commit()

    def test_file_location(self):
        if self.database_file.exists():
            if not self.database_overwrite:
                raise ValueError(f"Database file {self.database_file} already exists. Use overwrite=True to replace it.")
            else:
                self.database_file.unlink()
                print("⚠️  Oude database verwijderd.")
        self.database_file.touch()
        print("✅ Nieuwe databasebestand aangemaakt.")

if __name__ == "__main__":
    db_path = Path(__file__).parent / "database.db"
    db = WP4DatabaseGenerator(db_path, overwrite=True)
    db.generate_database()