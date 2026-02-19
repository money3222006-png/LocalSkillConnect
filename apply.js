// Form progress tracking
let currentStep = 1;
const totalSteps = 6;

document.addEventListener('DOMContentLoaded', () => {
    updateProgressBar();
    setupFormValidation();
    setupCharacterCounter();
});

function updateProgressBar() {
    const percentage = (currentStep / totalSteps) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentage + '%';
    progressBar.textContent = Math.round(percentage) + '%';
}

function setupFormValidation() {
    const form = document.getElementById('applicationForm');
    
    form.addEventListener('change', () => {
        // Count filled required fields
        const requiredFields = form.querySelectorAll('[required]');
        const filledFields = Array.from(requiredFields).filter(field => {
            if (field.type === 'checkbox') {
                return field.checked;
            }
            return field.value.trim() !== '';
        }).length;
        
        const progress = (filledFields / requiredFields.length) * 100;
        currentStep = Math.ceil(progress / (100 / totalSteps));
        updateProgressBar();
    });
}

function setupCharacterCounter() {
    const textarea = document.querySelector('textarea[name="summary"]');
    if (textarea) {
        textarea.addEventListener('input', (e) => {
            const count = e.target.value.length;
            const maxLength = 500;
            if (count > maxLength) {
                e.target.value = e.target.value.substring(0, maxLength);
            }
        });
    }
}

function submitApplication(event) {
    event.preventDefault();
    
    const form = document.getElementById('applicationForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validation
    if (!data.firstName || !data.lastName) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address', 'warning');
        return;
    }
    
    if (!validatePhone(data.phone)) {
        showNotification('Please enter a valid phone number', 'warning');
        return;
    }
    
    if (parseFloat(data.hourlyRate) < 5) {
        showNotification('Hourly rate must be at least $5', 'warning');
        return;
    }
    
    // Save to localStorage
    const applications = StorageManager.getItem('applications') || [];
    const applicationId = 'APP-' + Date.now();
    
    const application = {
        id: applicationId,
        ...data,
        submittedAt: new Date().toISOString(),
        status: 'pending'
    };
    
    applications.push(application);
    StorageManager.setItem('applications', applications);
    
    // Show success message
    showNotification('Application submitted successfully! Check your email for confirmation.', 'success');
    
    // Reset form and progress
    form.reset();
    currentStep = 1;
    updateProgressBar();
    
    // Redirect after delay
    setTimeout(() => {
        window.location.href = 'recruit.html';
    }, 2000);
}