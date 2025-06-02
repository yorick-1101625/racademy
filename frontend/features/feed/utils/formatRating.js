export default function formatRating(rating) {

    return isNaN(rating) ? '-' : (rating / 10).toFixed(1);
}