document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.querySelector('.login-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = '#e74c3c';
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        input.style.borderColor = '#e1e5e9';
    }

    // Real-time validation
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            showError(this, 'Please enter a valid email address');
        } else {
            clearError(this);
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (this.value && this.value.length < 6) {
            showError(this, 'Password must be at least 6 characters long');
        } else {
            clearError(this);
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearError(emailInput);
        clearError(passwordInput);
        
        let isValid = true;
        
        // Validate email
        if (!emailInput.value) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!passwordInput.value) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters long');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                loginBtn.classList.remove('loading');
                loginBtn.disabled = false;
                
                // Show success message
                showNotification('Login successful! Redirecting...', 'success');
                
                // In a real application, you would redirect to the dashboard
                setTimeout(() => {
                    console.log('Redirecting to dashboard...');
                }, 2000);
            }, 2000);
        }
    });

    // Social login handlers
    document.querySelector('.social-btn.google').addEventListener('click', function() {
        showNotification('Google login would be implemented here', 'info');
    });

    document.querySelector('.social-btn.github').addEventListener('click', function() {
        showNotification('GitHub login would be implemented here', 'info');
    });

    // Forgot password handler
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Password reset functionality would be implemented here', 'info');
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add notification styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 16px 24px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    z-index: 1000;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    max-width: 300px;
                }
                
                .notification.success {
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                }
                
                .notification.error {
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                }
                
                .notification.info {
                    background: linear-gradient(135deg, #3498db, #2980b9);
                }
                
                .notification.show {
                    transform: translateX(0);
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add input focus effects
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Remember me functionality
    const rememberCheckbox = document.getElementById('remember');
    
    // Load saved email if remember me was checked
    if (localStorage.getItem('rememberMe') === 'true') {
        emailInput.value = localStorage.getItem('savedEmail') || '';
        rememberCheckbox.checked = true;
    }

    // Save email when remember me is checked
    rememberCheckbox.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('rememberMe', 'true');
            if (emailInput.value) {
                localStorage.setItem('savedEmail', emailInput.value);
            }
        } else {
            localStorage.setItem('rememberMe', 'false');
            localStorage.removeItem('savedEmail');
        }
    });

    // Save email on input if remember me is checked
    emailInput.addEventListener('input', function() {
        if (rememberCheckbox.checked) {
            localStorage.setItem('savedEmail', this.value);
        }
    });
});
