/**
 * Инициализация приложения
 */

// Конфигурация приложения
const CONFIG = {
  transitions: {
    default: 'slideLeft',
    overlayColor: '#2c2c2c'
  }
};

// Получить namespace текущей страницы
const getCurrentPageNamespace = () => {
  const container = document.querySelector('[data-barba-namespace]');
  return container ? container.getAttribute('data-barba-namespace') : null;
};

// Инициализация переходов Barba.js
const initTransitions = (transitions) => {
  try {
    transitions.init({
      transition: CONFIG.transitions.default,
      overlayColor: CONFIG.transitions.overlayColor
    });
    console.log('Barba transitions initialized');
    
    // Простой fallback для критических случаев
    if (!window.barbaFallbackAdded) {
      window.barbaFallbackAdded = true;
      
      // Добавляем обработчик для принудительной навигации при проблемах
      window.addEventListener('beforeunload', () => {
        // Очищаем все таймеры при уходе со страницы
        if (window.barbaFallbackTimer) {
          clearTimeout(window.barbaFallbackTimer);
        }
      });
    }
    
  } catch (error) {
    console.error('Failed to initialize Barba transitions:', error);
    // Fallback: обычная навигация
    console.log('Using fallback navigation');
  }
};

// Инициализация логики страниц
const initPages = (pages, utils) => {
  const currentPage = getCurrentPageNamespace();
  
  switch (currentPage) {
    case 'login':
      pages.initIndex(utils);
      break;
    case 'forgot-password':
      pages.initForgotPassword(utils);
      break;
    default:
      console.log('No specific page logic for:', currentPage);
  }
};

// Главная функция инициализации приложения
export const initApp = (modules) => {
  console.log('App initialization started');
  
  const { transitions, pages, utils } = modules;
  
  initTransitions(transitions);
  initPages(pages, utils);
  
  // Переинициализация при переходах между страницами
  const reinitializePages = () => {
    initPages(pages, utils);
  };
  
  // Настраиваем обработку переходов Barba.js
  if (window.barba) {
    window.barba.hooks.after(reinitializePages);
  }
  
  console.log('App initialization completed');
};

// Экспорт конфигурации для использования в других модулях
export { CONFIG };
