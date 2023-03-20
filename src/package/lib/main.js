export class CellEdit {

  createEditableCell(cellToEdit, saveCellValue, selectList) {
    let _a;
    window.selectItems = [];
    cellToEdit.setAttribute("td-id", this.createId());
    let oldValue = cellToEdit.innerHTML;
    let rowId = cellToEdit.getAttribute("id");
    let tdId = cellToEdit.getAttribute("td-id");
    let key = cellToEdit.getAttribute("data-key");
    let regex = cellToEdit.getAttribute("data-regex");
    let type = (_a = cellToEdit.getAttribute("data-type")) !== null && _a !== void 0 ? _a : undefined;
    if (regex) window.regexTelephone = regex;
    if (key != null && rowId != null && oldValue != null) {
      if (type === 'select') window.selectItems[key] = selectList;
      let icon_pencil = document.createElement('i');
      icon_pencil.classList.add('fa-solid', 'fa-pencil');
      let button = document.createElement('button');
      button.classList.add('btn', 'btn-link');
      button.id = "edit_button" + tdId;
      button.addEventListener('click', function () {
        new CellEdit().edit(tdId, oldValue, key !== null && key !== void 0 ? key : '', saveCellValue, type, '');
      });
      button.appendChild(icon_pencil);
      let div = document.createElement('div');
      div.appendChild(button);
      cellToEdit.appendChild(div);
    }
  }

  edit(tdId, oldValue, key, save, type, status) {
    let _this = this;
    let td = document.querySelectorAll('[td-id="' + tdId + '"]')[0];
    this.toggleContainer(td, this.condition);
    if (status === "save") {
      let [newValue, extras] = this.getNewValue(type, tdId);
      save(newValue, key, td.id, extras);
      this.condition = false;
    } else if (status === "cancel") {
      document.getElementById("input-" + tdId).value = oldValue;
      this.condition = false;
    } else {
      this.condition = !this.condition;
      this.toggleContainer(td, this.condition);
    }
    if (this.isNotEditing(tdId)) {
      let saveButton = this.createButton('fa-check', tdId, 'save', function (e) {
        return _this.edit(tdId, oldValue, key, save, type, "save");
      })

      let cancelButton = this.createButton('fa-xmark', tdId, 'cancel', function (e) {
        return _this.edit(tdId, oldValue, key, save, type, "cancel");
      })

      let container = this.createEditContainer(tdId, oldValue, key, type);
      container.appendChild(saveButton);
      container.appendChild(cancelButton);

      if (td != null) td.style.justifyContent = 'center';
      td?.appendChild(container);
    } else {
      let container2 = document.getElementById("edit-cell-" + tdId);
      if (container2 != null) if (this.condition) container2.style.display = 'flex'; else container2.style.display = 'none';
      this.toggleContainer(td, this.condition);
    }
  };

  createEditContainer(tdId, oldValue, key, type) {
    const container = document.createElement('div');
    container.id = `edit-cell-${tdId}`;
    container.style.display = 'flex';
    container.style.justifyContent = 'center';

    if (type === 'select') {
      const selectInput = document.createElement('input');
      selectInput.id = `input-${tdId}`;
      selectInput.value = oldValue;
      selectInput.classList.add('form-control', 'form-control-sm');
      selectInput.setAttribute('list', 'data-list');

      const options = this.getOptionsForSelect(window.selectItems?.[key], oldValue);
      const datalist = document.createElement('datalist');
      datalist.id = 'data-list';
      datalist.insertAdjacentHTML('afterbegin', `<option selected>${oldValue}</option>${options}`);

      container.classList.add('form-group', 'text-center');
      container.style.margin = '0 0 30px 30px';
      container.style.width = '60%';
      container.appendChild(selectInput);
      container.appendChild(datalist);
    } else {
      const input = this.createInput(tdId, oldValue, key, type);
      container.style.maxWidth = '300px';
      container.style.minWidth = '100px';
      container.appendChild(input);
    }

    return container;
  }

  createInput(tdId, oldValue, key, type) {
    const input = document.createElement(type === 'textarea' ? 'textarea' : 'input');
    input.value = oldValue;
    input.setAttribute('name', key);
    input.setAttribute('value', oldValue);
    input.classList.add('form-control', 'in-line-cell');
    input.id = `input-${tdId}`;
    input.style.maxWidth = '300px';
    input.style.minWidth = '100px';

    if (type === 'number') {
      input.type = 'number';
    } else if (type === 'telephone') {
      input.placeholder = 'Telephone Number';
      input.type = 'text';
      input.addEventListener('keyup', this.validateNumber);
    } else if (type === 'date') {
      input.placeholder = 'Date';
      input.type = 'date';
    } else if (type === 'textarea') {
      input.setAttribute('rows', '1');
    }

    return input;
  }

  createButton(iconClass, tdId, action, clickHandler) {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-link');
    button.setAttribute('type', 'button');
    button.addEventListener('click', clickHandler);
    button.id = `${action}_button${tdId}`;

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', iconClass);
    button.appendChild(icon);

    return button;
  }

  toggleContainer(td, condition) {
    let container = td?.firstElementChild;
    if (container) {
      container.style.display = condition ? 'none' : 'block';
    }
  }

  getNewValue(type, tdId) {
    if (type === 'select') {
      let select = document.getElementById("input-" + tdId);
      let newValue = select.value;
      let opt = document.querySelector('option[value="' + newValue + '"]');
      let extras = opt?.getAttribute('data-id');
      return [newValue, extras];
    } else {
      let newValue = document.getElementById("input-" + tdId).value;
      return [newValue, undefined];
    }
  }

  getOptionsForSelect(data, oldValue) {
    let htmlString = "";
    data.forEach(function (row) {
      if (row.name !== oldValue) htmlString += '<option data-id="' + row.id + '" value="' + row.name + '">\n' + row.name + '</option>\n';
    });
    return htmlString;
  };

  getInput(tdId) {
    return document.getElementById("input-" + tdId);
  };

  saveButton(tdId) {
    return document.getElementById("save_button" + tdId);
  };

  cancelButton(tdId) {
    return document.getElementById("cancel_button" + tdId);
  };

  isEditing(tdId) {
    return document.getElementById("edit-cell-" + tdId) !== null;
  };

  isNotEditing(tdId) {
    return document.getElementById("edit-cell-" + tdId) === null;
  };

  validateNumber(event) {
    if (window.regexTelephone === undefined) window.regexTelephone = "^0[0-9]{9}$";
    if (!new RegExp(window.regexTelephone).test(event.target.value)) {
      event.target.classList.add("is-invalid");
    } else event.target.classList.remove("is-invalid");
  };

  createId() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

}

export class OnUpdateCell {
  OnUpdateCell() {
    this.saveCellValue = function (value, key, rowId, row) { };
  }
}
