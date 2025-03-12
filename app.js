let vantaEffect = VANTA.NET({
  el: "#header",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.50,
  color: 0xff0000,
  backgroundColor: 0xe0303,
  points: 20.00
});

function interpolateColor(startColor, endColor, factor) {
  const r1 = (startColor >> 16) & 0xff;
  const g1 = (startColor >> 8) & 0xff;
  const b1 = startColor & 0xff;
  
  const r2 = (endColor >> 16) & 0xff;
  const g2 = (endColor >> 8) & 0xff;
  const b2 = endColor & 0xff;
  
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  return (r << 16) | (g << 8) | b;
}
function animateColorChange(targetColor, targetBackgroundColor, targetPseudoElementBgColor) {
  let startColor = vantaEffect.options.color;
  let startBackgroundColor = vantaEffect.options.backgroundColor;
  let startTime = null;
  let duration = 1000; // продолжительность анимации в миллисекундах
  

  // Найдем элемент для изменения обводки текста
  const textElement = document.getElementById('typewriter-text');
  let targetTextStrokeColor = `#${targetColor.toString(16).padStart(6, '0')}`;

  // Функция для обновления фона псевдоэлемента
  function updatePseudoElementBgColor(newBgColor) {
    // Изменим CSS переменную для псевдоэлемента
    document.documentElement.style.setProperty('--pseudo-bg-color', newBgColor);
  }

  function animate(time) {
    if (!startTime) startTime = time;
    let progress = (time - startTime) / duration;
    if (progress < 1) {
      // Интерполяция цвета линий
      const interpolatedColor = interpolateColor(startColor, targetColor, progress);
      vantaEffect.setOptions({ color: interpolatedColor });

      // Интерполяция фона
      const interpolatedBackgroundColor = interpolateColor(startBackgroundColor, targetBackgroundColor, progress);
      vantaEffect.setOptions({ backgroundColor: interpolatedBackgroundColor });

      // Преобразуем цвет обводки текста
      const interpolatedTextColor = `#${interpolatedColor.toString(16).padStart(6, '0')}`;
      textElement.style['-webkit-text-stroke'] = `0.01px ${interpolatedTextColor}`;

      requestAnimationFrame(animate);
    } else {
      // Устанавливаем финальные значения
      vantaEffect.setOptions({ color: targetColor, backgroundColor: targetBackgroundColor });
      textElement.style['-webkit-text-stroke'] = `0.01px ${targetTextStrokeColor}`;
    }
  }

  // Обновляем фон псевдоэлемента
  updatePseudoElementBgColor(`rgba(${(targetPseudoElementBgColor >> 16) & 0xff}, ${(targetPseudoElementBgColor >> 8) & 0xff}, ${targetPseudoElementBgColor & 0xff}, 0.4)`);

  requestAnimationFrame(animate);
}

// Добавим обработчик кликов на ссылки
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    // Получаем цвета из data-атрибутов
    const newColor = parseInt(event.target.getAttribute('data-color'), 16);
    const newBackgroundColor = parseInt(event.target.getAttribute('data-background'), 16);
    const newPseudoElementBgColor = parseInt(event.target.getAttribute('data-pseudo-bg-color'), 16); // Новый атрибут для псевдоэлемента

    // Запускаем анимацию изменения цвета
    animateColorChange(newColor, newBackgroundColor, newPseudoElementBgColor);
  });
});
const mainContent = document.querySelector('main');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    const targetSection = event.target.getAttribute('href');

    if (targetSection === "#home") {
      mainContent.style.display = "block"; // Показываем main
    } else {
      mainContent.style.display = "none"; // Скрываем main
    }

    const newColor = parseInt(event.target.getAttribute('data-color'), 16);
    const newBackgroundColor = parseInt(event.target.getAttribute('data-background'), 16);
    const newPseudoElementBgColor = parseInt(event.target.getAttribute('data-pseudo-bg-color'), 16);

    animateColorChange(newColor, newBackgroundColor, newPseudoElementBgColor);
  });
});