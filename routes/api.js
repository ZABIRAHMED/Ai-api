const express = require('express');
const router = express.Router();

// POST /api/analyze - Analyze sentiment of text
router.post('/analyze', async function(req, res) {
    
    const text = req.body.text;
    
    if (!text) {
        return res.status(400).json({ error: 'No text provided' });
    }
    
    try {
        // Call Hugging Face API (token is hidden in .env!)
        const response = await fetch('https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-emotion-multilingual-latest', {
            method:  'POST',
            headers:  {
                'Authorization': 'Bearer ' + process.env.HF_TOKEN,
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({ inputs: text })
        });
        
        const data = await response.json();
        
        // Send result back to frontend
        res.json(data);
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Failed to analyze sentiment' });
    }
});

module.exports = router;