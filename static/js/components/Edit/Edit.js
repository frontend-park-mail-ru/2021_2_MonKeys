import ProfileComponent from '../Profile/Profile.js';
import MenuComponent from '../Tapbar/Tapbar.js';


export default class EditComponent {
    _parent
    _data = {
      fields: {
        'name': {
          fieldTag: 'textarea',
          fieldClass: 'form-field text-without-icon',
          fieldPlaceholder: 'Имя',
        },
        'birthDate': {
          fieldInput: true,
          fieldTag: 'input',
          fieldType: 'date',
          fieldClass: 'form-field text-with-icon',
        },
        'desc': {
          fieldTag: 'textarea',
          fieldClass: 'form-field-desc text-desc',
          fieldPlaceholder: 'Расскажите о себе',
        },
      },
      tags: {},
    }
    _inputName
    _inputDate
    _inputDesc
    _inputTags
    _tagsButtons
    _tagsCheckboxes
    _form
    _tagsCount


    constructor(parent) {
      this._parent = parent;
    }

    set data(data) {
      this._data = data;
    }

    /**
     * Извлекает элементы из страницы.
     */
    _getElems() {
      this._dropDown = document.getElementsByClassName('dropdown')[0];
      this._dropDownMenu = document.getElementsByClassName('dropdown-menu')[0];
      this._dropDownMenuElements = document.getElementsByTagName('li');
      this._tagsButtons = document.getElementsByClassName('checkbox-btn');
      this._tagsCheckboxes = document.getElementsByClassName('tag-checkbox');
      this._form = document.getElementsByClassName('edit-form')[0];
      this._inputName = document.getElementsByClassName('form-field')[0];
      this._inputDate = document.getElementsByClassName('form-field')[1];
      this._inputDesc = document.getElementsByClassName('form-field-desc')[0];
    }

    /**
     * Отрисовывает страницу.
     */
    _renderDOM() {
      if (window.User.getUserData().firstName !== undefined) {
        this._data.fields.name.fieldValue = window.User.getUserData().firstName;
      }
      if (window.User.getUserData().date !== undefined) {
        this._data.fields.birthDate.fieldValue = window.User.getUserData().date;
      }
      if (window.User.getUserData().text !== undefined) {
        this._data.fields.desc.fieldValue = window.User.getUserData().text;
      }
      console.log(window.User.getUserData().tags);
      this._getAllTags.then(()=> {
        this._checkActiveTags();
        this._parent.innerHTML = '';
        const renderedHTML = Handlebars.templates['edit'];
        this._parent.innerHTML = renderedHTML(this._data);
        this._getElems();
        this._clickTags();
        this._checkSubmit();
      });
    }

    /**
     * Ищет теги, которые уже стоят у пользователя и делает их активными.
     */
    _checkActiveTags() {
      const userTags = window.User.getUserData().tags;
      if (userTags === undefined) {
        return;
      }
      const tagsArr = new Set();
      for (let i = 0; i < userTags.length; i++) {
        for (let j = 0; j < this._tagsCount; j++) {
          if (userTags[i] === this._data.tags[j].tagText) {
            this._data.tags[i + 1].tagActive = true;
            tagsArr.add(userTags[i]);
          }
        }
      }
      this._inputTags = tagsArr;
    }

    /**
     * Добавляет Event Listener ко всем кнопкам тегов.
     */
    _clickTags() {
      let tagsArr = new Set();
      if (this._inputTags !== undefined) {
        tagsArr = this._inputTags;
      }
      for (let j = 0; j < this._tagsCount; j++) {
        this._tagsCheckboxes[j].addEventListener('change', ()=> {
          for (let i = 0; i < this._tagsCount; i++) {
            if (this._tagsButtons[i].children[0] === this._tagsCheckboxes[j]) {
              if (this._tagsButtons[i].children[0].checked) {
                tagsArr.add(this._tagsButtons[i].children[1].innerText);
              } else {
                tagsArr.delete(this._tagsButtons[i].children[1].innerText);
              }
            }
          }
          this._inputTags = tagsArr;
        });
      }
    }

    /**
     * Запрос на апи на получение всех доступных тегов.
     *
     * @param {function} resolve Функция, которая будет выполнена после запроса.
     */
    _getAllTags = new Promise((resolve)=> {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      };

      fetch(`${serverAddress}${tagsURL} `, requestOptions)
          .then((response) =>
            response.json().then((data) => ({
              data: data,
              status: response.status,
            })).then((res) => {
              if (res.status === 200 && res.data.status === 200) {
                this._data.tags = res.data.body.allTags;
                this._tagsCount = res.data.body.tagsCount;
                resolve();
              } else if (res.data.status === 404) {
                // something

              }
            })).catch((error) => console.log(error));
    });

    /**
     * Делает запрос на апи на заполнение профиля.
     */
    _checkSubmit() {
      this._form.addEventListener('submit', (e) => {
        e.preventDefault();
        const testName = this._inputName.value.length !== 0;
        const testDate = this._inputDate.value.toString().length === 10;

        if (!testName) {
          this._inputName.className = 'form-field-edit-novalid text-without-icon';
        }

        if (!testDate) {
          this._inputDate.className = 'form-field-edit-novalid text-with-icon';
        }

        if (!testName || !testDate) {
          return;
        }

        const name = this._inputName.value.trim();
        const date = this._inputDate.value.trim();
        const description = this._inputDesc.value.trim();
        const tags = [];
        for (const tag of this._inputTags) {
          tags.push(tag);
        }
        console.log(tags);
        window.User.editProfile(name, date, description, tags, () => {
          console.log(11111);
          const profilePage = new ProfileComponent();
          profilePage.render();
          const menu = new MenuComponent();
          menu.activeItem = 'menu-profile';
          menu.render();
        });
      });
    }

    /**
     * Отрисовывает страницу (public).
     */
    render() {
      this._renderDOM();
    }
}
