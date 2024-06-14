const express = require('express');
const bodyParser = require('body-parser');
const Replicate = require('replicate');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const replicate = new Replicate({
    auth: "r8_Jhh0ZzRq9bJQ4BXM0XK7VNJM6afQrzh15AewL",
});

// Route to handle POST requests to /saveData
app.post('/saveData', (req, res) => {
    const inputData = req.body.userInput;
    console.log(req.body);
    fs.appendFile('output.txt', inputData, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving data.');
        } else {
            console.log('Data saved successfully.');
            res.status(200).send('Data saved successfully.');
        }
    });
});

// Route to handle POST requests to /policy
// Route to handle POST requests to /policy
app.post('/policy', async (req, res) => {
    const policyData = req.body.policy;

    try {
        const response = await replicate.run(
            "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
            {
                input: {
                    debug: false,
                    top_k: 50,
                    top_p: 1,
                    prompt: policyData + "Analyze the privacy policy in 5 points: Data Collection: What data is collected and how? Purpose of Data Usage: Why is data collected and how will it be used? Data Sharing: Is user data shared with third parties? If so, under what conditions? Data Protection Measures: How is user data protected from unauthorized access or misuse? User Rights: What rights do users have regarding their personal data, and how can they exercise them?\n\nProvide a brief summary of each point's key findings or concerns from the privacy policy analysis.",
                    temperature: 0.5,
                    system_prompt: "You are a helpful, respectful and honest assistant.",
                    max_new_tokens: 200,
                    min_new_tokens: -1
                }
            }
        );

        // Log response without quotes and commas
        console.log(JSON.stringify(response, null, 2).replace(/"/g, '').replace(/,/g, ''));

        // Check if the response is successful (you may need to adapt this based on the response structure)
        if (response != 'undefined') {
            // Send a response with status 200 and the data without quotes, commas, and square brackets
            res.status(200).json({
                status: 'success',
                output: JSON.stringify(response, null, 2)
                    .replace(/"/g, '')   // Remove double quotes
                    .replace(/,/g, '')   // Remove commas
                    .replace(/\[/g, '')  // Remove opening square brackets
                    .replace(/\]/g, '')  // Remove closing square brackets
                    .replace(/\n/g, '')  // Remove newline characters
            });



        } else {
            // Handle other cases if needed
            res.status(500).json({ error: 'Error generating output.' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error generating output.' });
    }
});


function formatResponse(response) {
    // Convert the response to a string with 2-space indentation and remove square brackets
    const formattedOutput = JSON.stringify(response, null, 2).replace(/[\[\]]/g, '');

    // Split the formatted string into an array of lines
    const lines = formattedOutput.split('\n');

    // Remove double quotes and commas from each line
    const cleanedLines = lines.map(line => line.replace(/["',]/g, '').trim());

    // Join the cleaned lines into a single string with <li> tags for each line
    const pointwiseList = cleanedLines.map(line => `<li>${line}</li>`).join('');

    // Wrap the pointwise list in <ul> tags
    const finalOutput = `<ul>${pointwiseList}</ul>`;

    return finalOutput;
}


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
