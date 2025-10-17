// Функция для подгрузки HTML
function loadHTML(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (id === 'header') initNavigation();
    });
}

// Функция загрузки страниц с анимацией
function loadPage(page) {
  const content = document.getElementById('content');
  
  // 1. Убираем старый контент (анимация исчезновения)
  content.classList.add('hidden');
  
  // 2. Немного ждём (чтобы успела сработать анимация)
  setTimeout(() => {
    fetch(`${page}.html`)
      .then(response => {
        if (!response.ok) throw new Error("Страница не найдена");
        return response.text();
      })
      .then(html => {
        content.innerHTML = html;
        content.classList.remove('hidden'); // Плавное появление
      })
      .catch(() => {
        content.innerHTML = `<h1>404</h1><p>Страница не найдена</p>`;
        content.classList.remove('hidden');
      });
  }, 300); // задержка 300 мс синхронизирована с transition в CSS
}

// Навигация по hash-ссылкам
function initNavigation() {
  const navigate = () => {
    const hash = window.location.hash.substring(1) || 'home';
    loadPage(hash);
  };

  window.addEventListener('hashchange', navigate);
  navigate();
}

// Инициализация
loadHTML('header', 'header.html');
loadHTML('footer', 'footer.html');
