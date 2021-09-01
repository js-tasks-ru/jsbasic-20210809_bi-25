function initCarousel() {
  // ваш код...
  let clickRight = document.querySelector('.carousel__arrow_right');
  let clickLeft = document.querySelector('.carousel__arrow_left');
  let carousel = document.querySelector('.carousel__inner');

  clickRight.addEventListener('click', actRight);
  clickLeft.addEventListener('click', actLeft);

  let size = carousel.offsetWidth;
  let counter = 1;
  clickLeft.style.display = 'none';

  function actRight() {
    (counter === 1) ? carousel.style.transform = `translateX(-${size}px)` :
      (counter === 2) ? carousel.style.transform = `translateX(-${2 * size}px)` :
        carousel.style.transform = `translateX(-${3 * size}px)`;
    counter++;
    if (counter === 4) {
      clickRight.style.display = 'none';
    }
    if (counter !== 1) {
      clickLeft.style.display = '';
    }
  }

  function actLeft() {
    (counter === 2) ? carousel.style.transform = `translateX(-${0}px)` :
      (counter === 3) ? carousel.style.transform = `translateX(-${size}px)` :
        carousel.style.transform = `translateX(-${2 * size}px)`;
    counter--;
    if (counter === 1) {
      clickLeft.style.display = 'none';
    }
    if (counter !== 4) {
      clickRight.style.display = '';
    }
  }

}
