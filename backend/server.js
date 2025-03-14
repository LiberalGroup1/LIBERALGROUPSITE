const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Проверка пароля разработчика
app.post("/api/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.DEV_PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Отправить HTML-файл в редактор
app.get("/api/file", (req, res) => {
  const filePath = path.join(__dirname, "../frontend", process.env.TARGET_FILE);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Ошибка чтения файла");
    res.send(data);
  });
});

// Сохранить изменения в GitHub
app.post("/api/save", async (req, res) => {
  const { content } = req.body;

  const repo = process.env.GITHUB_REPO;
  const filePath = process.env.TARGET_FILE;
  const token = process.env.GITHUB_TOKEN;

  try {
    // Сначала получаем SHA файла, чтобы GitHub позволил его изменить
    const getUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;
    const getResp = await axios.get(getUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const sha = getResp.data.sha;

    // Теперь делаем PUT-запрос с новым содержимым
    const putResp = await axios.put(
      getUrl,
      {
        message: "Изменения через веб-редактор",
        content: Buffer.from(content).toString("base64"),
        sha: sha,
      },
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Ошибка при пуше в GitHub:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});