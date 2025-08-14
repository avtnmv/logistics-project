// Импорты всех модулей
import { initApp } from './init.js';
import * as transitions from './transitions.js';
import * as pages from './pages.js';
import * as utils from './utils.js';

// Запуск приложения при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  initApp({ transitions, pages, utils });
});


