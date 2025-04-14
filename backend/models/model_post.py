from backend.models.model import Model

class PostModel(Model):

    def get_posts(self):

        query = """
                SELECT *
                FROM Post
                """

        return self.fetch_all(query)