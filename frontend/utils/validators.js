export function isHrMail(email) {
    const emailRegex = new RegExp(String.raw`^[\w\-\.]+@hr\.nl$`);
    return emailRegex.test(email);
}

export function isISBN(isbn) {
    const isbnRegex = new RegExp(String.raw`
^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})
[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)
(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$
`.replaceAll('\n', ''));
    return isbnRegex.test(isbn);
}