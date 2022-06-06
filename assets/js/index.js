//show slider
var slideIndex = 0;
showSlides();
function showSlides() {
  var i;
  var slides = document.getElementsByClassName('mySlides');
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = 'flex';
  setTimeout(showSlides, 5000);
}

//show slider button
const dot1 = document.querySelector('.js-dot-1');
const dot2 = document.querySelector('.js-dot-2');

dot2.addEventListener('click', function () {
  dot2.classList.add('manual-btn--active');
  dot1.classList.remove('manual-btn--active');
});

dot1.addEventListener('click', function () {
  dot1.classList.add('manual-btn--active');
  dot2.classList.remove('manual-btn--active');
});

// menu button
const navMobileBtn = document.querySelector('.js-mobile-btn');
const mobileMenu = document.querySelector('.js-mobile-menu');
var mobileOverlay = document.querySelector('.mobile-menu-overlay');

navMobileBtn.onclick = function () {
  mobileMenu.style.transform = 'scaleY(1)';
  mobileOverlay.style.display = 'block';
};

mobileOverlay.onclick = function () {
  mobileMenu.style.transform = 'scaleY(0)';
  mobileOverlay.style.display = 'none';
};
//show modal search
const moda1 = document.getElementById('show-moda');
const moda2 = document.getElementById('moda-appear');
moda1.onclick = function () {
  moda2.style.width = '100vw';
};

const closedModa = document.getElementById('moda-close');
closedModa.onclick = function () {
  moda2.style.width = '0';
  moda2.style.animation = 'fadeIn linear 1s';
};

// window.onclick = function (event) {
//     if (event.target == moda2) {
//         moda2.style.display = 'none';
//     }
// }
