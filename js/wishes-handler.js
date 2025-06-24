document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - wishes handler initializing');
    
    // Get the form and messages container
    const wishesForm = document.getElementById('wishes-form');
    
    if (!wishesForm) {
        console.error('Wishes form not found in the DOM');
        return;
    }
    
    console.log('Wishes form found, attaching submit handler');
    const formMessages = document.getElementById('form-messages');
    
    // Load existing wishes when page loads
    if (typeof loadWishes === 'function') {
        loadWishes();
    } else {
        console.warn('loadWishes function is not defined');
    }
    
    // Handle form submission
    wishesForm.addEventListener('submit', function(e) {
        // Prevent the default form submission
        e.preventDefault();
        console.log('Form submission intercepted');
        
        // Get form data
        const formData = new FormData(wishesForm);
        const wishData = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            date: new Date().toISOString()
        };
        
        console.log('Form data collected:', wishData);
        
        // Simple validation
        if (!wishData.name || !wishData.message) {
            formMessages.innerHTML = '<p class="wed_form_error">Vui lòng điền tên và lời chúc của bạn.</p>';
            return false;
        }
        
        // Save the wish
        saveWish(wishData);
        
        // Show success message
        formMessages.innerHTML = '<p class="wed_form_success">Cảm ơn bạn đã gửi lời chúc!</p>';
        
        // Reset form
        wishesForm.reset();
        
        // Reload wishes
        if (typeof loadWishes === 'function') {
            loadWishes();
        }
        
        return false;
    });
    
    // Function to save a wish
    function saveWish(wishData) {
        // Get existing wishes from localStorage
        let wishes = JSON.parse(localStorage.getItem('weddingWishes') || '[]');
        
        // Add the new wish
        wishes.push(wishData);
        
        // Save to localStorage (uncommented for local backup)
        localStorage.setItem('weddingWishes', JSON.stringify(wishes));
        
        // Log the wishes to console
        console.log(JSON.stringify(wishes));
        
        // Send the wish to the server
        fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wishData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Wish saved to server:', data);
        })
        .catch(error => {
            console.error('Error saving wish to server:', error);
        });
    }
    
    // Helper function to prevent XSS
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});