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
      ]
    }

    constructor(parent) {
      this._parent = parent;
    }

    set data(data) {
      this._data = data;
    }

    _renderDOM() {
      this._data.user = window.User.getUserData();
      const renderedHTML = Handlebars.templates['profile'];
      this._parent.innerHTML = renderedHTML(this._data);
    }
    
    render() {
      this._renderDOM();
    }
}
