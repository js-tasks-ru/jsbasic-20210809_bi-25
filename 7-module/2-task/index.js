import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.query('close').addEventListener('click', () => this.close());
  }

  render() {
    this.Modal = createElement(`
  <div class="modal">
        <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
                <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
  </div>
    `);
  }

  setTitle(title) {
    this.query('title').textContent = title;
  }

  setBody(node) {
    this.query('body').textContent = '';
    this.query('body').append(node);
  }

  open() {
    document.body.append(this.Modal);
    document.body.classList.add('is-modal-open');

    this._keyEvent = (event) => {
      if (event.code === 'Escape') {
        event.preventDefault();
        this.close();
      }
    };
    document.addEventListener('keydown', this._keyEvent);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.Modal.remove();
    document.removeEventListener('keydown', this._keyEvent);
  }

  query(str) {
    return this.Modal.querySelector(`.modal__${str}`);
  }
}
