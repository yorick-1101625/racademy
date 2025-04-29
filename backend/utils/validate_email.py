import re

def validate_email(email):

    # Only allow xyz123@hr.nl emails
    regex = r"^[\w\-\.]+@hr\.nl$"
    return re.fullmatch(regex, email) is not None