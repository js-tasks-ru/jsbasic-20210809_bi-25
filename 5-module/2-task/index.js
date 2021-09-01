function toggleText() {
  // ваш код...
  let button = document.querySelector('.toggle-text-button');
  button.addEventListener('click', act);

  function act() {
    let text = document.querySelector('#text');
    text.hidden = !text.hidden;
  }
}
