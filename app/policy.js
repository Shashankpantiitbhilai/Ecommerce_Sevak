document.getElementById('policyForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get policy input from the form
    const policyInput = document.getElementById('userInput').value;

    // Prepare the data for the POST request
    const formData = {
        policy: policyInput
    };

    // Make a fetch POST request to the server
    fetch('http://localhost:3000/policy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "success") {
                // Open popup4.html in a new popup window
                const popupWindow = window.open(chrome.runtime.getURL('popup4.html'), '_blank', 'width=400, height=400');

                // Pass the data to the opened popup
                popupWindow.onload = function () {
                    popupWindow.postMessage({ action: "updatePopup4", output: data.output }, '*');
                };
            } else {
                // Handle other cases if needed
                console.error("Error:", data.error);
            }
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
});
