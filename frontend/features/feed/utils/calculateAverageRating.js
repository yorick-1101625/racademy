export default function calculateAverageRating(ratings) {
    let totalRatingPoints = 0;
    ratings.forEach(rating => {
        totalRatingPoints += rating;
    });

    return totalRatingPoints / ratings.length;
}