// Инициализация главной страницы (вход/регистрация)
export const initIndex = (utils) => {
  console.log('Initializing index page');
  
  // Обработка переключения табов
  const tabButtons = document.querySelectorAll('.header__nav-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tab = this.getAttribute('data-tab');
      if (tab) {
        console.log(`Switching to tab: ${tab}`);
      }
    });
  });

  // Обработка формы входа
  const loginForm = document.querySelector('.form');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const phone = document.getElementById('phone')?.value;
      const password = document.getElementById('password')?.value;
      
      if (phone && password) {
        if (utils.validatePhone(phone) && utils.validatePassword(password)) {
          console.log('Login attempt:', { phone, password: '***' });
          // Здесь будет API запрос
          utils.showNotification('Вход выполнен успешно!');
        } else {
          utils.showNotification('Проверьте правильность введенных данных');
        }
      }
    });
  }
};

// Инициализация страницы восстановления пароля
export const initForgotPassword = (utils) => {
  console.log('Initializing forgot password page');
  
  const forgotPasswordForm = document.getElementById('forgot-password-form');
  const verifyCodeForm = document.getElementById('verify-code-form');
  const resendCodeBtn = document.getElementById('resend-code');

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', (event) => handleForgotPasswordSubmit(event, utils));
  }

  if (verifyCodeForm) {
    verifyCodeForm.addEventListener('submit', (event) => handleVerifyCodeSubmit(event, utils));
  }

  if (resendCodeBtn) {
    resendCodeBtn.addEventListener('click', () => handleResendCode(utils));
  }
};

// Обработчик восстановления пароля
const handleForgotPasswordSubmit = (event, utils) => {
  event.preventDefault();
  
  const phone = document.getElementById('phone')?.value;
  
  if (phone && phone.trim()) {
    if (utils.validatePhone(phone)) {
      // Переключаем формы
      const forgotPasswordForm = document.getElementById('forgot-password-form');
      const verifyCodeForm = document.getElementById('verify-code-form');
      
      if (forgotPasswordForm && verifyCodeForm) {
        forgotPasswordForm.style.display = 'none';
        verifyCodeForm.style.display = 'block';
        
        // Обновляем UI
        const title = document.querySelector('.form-container__title');
        const description = document.querySelector('.form-container__description');
        
        if (title) title.textContent = 'Введите код подтверждения';
        if (description) {
          description.textContent = `Код отправлен на номер ${phone}. Введите его для создания нового пароля.`;
        }
      }
      
      console.log('Sending verification code to:', phone);
    } else {
      utils.showNotification('Введите корректный номер телефона');
    }
  }
};

// Обработчик проверки кода и смены пароля
const handleVerifyCodeSubmit = (event, utils) => {
  event.preventDefault();
  
  const code = document.getElementById('verification-code')?.value;
  const newPassword = document.getElementById('new-password')?.value;
  const confirmPassword = document.getElementById('confirm-password')?.value;
  
  if (newPassword !== confirmPassword) {
    utils.showNotification('Пароли не совпадают');
    return;
  }
  
  if (code && code.length === 6 && utils.validatePassword(newPassword)) {
    console.log('Changing password with code:', code);
    
    utils.showNotification('Пароль успешно изменен! Перенаправляем на страницу входа...');
    setTimeout(() => {
      window.location.href = './index.html';
    }, 1500);
  } else {
    utils.showNotification('Проверьте правильность введенных данных');
  }
};

// Обработчик повторной отправки кода
const handleResendCode = (utils) => {
  const phone = document.getElementById('phone')?.value;
  
  if (phone) {
    console.log('Resending code to:', phone);
    utils.showNotification('Код отправлен повторно на номер ' + phone);
  }
};


