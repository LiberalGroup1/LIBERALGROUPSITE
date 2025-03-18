const serverUrl = 'http://localhost:3000';

document.getElementById('devLoginBtn').addEventListener('click', () => {
  document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('submitPassword').addEventListener('click', async () => {
  const password = document.getElementById('password').value;

  // Отправляем пароль на сервер для проверки
  const res = await fetch(`${serverUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });

  if (res.ok) {
    // Если пароль правильный, запускаем сервер динамически
    startServer();
  } else {
    alert('Неверный пароль!');
  }
});

async function startServer() {
  // После успешной авторизации, запускаем сервер динамически
  const res = await fetch(`${serverUrl}/start-server`);

  if (res.ok) {
    const html = await fetch(`${serverUrl}/html`).then(r => r.text());
    document.getElementById('htmlEditor').value = html;
    document.getElementById('editorArea').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('devLoginBtn').style.display = 'none';
  } else {
    alert('Ошибка при запуске сервера.');
  }
}

document.getElementById('saveBtn').addEventListener('click', async () => {
  const newHtml = document.getElementById('htmlEditor').value;

  const res = await fetch(`${serverUrl}/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html: newHtml })
  });

  if (res.ok) {
    alert('Изменения сохранены и отправлены в GitHub!');
  } else {
    alert('Ошибка при сохранении.');
  }
});
