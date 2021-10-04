import ProfileComponent from '../Profile/Profile.js';
import MenuComponent from '../Tapbar/Tapbar.js';


export default class EditComponent {
    _parent
    _data = {
      fields: {
        'name': {
          fieldType: 'text',
          fieldClass: 'form-field text-without-icon',
        },
        'birthDate': {
          fieldType: 'date',
          fieldClass: 'form-field text-with-icon',
        },
        'desc': {
          fieldType: 'text',
          fieldClass: 'form-field-desc text-desc',
        },
      },
    }

    constructor(parent) {
      this._parent = parent;
    }

    set data(data) {
      this._data = data;
    }

    _renderDOM() {
      this._parent.innerHTML = '';
      const renderedHTML = Handlebars.templates['edit'];
      this._parent.innerHTML = renderedHTML(this._data);
      // this._getElems();
      // this._addEventListeners();
    }
    //   this._parent.innerHTML = '';

    //   const form = document.createElement('form');
    //   form.className = 'edit-form';

    //   const user = window.User.getUserData();

    //   const divName = document.createElement('div');
    //   divName.className = 'inputEdit';
    //   const inputName = document.createElement('textarea');
    //   inputName.className = 'form-field text-without-icon';
    //   inputName.textContent = user.firstName;
    //   inputName.addEventListener('input', () => {
    //     const test = inputName.value.length === 0;
    //     if (test) {
    //       inputName.className = 'form-field-edit-novalid text-without-icon';
    //     } else {
    //       inputName.className = 'form-field text-without-icon';
    //     }
    //   });
    //   divName.appendChild(inputName);

    //   const divDate = document.createElement('div');
    //   divDate.className = 'inputEdit';
    //   const inputDate = document.createElement('input');
    //   inputDate.type = 'date';
    //   inputDate.className = 'form-field text-with-icon';
    //   inputDate.value = user.date;
    //   console.log(user.date);
    //   inputDate.addEventListener('input', () => {
    //     const test = inputDate.value.toString().length === 0;
    //     if (test) {
    //       inputDate.className = 'form-field-edit-novalid text-with-icon';
    //     } else {
    //       inputDate.className = 'form-field text-with-icon';
    //     }
    //   });
    //   divDate.appendChild(inputDate);

    //   const divDesc = document.createElement('div');
    //   divDesc.className = 'inputEdit';
    //   const desc = document.createElement('textarea');
    //   desc.className = 'form-field-desc text-desc';
    //   desc.textContent = user.text;

    //   desc.addEventListener('input', () => {
    //     const test = desc.value.length === 0;
    //     if (test) {
    //       desc.className = 'form-field-edit-novalid text-desc';
    //     } else {
    //       desc.className = 'form-field text-desc';
    //     }
    //   });
    //   divDesc.appendChild(desc);

    //   const divTags = document.createElement('div');
    //   divTags.className = 'inputEdit';

    //   const TagsContainer = document.createElement('div');
    //   TagsContainer.className = 'tag-container-edit';
    //   TagsContainer.id = 'tagsID';

    //   const buttonAddTags = document.createElement('button');
    //   buttonAddTags.id = 'addID';
    //   buttonAddTags.className = 'add';

    //   divTags.appendChild(TagsContainer);
    //   divTags.appendChild(buttonAddTags);

    //   const divSelect = document.createElement('div');
    //   divSelect.className = 'selectBox';

    //   const divImgs = document.createElement('div');
    //   divImgs.className = 'inputEdit';
    //   divImgs.innerHTML = `
    //   <div class="im-container">
    //   <div style="position: relative;">
    //       <img src="../img/Elon_Musk_2015.jpg" class="im">
    //       <button class=removeImg></button>
    //   </div>
    //   <div style="position: relative;">
    //       <img src="../img/Elon_Musk_2015.jpg" class="im">
    //       <button class=removeImg></button>
    //   </div>
    //   <div style="position: relative;">
    //       <img src="../img/Elon_Musk_2015.jpg" class="im">
    //       <button class=removeImg></button>
    //   </div>
    //   </div>
    //   <button class="add"></button>
    //   `;
    //   form.appendChild(divName);
    //   form.appendChild(divDate);
    //   form.appendChild(divDesc);
    //   form.appendChild(divTags);
    //   form.appendChild(divSelect);
    //   form.appendChild(divImgs);
    //   const buttonSave = document.createElement('button');
    //   buttonSave.type = 'submit';
    //   buttonSave.className = 'login-button';

