import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { FormFieldInput } from './formFieldInput.js';
import { ErrorMsg } from '../common/errorMsg.js';
import { errorNameMsg } from '../../constants/errorMsg.js';
import EventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';
import { FieldStatus } from '../../store/editStore.js';

export const NameField = (data) => {
  const nameProps = {
    oninput: () => {
      EventBus.dispatch<string>(EVENTS.EDIT_NAME_INPUT);
    },
    onfocusout: () => {
      EventBus.dispatch<string>(EVENTS.EDIT_NAME_FOCUSOUT);
    },
    name: "userName",
    placeholder: "Имя",
    value: data.name,
    class: (data.status === FieldStatus.Error) ? 'form__field__invalid' : 'form__field',
  }

  const errorProps = {
    text: errorNameMsg,
    class: 'error-inactive'
  }

  switch (data.status) {
    case FieldStatus.Correct:
      errorProps.class = 'error-inactive';
      break;
    case FieldStatus.Hint:
      errorProps.class = 'error-hint';
      break;
    case FieldStatus.Error:
      errorProps.class = 'error-active';
      break;
  }

  return (
    <div class='form__element'>
      {FormFieldInput(nameProps)}
      {ErrorMsg(errorProps)}
    </div>
  );
};
