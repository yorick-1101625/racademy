from backend.models.models import Post

class PostService:

    @staticmethod
    def get_all_posts():
        posts = Post.query.all()
        result = [post.to_dict() for post in posts]
        return result