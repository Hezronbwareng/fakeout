function detectFakeNews() {
    const newsContent = document.getElementById('newsInput').value.trim();

    if (newsContent === '') {
        showNotification('Please enter news content before detecting!', 'error');
        return;
    }

    showProcessingIndicator();

    const apiUrl = 'https://barasa.pythonanywhere.com/predict'; // Replace with your actual API endpoint

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newsContent }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        hideProcessingIndicator();
        processApiResponse(data);
    })
    .catch(error => {
        console.error('Fetch error:', error.message);
        hideProcessingIndicator();
        showNotification('Error detecting fake news. Please try again later.', 'error');
    });
}

function processApiResponse(data) {
    // Handle the API response data
    // For example, update the UI with the response
    document.getElementById('response-container').innerText = JSON.stringify(data);
}


function clearChat() {
    document.getElementById('newsInput').value = '';
    document.getElementById('response-container').innerHTML = '';
}

function regenerateContent() {
    const randomNews = generateRandomNews();
    document.getElementById('newsInput').value = randomNews;
    document.getElementById('response-container').innerHTML = '';
}

function generateRandomNews() {
    const randomHeadline = getRandomElement(headlines);
    const randomBody = getRandomElement(bodyTexts);
    return `${randomHeadline}\n\n${randomBody}`;
}

function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Example headlines and body texts for regeneration
const headlines = [
    "Breaking News: Scientists Make Remarkable Discovery",
    "Political Scandal Unveiled: Shocking Revelations",
    "New Technology Promises to Change the World",
    "Entertainment News: A-list Celebrity Wedding",
    "Health Tips: Stay Fit and Healthy with These Habits"
];

const bodyTexts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "In a surprising turn of events, authorities have revealed...",
    "The latest breakthrough in technology has left experts amazed...",
    "Amidst the glitz and glamour, the star-studded wedding took place...",
    "Taking care of your health is essential for a happy and fulfilling life..."
];


function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;

    document.body.appendChild(notification);

    // Automatically remove the notification after a few seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
}

function provideFeedback(isHelpful) {
    // Add logic to handle user feedback
    if (isHelpful) {
        showNotification('Thank you for your feedback! We aim to improve.', 'success');
    } else {
        showNotification('We appreciate your feedback. We will work on improving our system.', 'info');
    }
}

function showProcessingIndicator() {
    const processingIndicator = document.getElementById('processing-indicator');
    processingIndicator.style.display = 'block';
}

function hideProcessingIndicator() {
    const processingIndicator = document.getElementById('processing-indicator');
    processingIndicator.style.display = 'none';
}

function fetchDataFromApi() {
    const apiUrl = 'https://barasa.pythonanywhere.com/predict';

    // Example data to send in the request
    const requestData = {
        // Add your data here
    };

    fetch(apiUrl, {
        method: 'POST', // Change this to the correct HTTP method
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
        },
        body: JSON.stringify(requestData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Handle the response from the API
        processApiResponse(data);
    })
    .catch(error => {
        console.error('Fetch error:', error.message);
        showNotification('Error fetching data from API', 'error');
    });
}

function processApiResponse(data) {
    // Handle the API response data
    // For example, update the UI with the response
    document.getElementById('response-container').innerText = JSON.stringify(data);
}

// Add this function to your existing script.js
function adjustTextareaHeight() {
    const textarea = document.getElementById('newsInput');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

// Add this event listener to your existing script.js
document.getElementById('newsInput').addEventListener('input', adjustTextareaHeight);
