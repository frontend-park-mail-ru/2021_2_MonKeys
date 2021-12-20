import ViewBase from './viewBase.js';
import { viewSizes } from '../constants/viewParams.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { EditForm } from '../components/edit/editForm.js';
import { EditStore, FieldStatus, Gender } from '../store/editStore.js';
import { ProfileStore } from '../store/profileStore.js';
import EventBus from '../dispatcher/eventBus.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';
import { Errors } from '../components/error/errors.js';
import { Button } from '../components/common/button.js';
import { IconButton } from '../components/common/iconButton.js';
import { EVENTS } from '../dispatcher/events.js';
import router from '../route/router.js';

export default class EditView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        this.viewSize = viewSizes.anyone;
        EditStore.subscribe(this.subcribtionCallbackEdit, this);
        ProfileStore.subscribe(this.subcribtionCallbackProfile, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);

        const profileStore = ProfileStore.get();
        const editStore = EditStore.get();
        switch (profileStore.gender) {
            case 'male':
                editStore.gender = Gender.Male;
                break;
            case 'female':
                editStore.gender = Gender.Female;
                break;
        }
        editStore.tagsField.tags.forEach((tag) => {
            tag.selected = false;
            profileStore.tags.forEach((activeTag) => {
                if (tag.tag === activeTag) {
                    tag.selected = true;
                }
            });
        });

        editStore.preferField.prefers.forEach((prefer) => {
            if (prefer.value === profileStore.prefer) {
                prefer.selected = true;
            } else {
                prefer.selected = false;
            }
        });

        editStore.nameFieldStatus = FieldStatus.Correct;
        editStore.birthDateFieldStatus = FieldStatus.Correct;
        editStore.genderFieldStatus = FieldStatus.Correct;
        editStore.preferFieldStatus = FieldStatus.Correct;
        editStore.imgFieldStatus = FieldStatus.Correct;

        EditStore.set(editStore);

        this._template = this._createTmpl(this._data);
    }

    _data = {
        fields: {
            nameField: {
                name: ProfileStore.get().name,
                status: EditStore.get().nameFieldStatus,
            },
            dateField: {
                date: ProfileStore.get().date,
                status: EditStore.get().birthDateFieldStatus,
            },
            genderField: {
                gender: EditStore.get().gender,
                status: EditStore.get().genderFieldStatus,
            },
            descriptionField: {
                description: ProfileStore.get().description,
            },
            tagsField: EditStore.get().tagsField,
            preferField: {
                prefers: EditStore.get().preferField.prefers,
                status: EditStore.get().preferFieldStatus,
            },
            imgsField: {
                imgs: ProfileStore.get().imgs,
                status: EditStore.get().imgFieldStatus,
            },
        },
        saveButton: {
            type: 'button',
            text: 'Сохранить',
            class: 'button-default edit__save-button',
            onkeypress: (event) => {
                const enterKeyCode = 13;
                if (event.keyCode === enterKeyCode) {
                    event.preventDefault();
                    EventBus.dispatch<number>(EVENTS.EDIT_SAVE_BUTTON);
                }
            },
            onclick: () => {
                EventBus.dispatch<string>(EVENTS.EDIT_SAVE_BUTTON);
            },
        },
        actions: {
            backButton: {
                src: 'icons/back.svg',
                class: 'edit__back',
                onclick: () => {
                    router.go('/profile');
                },
            },
        },
        error: errorManager.error,
    };

    _createTmpl(data) {
        return (
            <div class='app__content--align-center'>
                <div class='edit'>
                    <div class='edit__header'>
                        {IconButton(data.actions.backButton)}
                        <span class='header-text edit__header-text'>Настройки</span>
                    </div>
                    {EditForm(data.fields)}
                    <div class='edit__manager'>{Button(data.saveButton)}</div>
                    {Errors(data.error)}
                </div>
            </div>
        );
    }

    public unsubscribe() {
        EditStore.unsubscribe(this.subcribtionCallbackEdit);
        ProfileStore.unsubscribe(this.subcribtionCallbackProfile);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    private subcribtionCallbackEdit(data, view) {
        view._data.fields.nameField.name = ProfileStore.get().name;
        view._data.fields.nameField.status = EditStore.get().nameFieldStatus;

        view._data.fields.dateField.date = ProfileStore.get().date;
        view._data.fields.dateField.status = EditStore.get().birthDateFieldStatus;

        view._data.fields.genderField.gender = EditStore.get().gender;
        view._data.fields.genderField.status = EditStore.get().genderFieldStatus;

        view._data.fields.descriptionField.description = ProfileStore.get().description;

        view._data.fields.tagsField = EditStore.get().tagsField;

        view._data.fields.preferField.prefers = EditStore.get().preferField.prefers;
        view._data.fields.preferField.status = EditStore.get().preferFieldStatus;

        view._data.fields.imgsField.imgs = ProfileStore.get().imgs;
        view._data.fields.imgsField.status = EditStore.get().imgFieldStatus;

        view._template = view._createTmpl(view._data);

        view.render();
    }

    private subcribtionCallbackProfile(data, view) {
        view._data.fields.imgsField.imgs = ProfileStore.get().imgs;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.error = errorManager.error;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
