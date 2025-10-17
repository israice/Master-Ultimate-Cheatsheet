// Функция для подгрузки HTML из файла
// Эта функция загружает содержимое HTML-файла и вставляет его в элемент с указанным id.
// Если это заголовок (header), то инициализируем навигацию и перетаскивание.
function loadHTML(id, file) {
  // Используем fetch для получения содержимого файла
  fetch(file)
    .then(response => response.text())  // Преобразуем ответ в текст
    .then(html => {
      // Вставляем HTML в элемент по id
      document.getElementById(id).innerHTML = html;
      
      // Если это заголовок, инициализируем дополнительные функции
      if (id === 'header') {
        initNavigation();       // Инициализация навигации
        initDragToScroll();     // Инициализация перетаскивания для подменю
      }
    });
}

// Функция для инициализации перетаскивания в подменю (subtopnav)
// Это позволяет прокручивать горизонтальное меню мышью, как на мобильных устройствах.
function initDragToScroll() {
  const container = document.getElementById('subtopnav');  // Находим контейнер подменю
  if (!container) return;  // Если контейнера нет, выходим из функции

  let isDragging = false;  // Флаг, указывающий, что перетаскивание активно
  let startX;              // Начальная позиция мыши по X
  let startScrollLeft;     // Начальная позиция прокрутки контейнера

  // Событие: начало перетаскивания (нажатие мыши)
  container.addEventListener('mousedown', (event) => {
    isDragging = true;                       // Включаем флаг перетаскивания
    startX = event.pageX;                    // Запоминаем позицию мыши
    startScrollLeft = container.scrollLeft;  // Запоминаем текущую прокрутку
    document.body.style.cursor = 'grabbing'; // Меняем курсор на "захват"
    event.preventDefault();                  // Предотвращаем стандартное поведение
  });

  // Событие: процесс перетаскивания (движение мыши)
  document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;                 // Если не перетаскиваем, выходим
    const deltaX = event.pageX - startX;     // Вычисляем смещение мыши
    container.scrollLeft = startScrollLeft - deltaX;  // Прокручиваем контейнер
    event.preventDefault();                  // Предотвращаем стандартное поведение
  });

  // Событие: окончание перетаскивания (отпускание мыши)
  document.addEventListener('mouseup', () => {
    isDragging = false;                      // Выключаем флаг
    document.body.style.cursor = 'default';  // Возвращаем стандартный курсор
  });

  // Предотвращаем клик по ссылкам, если было перетаскивание (чтобы не переходило по ссылке случайно)
  container.addEventListener('click', (event) => {
    if (Math.abs(event.pageX - startX) > 5) {  // Если смещение больше 5 пикселей
      event.preventDefault();                  // Блокируем клик
    }
  }, true);  // true - захват события на фазе захвата
}

// Функция для загрузки страницы с анимацией
// Загружает HTML-страницу по имени, с эффектом плавного исчезновения и появления.
function loadPage(page) {
  const content = document.getElementById('content');  // Находим контейнер для контента

  // 1. Добавляем класс для анимации исчезновения старого контента
  content.classList.add('hidden');

  // 2. Ждем 300 мс (время анимации), чтобы старый контент исчез
  setTimeout(() => {
    // Загружаем новый контент
    fetch(`${page}.html`)
      .then(response => {
        if (!response.ok) throw new Error("Страница не найдена");  // Проверяем на ошибку
        return response.text();  // Преобразуем в текст
      })
      .then(html => {
        content.innerHTML = html;             // Вставляем новый HTML
        content.classList.remove('hidden');   // Убираем класс скрытия (появление)
      })
      .catch(() => {
        // Если ошибка (например, 404), показываем сообщение
        content.innerHTML = `<h1>404</h1><p>Страница не найдена</p>`;
        content.classList.remove('hidden');
      });
  }, 300);  // Задержка синхронизирована с CSS transition
}

// Функция для инициализации навигации по хэш-ссылкам
// Следит за изменениями в URL (hash) и загружает соответствующую страницу.
function initNavigation() {
  const navigate = () => {
    // Получаем хэш из URL (без #), если пусто - 'home'
    const hash = window.location.hash.substring(1) || 'home';
    loadPage(hash);  // Загружаем страницу
  };

  // Добавляем слушатель на изменение хэша
  window.addEventListener('hashchange', navigate);
  
  // Вызываем сразу для начальной загрузки
  navigate();
}

// Инициализация всего скрипта
// Загружаем заголовок и футер
loadHTML('header', 'header.html');
loadHTML('footer', 'footer.html');