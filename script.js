document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const textElement = document.getElementById('typewriter-text');
  const headerContent = document.querySelector('.header__content');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Задержка появления навигации
  setTimeout(() => {
    nav.classList.add('show');
  }, 1200);
  
  function typeWriter(text, element, speed) {
    let i = 0;
    let timer = setInterval(function () {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }

  textElement.innerHTML = ''; 
  const headerText = 'LIBERAL GROUP';
  typeWriter(headerText, textElement, 100); 

  navLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      if (event.target.getAttribute('href') !== '#home') {
        headerContent.classList.add('move-down');
      } else {
        headerContent.classList.remove('move-down');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const headerContent = document.querySelector('.header__content');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const fadeValue = Math.max(0, 1 - scrollY / 300);
    headerContent.style.opacity = fadeValue;
  });
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });

  link.addEventListener('click', (e) => {
    e.target.focus();
  });
});
