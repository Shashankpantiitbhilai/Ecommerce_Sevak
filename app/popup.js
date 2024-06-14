// popup.js

document.addEventListener('DOMContentLoaded', function () {
    // Check if the current URL is Amazon.com
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentUrl = new URL(tabs[0].url);
        const isAmazon = currentUrl.hostname === 'www.amazon.in';

        // Update the popup HTML based on whether the user is on Amazon.com
        const displayTextElement = document.getElementById('greet');
        if (isAmazon) {
            displayTextElement.textContent = currentUrl;
        } else {
            displayTextElement.textContent = 'You are not on Amazon.com.';
        }
    });
});
