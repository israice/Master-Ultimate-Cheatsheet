// Функция для динамического импорта HTML
async function loadHTML(id, url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Не удалось загрузить ${url}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

// Динамически подгружаем header и footer
loadHTML('header', './header.html');
loadHTML('footer', './footer.html');
