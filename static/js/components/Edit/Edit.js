
export default class EditComponent {
    #parent
    #data

    constructor(parent) {
      this.#parent = parent;
    }

    set data(data) {
      this.#data = data;
    }

    #renderDOM() {
      function createInputEdit(type, name, place, className) {
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = place;
        input.className = className;

        return input;
      }
      this.#parent.innerHTML ='';

      const form = document.createElement('form');
      form.className = 'edit-form';

      const user = window.User.getUserData();

      const divName = document.createElement('div');
      divName.className = 'inputEdit';
      const inputName = document.createElement('textarea');
      inputName.className = 'form-field text-without-icon';
      inputName.textContent = user.firstName;
      inputName.addEventListener('input', () => {
        const test = inputName.value.length === 0;
        if (test) {
          inputName.className = 'form-field-edit-novalid text-without-icon';
        } else {
          inputName.className = 'form-field text-without-icon';
        }
      });
      divName.appendChild(inputName);

      const divDate = document.createElement('div');
      divDate.className = 'inputEdit';
      const inputDate = createInputEdit('date', 'calendar', '20.06.2001', 'form-field text-with-icon');
      inputDate.addEventListener('input', () => {
        const test = inputDate.value.toString().length === 0;
        if (test) {
          inputDate.className = 'form-field-edit-novalid text-with-icon';
        } else {
          inputDate.className = 'form-field text-with-icon';
        }
      });
      divDate.appendChild(inputDate);

      const divDesc = document.createElement('div');
      divDesc.className = 'inputEdit';
      const desc = document.createElement('textarea');
      desc.className = 'form-field-desc text-desc';
      desc.textContent = user.text;

      desc.addEventListener('input', () => {
        const test = desc.value.length === 0;
        if (test) {
          desc.className = 'form-field-edit-novalid text-desc';
        } else {
          desc.className = 'form-field text-desc';
        }
      });
      divDesc.appendChild(desc);

      const divTags = document.createElement('div');
      divTags.className = 'inputEdit';

      const TagsContainer = document.createElement('div');
      TagsContainer.className = 'tag-container-edit';
      TagsContainer.id = 'tagsID';

      const buttonAddTags = document.createElement('button');
      buttonAddTags.id = 'addID';
      buttonAddTags.className = 'add';

      divTags.appendChild(TagsContainer);
      divTags.appendChild(buttonAddTags);

      const divSelect = document.createElement('div');
      divSelect.className = 'selectBox';

      const divImgs = document.createElement('div');
      divImgs.className = 'inputEdit';
      divImgs.innerHTML = `
        <div class="im-container">
        <div style="position: relative;">
            <img src="../img/Elon_Musk_2015.jpg" class="im">
            <button class=removeImg></button>
        </div>
        <div style="position: relative;">
            <img src="../img/Elon_Musk_2015.jpg" class="im">
            <button class=removeImg></button>
        </div>
        <div style="position: relative;">
            <img src="../img/Elon_Musk_2015.jpg" class="im">
            <button class=removeImg></button>
        </div>
        </div>
        <button class="add"></button>
        `;
      form.appendChild(divName);
      form.appendChild(divDate);
      form.appendChild(divDesc);
      form.appendChild(divTags);
      form.appendChild(divSelect);
      form.appendChild(divImgs);
      const buttonSave = document.createElement('button');
      buttonSave.type = 'submit';
      buttonSave.className = 'login-button';

      const div = document.createElement('div');
      div.className = 'center-container';

      const span = document.createElement('span');
      span.className = 'edit-button-text';
      span.textContent = 'Сохранить';

      const imgNext = document.createElement('img');
      imgNext.src = '../icons/button_next_black.svg';
      imgNext.className = 'svg-next-edit';

      div.appendChild(span);
      div.appendChild(imgNext);
      buttonSave.appendChild(div);

      form.appendChild(buttonSave);

      const divSelectBox = document.getElementsByClassName('selectBox')[0];

      const selectBoxItems = ['anime', 'gaming', 'soccer', 'music'];
      const existsSelectBoxItems = user.tags;

      const selectBox = document.createElement('select');
      selectBox.className = 'dropdown-select';
      const selectItem = document.createElement('option');
      selectItem.textContent = 'Тэги';
      selectItem.value = 'Тэги';
      selectItem.disabled = true;
      selectBox.appendChild(selectItem);
      selectBoxItems.forEach(function(item, i, selectBoxItems) {
        const selectItem = document.createElement('option');
        selectItem.textContent = item;
        selectItem.value = item;
        selectBox.appendChild(selectItem);
      });

      const tagsCont = document.getElementById('tagsID');

      selectBox.onchange = function() {
        divSelectBox.innerHTML = '';
        const {
          value,
        } = selectBox;
        if (existsSelectBoxItems.indexOf(value) != -1) {
          return;
        }
        const tag = document.createElement('div');
        tag.className = 'tag-edit';
        tag.textContent = value;
        tagsCont.appendChild(tag);
        tag.disabled = true;
        existsSelectBoxItems.push(value);
      };

      form.addEventListener('submit', (e) => {
        alert('dijsaidjsaidas');
        e.preventDefault();
        const testName = inputName.value.length === 0;
        const testDate = inputDate.value.toString().length === 0;
        const testDesc = inputDesc.value.length === 0;

        if (!testName) {
          inputName.className = 'form-field-edit-novalid text-without-icon';
        }

        if (!testDate) {
          inputDate.className = 'form-field-edit-novalid text-with-icon';
        }

        if (!testDesc) {
          inputDesc.className = 'form-field-edit-novalid';
        }

        if (!testName || !testDate || !testDesc) {
          return;
        }

        const name = inputName.value.trim();
        const date = inputDate.value.trim();
        const desc = inputDesc.value.trim();
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'name': name,
            'age': date,
            'description': desc,
            'tags': tags,
          }),
          credentials: 'include',
        };
        fetch(`${localAddress}/api/v1/edit`, requestOptions)
            .then((response) =>
              response.json().then((data) => ({
                data: data,
                status: response.status,
              })).then((res) => {
                if (res.status === 200 && res.data.status === 200) {
                  setUserProfile(res.data.body);
                } else if (res.data.status === 404) {
                  const userNotFound = document.createElement('span');
                  userNotFound.textContent = 'Неправильный ввод';
                  userNotFound.style.marginTop = '10px';
                  form.appendChild(userNotFound);
                }
              })).catch((error) => console.log(error));
      });

      this.#parent.addEventListener('click', function(e) {
        e.preventDefault();
        const {
          target,
        } = e;

        if (target.tagName.toLowerCase() === 'option') {
          divSelectBox.innerHTML = '';
        }
        if (target.id === 'addID') {
          divSelectBox.appendChild(selectBox);
        }
      });
      this.#parent.appendChild(form);
    }
    render() {
      this.#renderDOM();
    }
}
