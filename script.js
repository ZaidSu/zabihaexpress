var currentSlides = [0, 1, 2];

function updateVisibleSlides(step) {
    var slides = document.querySelectorAll('.viewOptions .foods > div');
    var totalSlides = slides.length;
    if (step > 0) { 
        currentSlides = currentSlides.map(index => (index + step + totalSlides) % totalSlides);
    } else {
        currentSlides = currentSlides.map(index => (index + step + totalSlides) % totalSlides);
    }

    slides.forEach(slide => {
        slide.classList.remove('visible');
        slide.style.display = 'none';
    });
    currentSlides.forEach(index => {
        slides[index].classList.add('visible');
        slides[index].style.display = 'flex';
    });
}

document.querySelector('.left-arrow').addEventListener('click', function() {updateVisibleSlides(-1);});

document.querySelector('.right-arrow').addEventListener('click', function() {updateVisibleSlides(1);});

document.addEventListener('DOMContentLoaded', updateVisibleSlides(0));

/*-------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        events: [
            {
                title: 'IANT',
                start: '2024-05-11',
                end: '2024-05-11',
                url: 'https://iant.com'
            },
            {
                title: 'MAS Dallas',
                start: '2024-06-08',
                end: '2024-06-08',
                url: ''
            },
            {
                title: 'Mekkah Masjid',
                start: '2024-06-15',
                end: '2024-06-15',
                url: 'https://makkahmasjid.net/join-us-at-makkah-masjids-eid-bazaar/'
            }
        ],
        eventClick: function(info) {
            info.jsEvent.preventDefault(); 
            window.open(info.event.url, '_blank');
        }
    });

    calendar.render();
});

function islamRedirect()  {
    event.preventDefault();
    window.location.href = '';
}

/*-------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    const starsContainer = document.querySelector('.firstImg .ratings .stars');

    fetch('http://localhost:3000/reviews')  // Update the URL based on where your server is hosted
    .then(response => response.json())
    .then(data => {
        if (!data || !data.average_rating) {
            console.error('No average rating data available');
            return; // Exit if no data is found
        }
        const averageRating = Math.round(data.average_rating * 2) / 2;  // Round to the nearest half
        updateStars(averageRating, starsContainer);
    })
    .catch(error => {
        console.error('Error fetching average rating:', error);
    });
});

function updateStars(averageRating, container) {
    container.innerHTML = '';  // Clear existing stars
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.className = 'fa ' + (i <= averageRating ? 'fa-solid' : 'fa-regular') + ' fa-star';
        if (i <= averageRating && averageRating < i && (averageRating + 0.5) === i) {
            star.className = 'fa fa-star-half-alt fa-solid';
        }
        container.appendChild(star);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('bookingForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const url = form.action;

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Form submitted successfully!');
            form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        });
    });
});