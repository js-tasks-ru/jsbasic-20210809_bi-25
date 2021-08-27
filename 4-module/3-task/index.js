function highlight(table) {
  // ваш код...
  let TRs = table.querySelectorAll('tr');
  for (let trElement of TRs) {
    let TD = trElement.querySelectorAll('td');
    if (TD[1].textContent < 18) {
      trElement.style = "text-decoration: line-through";
    }
    if (TD[2].textContent == 'm') {
      trElement.classList.add('male');
    }
    if (TD[2].textContent == 'f') {
      trElement.classList.add('female');
    }
    if (TD[3].dataset.available == 'true') {
      trElement.classList.add('available');
    } else if (TD[3].dataset.available == 'false') {
      trElement.classList.add('unavailable');
    } else {
      trElement.hidden = true;
    }
  }
}
