const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Путь к файлам
const htmlFilePath = path.join(__dirname, 'index.html');
const cssFilePath = path.join(__dirname, 'style.css');

// Отправка файлов
app.get('/html', (req, res) => {
    fs.readFile(htmlFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка при чтении HTML файла');
        }
        res.send(data);
    });
});

app.get('/css', (req, res) => {
    fs.readFile(cssFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка при чтении CSS файла');
        }
        res.send(data);
    });
});

// Обработка сохранения изменений
app.post('/save', (req, res) => {
    const { htmlContent, cssContent } = req.body;
    
    // Сохраняем изменения в файлы
    fs.writeFile(htmlFilePath, htmlContent, (err) => {
        if (err) {
            return res.status(500).send('Ошибка при сохранении HTML файла');
        }
    });
    
    fs.writeFile(cssFilePath, cssContent, (err) => {
        if (err) {
            return res.status(500).send('Ошибка при сохранении CSS файла');
        }
    });

    res.send('Изменения сохранены');
});

// Настройка статики
app.use(express.static('public'));
app.use(express.json());  // Для обработки json в теле запроса

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
