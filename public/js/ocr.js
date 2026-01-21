const imageUpload = document.getElementById('imageUpload');
const extractBtn = document.getElementById('extractBtn');
const result = document.getElementById('result');

let extractedText = '';

// extract button 
extractBtn.addEventListener('click', function() {
    
    // Get file 
    const file = imageUpload.files[0];
    
    // Check  file
    if (! file) {
        alert('Please upload an image first!');
        return;
    }
    
    //loading message
    result.textContent = 'Starting... ';
    
    // Tesseract
    Tesseract.recognize(file,'ben+eng',{
            // progress updates
            logger: function(info) {
                if (info.status) {
                    result.textContent = info.status + '... ' + Math.round(info.progress * 100) + '%';
                }
            }
        })
    .then(function(response) {
        // runs when extraction is complete
         extractedText = response.data.text;
        result.textContent = extractedText;
        console.log('Extracted text:', extractedText);
    })
    .catch(function(error) {
        // ERROr
        result.textContent = 'Error: ' + error.message;
        // console.log('Error:', error);
    });
});