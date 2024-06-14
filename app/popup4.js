// popup4.js
window.addEventListener('message', function (event) {
    if (event.data.action === "updatePopup4") {
        const outputText = document.getElementById('outputText');
        if (outputText) {
            outputText.textContent = event.data.output;
        }
    }
});
