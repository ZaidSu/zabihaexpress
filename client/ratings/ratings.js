document.addEventListener('DOMContentLoaded', function () {
    const reviewsContainer = document.querySelector('.customerReviews');
    const reviewForm = document.querySelector('.review-form');
    const stars = document.querySelectorAll('.leaveReview .fa-star');

    // Load reviews when the page loads
    loadReviews();

    // Set up event listeners for the star ratings
    stars.forEach((star, index) => {
        star.addEventListener('click', () => setStars(index + 1, stars));
    });

    // Handle form submission
    reviewForm.addEventListener('submit', handleReviewSubmit);
});

function handleReviewSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const text = document.getElementById('details').value.trim();
    const stars = document.querySelectorAll('.leaveReview .fa-star.fa-solid');
    const rating = stars.length;

    if (!name || !text || rating === 0) {
        alert("Please fill out all fields and select a rating.");
        return;
    }

    const data = {
        name: name,
        text: text,
        rating: rating
    };

    fetch('/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text(); // Change this to text since the server is returning plain text
})
.then(text => {
    console.log('Response text:', text);  // Log the text to see what's actually returned
    // Assuming the server sends back a success message in text
    if (text.includes('successfully')) { // Check if the text indicates a success
        document.getElementById('name').value = '';
        document.getElementById('details').value = '';
        resetStars(stars);
        loadReviews();
    } else {
        alert("Failed to submit review: " + text);  // Use the text directly from the response
    }
})
.catch(error => {
    console.error('Error posting review:', error);
    alert("Error submitting review. Please try again.");
}); 
}

function setStars(rating, stars) {
    stars.forEach((star, idx) => {
        star.classList.toggle('fa-solid', idx < rating);
        star.classList.toggle('fa-regular', idx >= rating);
    });
}

function resetStars(stars) {
    stars.forEach(star => {
        star.classList.add('fa-regular');
        star.classList.remove('fa-solid');
    });
}

function loadReviews() {
    fetch('/client/ratings')
    .then(response => response.json())
    .then(data => {
        const { reviews, average_rating, count } = data;
        updateOverallRating(average_rating, count);

        const reviewsContainer = document.querySelector('.customerReviews');
        reviewsContainer.innerHTML = ''; // Clear existing reviews
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <div class="review-stars">${renderStars(review.rating)}</div>
                <p class="review-text"><strong>${review.name}:</strong> ${review.review_text}</p>
                <div class="review-date" style="text-align: right; font-size: 0.8rem; color: grey;">${review.created_at || 'Date not available'}</div>
                `;
            reviewsContainer.appendChild(reviewElement);
            console.log(reviews);
        });
    })
    .catch(error => {
        console.error('Error loading reviews:', error);
        reviewsContainer.innerHTML = '<p>Error loading reviews.</p>';
    });
}

function updateOverallRating(average, count) {
    const roundedAverage = Math.round(average * 2) / 2;
    const starsContainer = document.querySelector('.stars .star-icons');
    starsContainer.innerHTML = renderStars(roundedAverage);

    const ratingDescription = document.querySelector('.stars h4');
    ratingDescription.innerHTML = `${roundedAverage}/5 Based on ${count} reviews!`;
}

function renderStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<i class="fa ${i <= rating ? 'fa-solid' : 'fa-regular'} fa-star"></i>`;
    }
    return starsHtml;
}
