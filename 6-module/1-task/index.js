/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.data = rows;
    const arrayHead = ['Имя', 'Возраст', 'Зарплата', 'Город', ''];

    const table = document.createElement('table');
    const tHead = document.createElement('thead');
    const trH = document.createElement('tr');

    for (const item of arrayHead) {
      const tH = document.createElement('th');
      tH.textContent = item;
      trH.append(tH);
    }
    tHead.append(trH);
    table.append(tHead);

    const tBody = document.createElement('tbody');

    for (const row of this.data) {
      const trB = document.createElement('tr');

      for (const rKey in row) {
        const Td = document.createElement('td');
        Td.textContent = row[rKey];
        trB.append(Td);
      }
      const button = document.createElement('td');
      button.innerHTML = `<button>[X]</button>`;
      trB.append(button);

      tBody.append(trB);
    }
    table.append(tBody);

    this._elem = table;
    table.addEventListener('click', this.act);
  }

  act(event) {
    let click = event.target;
    if (click.tagName === 'BUTTON') {
      click.closest('tr').remove();
    }
  };

  get elem() {
    return this._elem;
  }
}
