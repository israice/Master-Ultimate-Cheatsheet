
const routes = {
  home: './home.html',
  about: './about.html',
  contact: './contacts.html'
};

async function loadHtml(selector, url) {
  try {
    const container = document.querySelector(selector);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Ошибка загрузки ${url}`);
    container.innerHTML = await response.text();
  } catch (err) {
    console.error(err);
  }
}


function initRouter(contentSelector) {
  const contentEl = document.querySelector(contentSelector);

  async function renderRoute() {
    const hash = location.hash.slice(1) || 'home';
    const route = routes[hash];
    if (route) {
      await loadHtml(contentSelector, route);
    } else {
      contentEl.innerHTML = '<h2>404 - Страница не найдена</h2>';
    }
  }

  // Инициализация роутера при загрузке и при изменении hash
  window.addEventListener('hashchange', renderRoute);
  window.addEventListener('load', renderRoute);
}


// Загружаем шапку и футер
loadHtml('#header', './header.html');
loadHtml('#footer', './footer.html');

// Инициализация роутера
initRouter('#content');
