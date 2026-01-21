// Get references to HTML elements
const imageUpload = document.getElementById('imageUpload');
const extractBtn = document.getElementById('extractBtn');
const result = document.getElementById('result');

// extract button 
extractBtn.addEventListener('click', function() {
    
 
    const file = imageUpload.files[0];
    

    if (! file) {
        alert('Please upload an image first!');
        return;
    }
    
   
    result.textContent = 'Starting... ';
    
    // Tesseract
    Tesseract.recognize(
        file,
        'ben+eng',
        {
            // progress updates
            logger: function(info) {
                if (info.status) {
                    result.textContent = info.status + '... ' + Math.round(info.progress * 100) + '%';
                }
                console.log(info);
            }
        }
    ).then(function(response) {
        
        const extractedText = response.data.text;
        result.textContent = extractedText;
        console.log('Extracted text:', extractedText);
    }).catch(function(error) {
        // ERROr
        result.textContent = 'Error: ' + error.message;
        console.log('Error:', error);
    });
});
