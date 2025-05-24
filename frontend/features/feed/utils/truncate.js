export default function truncate(string, limit) {

    if (string.length > limit) {
        return string.substring(0, limit) + "...";
    }
    return string;
}