const carousel = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;

function showImage(i) {
  if(i < 0) index = images.length - 1;
  else if(i >= images.length) index = 0;
  else index = i;
  carousel.style.transform = `translateX(${-index * 100}%)`;
}

prev.addEventListener('click', () => showImage(index - 1));
next.addEventListener('click', () => showImage(index + 1));

// Auto-play opcional
setInterval(() => showImage(index + 1), 5000);
