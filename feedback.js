document.addEventListener('DOMContentLoaded', () => {
    setupFeedbackForm();
});

function setupFeedbackForm() {
    const feedbackMessage = document.getElementById('feedbackMessage');
    const charCount = document.getElementById('charCount');
    
    if (feedbackMessage) {
        feedbackMessage.addEventListener('input', (e) => {
            charCount.textContent = e.target.value.length;
        });
    }
}

function submitFeedback(event) {
    event.preventDefault();
    
    const feedbackType = document.getElementById('feedbackType').value;
    const feedbackEmail = document.getElementById('feedbackEmail').value;
    const feedbackSubject = document.getElementById('feedbackSubject').value;
    const feedbackMessage = document.getElementById('feedbackMessage').value;
    const feedbackFile = document.getElementById('feedbackFile').files[0];
    const contactMe = document.getElementById('contactMe').checked;
    
    // Validation
    if (!feedbackType || !feedbackEmail || !feedbackSubject || !feedbackMessage) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    if (!validateEmail(feedbackEmail)) {
        showNotification('Please enter a valid email address', 'warning');
        return;
    }
    
    // Save feedback
    const feedbacks = StorageManager.getItem('feedbacks') || [];
    const feedback = {
        id: 'FB-' + Date.now(),
        type: feedbackType,
        email: feedbackEmail,
        subject: feedbackSubject,
        message: feedbackMessage,
        hasAttachment: !!feedbackFile,
        contactMe: contactMe,
        submittedAt: new Date().toISOString(),
        status: 'pending'
    };
    
    feedbacks.push(feedback);
    StorageManager.setItem('feedbacks', feedbacks);
    
    // Show success message
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('feedbackForm').reset();
    document.getElementById('charCount').textContent = '0';
    
    showNotification('Thank you for your feedback!', 'success');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
    }, 5000);
}