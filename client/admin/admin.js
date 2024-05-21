document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/get-bookings') // Adjust the URL/port as necessary
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(bookings => displayBookings(bookings))
        .catch(error => console.error('Error fetching bookings:', error));
});

function displayBookings(bookings) {
    const container = document.getElementById('bookingsContainer');
    if (!container) {
        console.error('Bookings container not found on the page');
        return;
    }
    container.innerHTML = '';

    bookings.forEach(booking => {
        const bookingDiv = document.createElement('div');
        bookingDiv.className = 'booking-entry';
        bookingDiv.innerHTML = `
            <h4>${booking.fullName}</h4>
            <p>Email: ${booking.email}</p>
            <p>Phone: ${booking.phoneNumber}</p>
            <p>Message: ${booking.message}</p>
            <p>Date: ${new Date(booking.created_at).toLocaleDateString()}</p>
        `;
        container.appendChild(bookingDiv);
    });
}

function handleLogin(event) {
    event.preventDefault();  

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('http://localhost:3000/credentials')
        .then(response => response.json())
        .then(data => {
            if (data.username === username  && data.password === password) { 
                console.log("Login Successful!");
                var bookingsContainer = document.getElementById('bookingsContainer');
                bookingsContainer.style.display = 'block'; 

                var adminLogin = document.getElementById('adminLogin');
                adminLogin.style.display = "none";

                setTimeout(() => {
                    bookingsContainer.style.display = 'none'; 
                    adminLogin.style.display = "block";
                    console.log('Session expired. You have been logged out.');
                }, 600000);
                //password: $2y$10$oWJnsWZ9EMk/fIkEyzSuG.SRtiTY7Ig.lYcySceOqCngKyCtfsaFK
                //600000 - 10 minutes
            } else {
                alert("You are not authorized to login to this page.");
            }
            console.log('Username:', data.username);
            console.log('Password:', data.password);
        })
        .catch(error => console.error('Error fetching data:', error));
}