// Contact form functionality

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = this.form?.querySelector('button[type="submit"]');
        this.formData = {};
        this.isSubmitting = false;
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.bindEvents();
        this.setupValidation();
        this.loadSavedData();
    }
    
    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.form.addEventListener('input', (e) => this.handleInput(e));
        this.form.addEventListener('blur', (e) => this.handleBlur(e), true);
        
        // Save form data locally (in case of accidental refresh)
        this.form.addEventListener('input', utils.debounce(() => this.saveFormData(), 1000));
        
        // Handle form reset
        this.form.addEventListener('reset', () => this.handleReset());
    }
    
    setupValidation() {
        // Add required field indicators
        const requiredFields = this.form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            const label = this.form.querySelector(`label[for="${field.id}"]`);
            if (label && !label.textContent.includes('*')) {
                label.innerHTML += ' <span class="required-indicator">*</span>';
            }
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        // Validate form
        if (!this.validateForm()) {
            this.showError('Por favor, corrige los errores en el formulario.');
            return;
        }
        
        this.submitForm();
    }
    
    async submitForm() {
        this.isSubmitting = true;
        this.updateSubmitButton(true);
        
        try {
            // Collect form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate API call (replace with actual endpoint)
            await this.sendFormData(data);
            
            // Success
            this.showSuccess('¡Gracias por tu mensaje! Te contactaremos pronto.');
            this.form.reset();
            this.clearSavedData();
            
            // Track event (if analytics is available)
            if (window.gtag) {
                gtag('event', 'contact_form_submit', {
                    event_category: 'engagement',
                    event_label: data.proyecto || 'unknown'
                });
            }
            
        } catch (error) {
            utils.errorHandler.log(error, 'form submission');
            this.showError('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
        } finally {
            this.isSubmitting = false;
            this.updateSubmitButton(false);
        }
    }
    
    async sendFormData(data) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real application, this would be your API endpoint
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // });
        // 
        // if (!response.ok) {
        //     throw new Error('Failed to submit form');
        // }
        // 
        // return response.json();
        
        // For demo purposes, log the data
        console.log('Form data to be sent:', data);
        
        // Simulate success
        return { success: true, message: 'Form submitted successfully' };
    }
    
    handleInput(e) {
        const field = e.target;
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA' || field.tagName === 'SELECT') {
            this.validateField(field);
        }
    }
    
    handleBlur(e) {
        const field = e.target;
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA' || field.tagName === 'SELECT') {
            this.validateField(field, true);
        }
    }
    
    handleReset() {
        // Clear validation states
        const fields = this.form.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            this.clearFieldValidation(field);
        });
        
        this.clearSavedData();
        this.hideMessages();
    }
    
    validateForm() {
        const fields = this.form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field, true)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field, showError = false) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous validation
        this.clearFieldValidation(field);
        
        // Required validation
        if (field.hasAttribute('required') && !utils.validation.required(value)) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio.';
        }
        
        // Email validation
        else if (fieldName === 'email' && value && !utils.validation.email(value)) {
            isValid = false;
            errorMessage = 'Por favor, introduce un email válido.';
        }
        
        // Phone validation
        else if (fieldName === 'telefono' && value && !utils.validation.phone(value)) {
            isValid = false;
            errorMessage = 'Por favor, introduce un teléfono válido.';
        }
        
        // Message length validation
        else if (fieldName === 'mensaje' && value && !utils.validation.minLength(value, 10)) {
            isValid = false;
            errorMessage = 'El mensaje debe tener al menos 10 caracteres.';
        }
        
        // Show validation state
        if (!isValid && showError) {
            this.showFieldError(field, errorMessage);
        } else if (isValid && value) {
            this.showFieldSuccess(field);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        field.classList.add('error');
        field.classList.remove('success');
        
        // Create or update error message
        let errorEl = field.parentNode.querySelector('.field-error');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'field-error';
            field.parentNode.appendChild(errorEl);
        }
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
    
    showFieldSuccess(field) {
        field.classList.add('success');
        field.classList.remove('error');
        
        // Hide error message
        const errorEl = field.parentNode.querySelector('.field-error');
        if (errorEl) {
            errorEl.style.display = 'none';
        }
    }
    
    clearFieldValidation(field) {
        field.classList.remove('error', 'success');
        
        const errorEl = field.parentNode.querySelector('.field-error');
        if (errorEl) {
            errorEl.style.display = 'none';
        }
    }
    
    updateSubmitButton(isLoading) {
        if (!this.submitBtn) return;
        
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('loading');
            if (btnText) btnText.style.opacity = '0';
            if (btnLoading) btnLoading.style.opacity = '1';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
            if (btnText) btnText.style.opacity = '1';
            if (btnLoading) btnLoading.style.opacity = '0';
        }
    }
    
    showSuccess(message) {
        this.hideMessages();
        this.showMessage(message, 'success');
    }
    
    showError(message) {
        this.hideMessages();
        this.showMessage(message, 'error');
    }
    
    showMessage(message, type) {
        // Remove existing message
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.innerHTML = `
            <div class="message-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Insert at the top of the form
        this.form.insertBefore(messageEl, this.form.firstChild);
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.style.opacity = '0';
                    setTimeout(() => messageEl.remove(), 300);
                }
            }, 5000);
        }
        
        // Scroll to message
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    hideMessages() {
        const messages = this.form.querySelectorAll('.form-message');
        messages.forEach(message => message.remove());
    }
    
    saveFormData() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        utils.storage.set('contact_form_data', data);
    }
    
    loadSavedData() {
        const savedData = utils.storage.get('contact_form_data');
        if (!savedData) return;
        
        // Ask user if they want to restore data
        const restore = confirm('Detectamos datos del formulario guardados previamente. ¿Deseas restaurarlos?');
        if (!restore) {
            this.clearSavedData();
            return;
        }
        
        // Restore form data
        Object.keys(savedData).forEach(key => {
            const field = this.form.querySelector(`[name="${key}"]`);
            if (field && savedData[key]) {
                field.value = savedData[key];
            }
        });
    }
    
    clearSavedData() {
        utils.storage.remove('contact_form_data');
    }
}

// Add CSS for contact form enhancements
const contactFormStyle = document.createElement('style');
contactFormStyle.textContent = `
    .form-group {
        position: relative;
    }
    
    .required-indicator {
        color: #ef4444;
        font-weight: bold;
    }
    
    input.error,
    textarea.error,
    select.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    input.success,
    textarea.success,
    select.success {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    .field-error {
        display: none;
        color: #ef4444;
        font-size: 14px;
        margin-top: 5px;
        font-weight: 500;
    }
    
    .form-message {
        margin-bottom: 20px;
        padding: 15px;
        border-radius: 8px;
        transition: all 0.3s ease;
        animation: slideDown 0.3s ease;
    }
    
    .form-message-success {
        background: #d1fae5;
        border: 1px solid #10b981;
        color: #047857;
    }
    
    .form-message-error {
        background: #fee2e2;
        border: 1px solid #ef4444;
        color: #dc2626;
    }
    
    .message-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .message-content i {
        font-size: 18px;
    }
    
    .btn.loading {
        position: relative;
        pointer-events: none;
    }
    
    .btn-text,
    .btn-loading {
        transition: opacity 0.3s ease;
    }
    
    .btn-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Enhanced form styling */
    .contact-form {
        position: relative;
    }
    
    .contact-form::before {
        content: '';
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(251, 191, 36, 0.1));
        border-radius: 24px;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .contact-form:hover::before {
        opacity: 1;
    }
    
    /* Focus improvements */
    input:focus,
    textarea:focus,
    select:focus {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(249, 115, 22, 0.15);
    }
    
    /* Placeholder enhancements */
    input::placeholder,
    textarea::placeholder {
        color: #9ca3af;
        transition: color 0.3s ease;
    }
    
    input:focus::placeholder,
    textarea:focus::placeholder {
        color: transparent;
    }
    
    /* Mobile optimizations */
    @media (max-width: 768px) {
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .contact-form {
            padding: 20px;
        }
        
        .contact-form::before {
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
        }
    }
`;
document.head.appendChild(contactFormStyle);

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contactForm = new ContactForm();
});
