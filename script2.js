document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Останавливаем переход по ссылке

        // Получаем ID модального окна
        const targetModalId = this.getAttribute('data-target');
        const targetModal = document.getElementById(targetModalId);

        // Закрываем все модальные окна перед тем как открыть новое
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
            modal.classList.add('hide');
        });

        // Открываем выбранное модальное окно
        targetModal.classList.remove('hide');
        targetModal.classList.add('show');
    });
});

let items = document.querySelectorAll('.slider .item');
let active = 1;
function loadShow(){
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    // show after
    let stt = 0;
    for (var i = active + 1; i < items.length; i++) {
        stt++;
        let opacity = Math.max(0, 1 - 0.3 * stt); // Чем дальше, тем темнее
        items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(100px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
    }
    
    stt = 0;
    for (var i = active - 1; i >= 0; i--) {
        stt++;
        let opacity = Math.max(0, 1 - 0.3 * stt);
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(100px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
    }
}
loadShow();
let next = document.getElementById('next');
let prev = document.getElementById('prev');
next.onclick = function(){
   active = active + 1 < items.length ?  active + 1 : active;
   loadShow();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active -1 : active;
    loadShow();
}
// Функция для загрузки HTML и CSS в текстовые поля
function loadCode() {
    fetch('/get-code')
      .then(response => response.json())
      .then(data => {
        document.getElementById('html-code').value = data.html;
        document.getElementById('css-code').value = data.css;
      })
      .catch(err => console.error('Ошибка при загрузке кода:', err));
  }
  
  // Функция для сохранения изменений
  function saveChanges() {
    const htmlCode = document.getElementById('html-code').value;
    const cssCode = document.getElementById('css-code').value;
  
    fetch('/save-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: htmlCode, css: cssCode })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Код успешно сохранён и обновлён на сервере!');
        commitAndPushChanges(); // Коммитим и пушим изменения
      })
      .catch(err => console.error('Ошибка при сохранении изменений:', err));
  }
  
  // Функция для коммита и пуша изменений в репозиторий
  function commitAndPushChanges() {
    fetch('/commit-push', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        console.log('Изменения успешно отправлены в репозиторий');
      })
      .catch(err => console.error('Ошибка при пуше в репозиторий:', err));
  }
  
  // Загрузка кода при старте
  window.onload = loadCode;