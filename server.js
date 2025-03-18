const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { execSync } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

const PASSWORD = '1234'; // Твой пароль

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Статичные файлы: index.html, editor.js

let serverStarted = false; // Флаг для отслеживания статуса сервера

// Маршрут для проверки пароля
app.post('/login', (req, res) => {
  if (req.body.password === PASSWORD) {
    res.sendStatus(200); // Успех
  } else {
    res.sendStatus(401); // Неверный пароль
  }
});

// Запуск сервера только после авторизации
app.post('/start-server', (req, res) => {
  if (!serverStarted) {
    serverStarted = true;
    console.log('Сервер запускается после авторизации...');
    res.sendStatus(200); // Успех
  } else {
    res.sendStatus(400); // Сервер уже запущен
  }
});

// Получение HTML-кода для редактора
app.get('/html', (req, res) => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  res.send(html);
});

// Сохранение изменений в HTML и отправка в GitHub
app.post('/save', (req, res) => {
  const newHtml = req.body.html;

  fs.writeFileSync(path.join(__dirname, 'index.html'), newHtml);

  try {
    execSync('git add .', { cwd: __dirname });
    execSync('git commit -m "Изменения через веб-редактор"', { cwd: __dirname });
    execSync('git push', { cwd: __dirname });
    res.sendStatus(200);
  } catch (err) {
    console.error('Git ошибка:', err.message);
    res.status(500).send('Ошибка при отправке в GitHub');
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log('Сервер готов к авторизации. Ждём вход...');
});
