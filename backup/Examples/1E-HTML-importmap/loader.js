// Функция для динамической загрузки HTML через fetch
export async function loadHTML(url, container) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Cannot load ${url}`);
    const html = await response.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Error loading content.</p>";
  }
}
