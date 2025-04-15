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

        self.insert_data()
        print("✅ Alle tabellen succesvol data toegevoegd.")

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

    def insert_data(self):
        self.insert_users()
        self.insert_posts()
        self.insert_comments()
        self.insert_tags()
        self.insert_post_tags()
        self.insert_liked_posts()
        self.insert_favorited_posts()
        self.insert_sources()
        self.insert_favorited_sources()
        self.insert_ratings()
        print("✅ Mockdata succesvol toegevoegd.")

    def insert_users(self):
        statement = """
        INSERT INTO User (user_id, email, username, password, study, is_blocked, is_admin)
        VALUES
            (1, 'admin@example.com', 'admin', 'admin123', 'Computer Science', 0, 1),
            (2, 'user@example.com', 'john_doe', 'password', 'Psychology', 0, 0);
        """
        self.__execute(statement)

    def insert_posts(self):
        statement = """
        INSERT INTO Post (post_id, title, content, created_at, updated_at, user_id)
        VALUES
            (1, 'First Post', 'This is a test post', '2024-01-01', '2024-01-01 12:00:00', 1),
            (2, 'Second Post', 'Another test post', '2024-01-02', '2024-01-02 13:00:00', 2);
        """
        self.__execute(statement)

    def insert_comments(self):
        statement = """
        INSERT INTO Comment (comment_id, title, content, created_at, updated_at, user_id, post_id)
        VALUES
            (1, 'Nice post', 'Thanks for sharing!', '2024-01-03', '2024-01-03 14:00:00', 2, 1),
            (2, 'Follow-up', 'Can you elaborate?', '2024-01-04', '2024-01-04 15:00:00', 1, 2);
        """
        self.__execute(statement)

    def insert_tags(self):
        statement = """
        INSERT INTO Tag (tag_id, name)
        VALUES
            (1, 'learning'),
            (2, 'psychology'),
            (3, 'coding');
        """
        self.__execute(statement)

    def insert_post_tags(self):
        statement = """
        INSERT INTO PostTag (post_id, tag_id)
        VALUES
            (1, 1),
            (1, 3),
            (2, 2);
        """
        self.__execute(statement)

    def insert_liked_posts(self):
        statement = """
        INSERT INTO LikedPost (post_id, user_id)
        VALUES
            (1, 2),
            (2, 1);
        """
        self.__execute(statement)

    def insert_favorited_posts(self):
        statement = """
        INSERT INTO FavoritedPost (post_id, user_id)
        VALUES
            (1, 1);
        """
        self.__execute(statement)

    def insert_sources(self):
        statement = """
        INSERT INTO Source (source_id, type, url, name, description, created_at, isbn, school_subject, subject, difficulty)
        VALUES
            (1, 'book', 'https://example.com/book1', 'Learning How to Learn', 'A classic on metacognition', '2023-12-01', '978-1234567890', 'General Studies', 'Metacognition', 'medium'),
            (2, 'video', 'https://example.com/video1', 'Brain Science Explained', 'Intro to neuroscience for learners', '2023-12-15', NULL, 'Biology', 'Neuroscience', 'easy');
        """
        self.__execute(statement)

    def insert_favorited_sources(self):
        statement = """
        INSERT INTO FavoritedSource (source_id, user_id)
        VALUES
            (1, 2);
        """
        self.__execute(statement)

    def insert_ratings(self):
        statement = """
        INSERT INTO Ratings (rating_id, source_id, rating, description, user_id, created_at)
        VALUES
            (1, 1, 5, 'Very insightful and practical.', 2, '2024-01-05');
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
