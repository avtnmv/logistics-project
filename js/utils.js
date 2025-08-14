/**
 * Утилиты и помощники
 */

// Валидация телефонного номера
export const validatePhone = (phone) => {
  const phoneRegex = /^\+\d{1,3}\d{6,14}$/;
  return phoneRegex.test(phone);
};

// Валидация пароля
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Форматирование телефонного номера
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  if (!cleaned.startsWith('+')) {
    return '+' + cleaned;
  }
  
  return cleaned;
};

// Показать уведомление
export const showNotification = (message, type = 'info') => {
  alert(message);
};

// Дебаунс функция
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};


