/**
 * Компонент с профилем пользователя
 */
export default class ProfileComponent {
    _parent
    _data = {
      user: {

      },
      actions: [
        {
          icon: 'icons/button_previous_white.svg',
          className: 'profile-logout',
        },
        {
          icon: 'icons/button_edit_white.svg',
          className: 'profile-edit',
        },
      ],
    }

    /**
   *
   * @param {HTMLElement} parent - Родительский элемент, в который будет рендерится страница
   */
    constructor(parent) {
      this._parent = parent;
    }


    /**
   * @param {data} data - Данные для отрисовки
   */
    set data(data) {
      this._data = data;
    }

    /**
   * Функция отрисовки
   */
    _renderDOM() {
      this._data.user = window.User.getUserData();
      const renderedHTML = Handlebars.templates['profile'];
      this._parent.innerHTML = renderedHTML(this._data);
    }

    /**
   * Функция отрисовки ленты
   */
    render() {
      this._renderDOM();
    }
}
