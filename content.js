// content.js

// Get the current URL of the page
const currentUrl = window.location.href;

// Send a POST request to the Flask server
fetch('http://your-flask-server-url', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: currentUrl }),
})
    .then(response => response.json())
    .then(data => {
        // Do something with the response data if needed
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
