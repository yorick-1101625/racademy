import re


def is_hr_mail(email):
    # Only allow xyz123@hr.nl emails
    regex = r"^[\w\-\.]+@hr\.nl$"
    return re.fullmatch(regex, email) is not None

def is_isbn(isbn):
    regex = r"""^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})
[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)
(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$""".replace('\n', '')
    return re.fullmatch(regex, isbn) is not None