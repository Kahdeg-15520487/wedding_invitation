document.addEventListener('DOMContentLoaded', function () {
    const wishesForm = document.getElementById('wishes-form');
    const formMessages = document.getElementById('form-messages');

    if (!wishesForm) {
        console.error('Wishes form not found in the DOM');
        return;
    }

    wishesForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('Form submission intercepted');
        const formData = new FormData(wishesForm);
        const wishData = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            date: new Date().toISOString()
        };
        if (!wishData.name || !wishData.message) {
            formMessages.innerHTML = '<p class="wed_form_error">Vui lòng điền tên và lời chúc của bạn.</p>';
            return false;
        }
        saveWish(wishData);
        return false;
    });

    function saveWish(wishData) {
        localStorage.setItem('weddingWishes', true);
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
                formMessages.innerHTML = '<p class="wed_form_success">Cảm ơn bạn đã gửi lời chúc!</p><br/>';
                formMessages.innerHTML += `<p class="wed_form_info"><strong>${escapeHtml(wishData.message)}</strong></p>`;
                wishesForm.reset();
                const formFields = document.querySelector(".wed_form_fields");
                if (formFields) {
                    setTimeout(() => {
                        formFields.style.transition = "opacity 0.6s ease-out";
                        formFields.style.opacity = "0";
                        setTimeout(() => {
                            formFields.style.display = "none";
                        }, 600);
                    }, 200);
                }
            })
            .catch(error => {
                formMessages.innerHTML = '<p class="wed_form_error">Đã xảy ra lỗi khi gửi lời chúc. Vui lòng thử lại sau.</p>';
            });
    }
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});