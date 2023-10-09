function detectFakeNews() {
    const newsContent = document.getElementById('newsInput').value.trim();

    if (newsContent === '') {
        showNotification('Please enter news content before detecting!', 'error');
        return;
    }

    showProcessingIndicator();

    const apiUrl = 'https://barasa.pythonanywhere.com/predict'; 

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
    const responseContainer = document.getElementById('response-container');

    // Clear previous content
    responseContainer.innerHTML = '';

    if (data && data.result) {
        // Create elements to display the response
        const resultParagraph = document.createElement('p');
        resultParagraph.textContent = `Result: ${data.result}`;

        // Append elements to the container
        responseContainer.appendChild(resultParagraph);
    } else {
        // Handle the case where the API response structure is unexpected
        responseContainer.innerHTML = '<p>Error: Unexpected API response format</p>';
    }
}


function clearChat() {
    document.getElementById('newsInput').value = '';
    document.getElementById('response-container').innerHTML = '';
}

function regenerateContent() {
    // Add logic to fetch content from your API
    const apiUrl = 'https://barasa.pythonanywhere.com/predict';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update the newsInput with the fetched content
            document.getElementById('newsInput').value = data.content;
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
            // Handle errors, show a notification, etc.
        });
}


function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;

    document.body.appendChild(notification);

    // Automatically remove the notification after a few seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2500);
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
    processingIndicator.innerHTML = '<p>Loading...</p>'; // Display a loading message
    processingIndicator.style.display = 'block';
}

function hideProcessingIndicator() {
    const processingIndicator = document.getElementById('processing-indicator');
    processingIndicator.style.display = 'none';
    processingIndicator.innerHTML = '';
}


function fetchDataFromApi() {
    const apiUrl = 'https://barasa.pythonanywhere.com/predict';

    // Example data to send in the request
    const requestData = {
        // Add your data here
    };

    fetch(apiUrl, {
        method: 'POST', //  HTTP method
        headers: {
            'Content-Type': 'application/json',
            // any other headers 
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
    document.getElementById('response-container').innerText = JSON.stringify(data);
}


function adjustTextareaHeight() {
    const textarea = document.getElementById('newsInput');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}
document.getElementById('newsInput').addEventListener('input', adjustTextareaHeight);
