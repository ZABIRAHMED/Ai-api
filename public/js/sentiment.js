// Get references to HTML elements
const analyzeBtn = document.getElementById('analyzeBtn');
const mood = document.getElementById('mood');

// Analyze mood - calls our backend server
analyzeBtn.addEventListener('click', function() {
    
    // extractedText comes from ocr.js
    if (!extractedText) {
        alert('Please extract text first! ');
        return;
    }
    
    mood.textContent = 'Analyzing mood...';
    
    // Call OUR server (not Hugging Face directly!)
    fetch('/api/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: extractedText })
    })
    .then(function(response) {
        return response. json();
    })
    .then(function(data) {
        console.log('Sentiment result:', data);
        
        if (data && data[0] && data[0][0]) {
            const topEmotion = data[0][0].label;
            const confidence = Math.round(data[0][0].score * 100);
            mood.textContent = topEmotion + ' (' + confidence + '% confident)';
        } else {
            mood.textContent = 'Could not detect mood.  Try again.';
        }
    })
    .catch(function(error) {
        mood.textContent = 'Error: ' + error.message;
    });
});