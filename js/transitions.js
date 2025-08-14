const createSlide = (duration, ease) => ({
  leave() {
    const done = this.async();
    const tl = gsap.timeline();
    
    tl.to('.transition-overlay', { x: '0%', duration, ease })
      .call(done)
      .to('.transition-overlay', { 
        x: '100%', 
        duration, 
        ease,
        onComplete: () => gsap.set('.transition-overlay', { x: '-100%' })
      });
    
    return tl;
  },
  enter() {}
});

const TRANSITIONS = {
  slideLeft: createSlide(0.68, 'power2.inOut'),
  slideFast: createSlide(0.34, 'power3.inOut'),
  slideSlow: createSlide(1.02, 'power1.inOut')
};

function init(opts = {}) {
  const { transition = 'slideLeft', overlayColor = '#2c2c2c', namespace } = opts;
  
  // Создаем стили и overlay одним блоком
  if (!document.querySelector('.transition-overlay')) {
    const style = document.createElement('style');
    style.textContent = `.transition-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:${overlayColor};z-index:9999;transform:translateX(-100%)}`;
    document.head.appendChild(style);
    
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    document.body.appendChild(overlay);
  }
  
  const selectedTransition = TRANSITIONS[transition];
  if (selectedTransition) {
    const transitionConfig = { name: transition, ...selectedTransition };
    if (namespace) transitionConfig.namespace = namespace;
    
    // Инициализация Barba.js с упрощенной конфигурацией
    barba.init({ 
      transitions: [transitionConfig],
      // Базовые настройки для стабильной работы
      timeout: 5000
    });
    
    // Добавляем обработчики для улучшения стабильности
    barba.hooks.before(() => {
      console.log('Barba transition started');
    });
    
    barba.hooks.after(() => {
      console.log('Barba transition completed');
      // Убеждаемся, что страница корректно загружена
      window.scrollTo(0, 0);
    });
    
    barba.hooks.enter(() => {
      console.log('Entering new page');
    });
    
    // Обработка ошибок через try-catch в хуках
    barba.hooks.before(() => {
      try {
        // Проверяем, что все необходимые элементы на месте
        const container = document.querySelector('[data-barba="container"]');
        if (!container) {
          console.warn('Barba container not found, forcing reload');
          window.location.reload();
        }
      } catch (error) {
        console.error('Error in before hook:', error);
      }
    });
    
  } else {
    console.warn(`Transition "${transition}" not found`);
  }
}

// Экспорт функций для использования в модулях
export { init };
export const add = (name, transition) => TRANSITIONS[name] = transition;
export const setColor = (color) => {
  const el = document.querySelector('.transition-overlay');
  if (el) el.style.background = color;
};
export const list = () => Object.keys(TRANSITIONS);