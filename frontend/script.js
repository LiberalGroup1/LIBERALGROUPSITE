let editor;

document.getElementById("loginBtn").addEventListener("click", () => {
  // Показываем форму ввода пароля
  document.getElementById("loginForm").classList.remove("dev-hidden");
});

document.getElementById("submitPassword").addEventListener("click", async () => {
  const password = document.getElementById("passwordInput").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  const data = await res.json();

  if (data.success) {
    // Скрываем форму пароля и показываем редактор
    document.getElementById("loginForm").classList.add("dev-hidden");
    document.getElementById("editorContainer").classList.remove("dev-hidden");

    // Получаем текущий HTML-файл
    const content = await fetch("/api/file").then(res => res.text());

    editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
      mode: "htmlmixed",
      lineNumbers: true,
      theme: "default",
    });

    editor.setValue(content);
  } else {
    alert("Неверный пароль");
  }
});

document.getElementById("saveBtn").addEventListener("click", async () => {
  const newContent = editor.getValue();

  const res = await fetch("/api/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: newContent }),
  });

  const data = await res.json();
  const statusDiv = document.getElementById("status");

  if (data.success) {
    statusDiv.textContent = "✅ Успешно сохранено в репозиторий!";
    statusDiv.style.color = "green";
  } else {
    statusDiv.textContent = "❌ Ошибка при сохранении: " + data.error;
    statusDiv.style.color = "red";
  }
});
