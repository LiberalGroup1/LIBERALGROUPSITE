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
