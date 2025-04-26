// Splash Pro Handling
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  const motto = document.getElementById('motto');

  if (splash && motto) {
    setTimeout(() => {
      motto.classList.add('show-motto'); // Mostrar texto motivacional
    }, 1000); // 1 segundo después de cargar aparece el texto

    setTimeout(() => {
      splash.classList.add('opacity-0'); // Desvanece todo
      setTimeout(() => {
        splash.style.display = 'none';
      }, 500);
    }, 5000); // 5 segundos total de splash
  }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}