    //   const div = document.createElement('div');
    //   div.className = 'center-container';

    //   const span = document.createElement('span');
    //   span.className = 'edit-button-text';
    //   span.textContent = 'Сохранить';

    //   const imgNext = document.createElement('img');
    //   imgNext.src = '../icons/button_next_black.svg';
    //   imgNext.className = 'svg-next-edit';

    //   div.appendChild(span);
    //   div.appendChild(imgNext);
    //   buttonSave.appendChild(div);

    //   const selectBoxItems = ['anime', 'gaming', 'soccer', 'music'];
    //   let existsSelectBoxItems;
    //   if (user.tags === null || user.tags === undefined) {
    //     existsSelectBoxItems = [];
    //   } else {
    //     existsSelectBoxItems = user.tags;
    //   }

    //   existsSelectBoxItems.forEach(function(item) {
    //     const tag = document.createElement('div');
    //     tag.className = 'tag-edit';
    //     tag.textContent = item;
    //     TagsContainer.appendChild(tag);
    //   });

    //   const selectBox = document.createElement('select');
    //   selectBox.className = 'dropdown-select';
    //   const selectItem = document.createElement('option');
    //   selectItem.textContent = 'Тэги';
    //   selectItem.value = 'Тэги';
    //   selectBox.appendChild(selectItem);
    //   selectBoxItems.forEach(function(item) {
    //     const selectItem = document.createElement('option');
    //     selectItem.textContent = item;
    //     selectItem.value = item;
    //     selectBox.appendChild(selectItem);
    //   });

    //   selectBox.onchange = function() {
    //     divSelect.innerHTML = '';
    //     const { value } = selectBox;
    //     if (existsSelectBoxItems.indexOf(value) != -1 || value === 'Тэги') {
    //       return;
    //     }
    //     const tag = document.createElement('div');
    //     tag.className = 'tag-edit';
    //     tag.textContent = value;
    //     TagsContainer.appendChild(tag);
    //     tag.disabled = true;
    //     existsSelectBoxItems.push(value);
    //   };

    //   // form.addEventListener('submit', (e) => {
    //   buttonSave.onclick = function() {
    //     // e.preventDefault();
    //     const testName = inputName.value.length !== 0;
    //     const testDate = inputDate.value.toString().length === 10;
    //     const testDesc = desc.value.length !== 0;

    //     if (!testName) {
    //       inputName.className = 'form-field-edit-novalid text-without-icon';
    //     }

    //     if (!testDate) {
    //       inputDate.className = 'form-field-edit-novalid text-with-icon';
    //     }

    //     if (!testDesc) {
    //       desc.className = 'form-field-edit-novalid text-desc';
    //     }

    //     if (!testName || !testDate || !testDesc) {
    //       return;
    //     }

    //     const name = inputName.value.trim();
    //     const date = inputDate.value.trim();
    //     const description = desc.value.trim();

    //     window.User.editProfile(name, date, description, existsSelectBoxItems, () => {
    //       const profilePage = new ProfileComponent();
    //       profilePage.render();
    //       const menu = new MenuComponent();
    //       menu.activeItem = 'menu-profile';
    //       menu.render();
    //     });
    //   };

    //   this._parent.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     const {
    //       target,
    //     } = e;

    //     if (target.tagName.toLowerCase() === 'option') {
    //       divSelect.innerHTML = '';
    //     }
    //     if (target.id === 'addID') {
    //       divSelect.appendChild(selectBox);
    //     }
    //   });
    //   this._parent.appendChild(form);

    //   form.appendChild(buttonSave);
    // }

    render() {
      this._renderDOM();
    }
}
