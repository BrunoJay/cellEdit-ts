export class CellEdit {

  createEditableCell(cellToEdit, saveCellValue, selectList) {
    let _a;
    global.selectItems = [];
    cellToEdit.setAttribute("td-id", this.createId());
    let oldValue = cellToEdit.innerHTML;
    let rowId = cellToEdit.getAttribute("id");
    let tdId = cellToEdit.getAttribute("td-id");
    let key = cellToEdit.getAttribute("data-key");
    let regex = cellToEdit.getAttribute("data-regex");
    let type = (_a = cellToEdit.getAttribute("data-type")) !== null && _a !== void 0 ? _a : undefined;
    if (regex) global.regexTelephone = regex;
    if (key != null && rowId != null && oldValue != null) {
      if (type === 'select') global.selectItems[key] = selectList;
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
    let container1 = td === null || td === void 0 ? void 0 : td.firstElementChild;
    if (this.condition) container1.style.display = 'none'; else container1.style.display = 'block';
    if (status === "save") {
      let newValue = void 0, extras = void 0;
      if (type === 'select') {
        let select = document.getElementById("input-" + tdId);
        newValue = select.value;
        let opt = document.querySelector('option[value="' + newValue + '"]');
        if (opt != null) extras = opt.getAttribute('data-id');
      } else {
        newValue = document.getElementById("input-" + tdId).value;
      }
      save(newValue, key, td.id, extras);
      this.condition = false;
    } else if (status === "cancel") {
      document.getElementById("input-" + tdId).value = oldValue;
      this.condition = false;
    } else this.condition = !this.condition;
    if (this.condition) container1.style.display = 'none'; else container1.style.display = 'block';
    if (this.isNotEditing(tdId)) {
      let saveButton = document.createElement("button");
      saveButton.classList.add('btn', 'btn-link');
      saveButton.setAttribute('type', "button");
      saveButton.addEventListener("click", function (e) {
        return _this.edit(tdId, oldValue, key, save, type, "save");
      });
      saveButton.id = "save_button" + tdId;
      let cancelButton = document.createElement("button");
      cancelButton.classList.add('btn', 'btn-link');
      cancelButton.setAttribute('type', "button");
      cancelButton.addEventListener("click", function (e) {
        return _this.edit(tdId, oldValue, key, save, type, "cancel");
      });
      cancelButton.id = "cancel_button" + tdId;
      let icon_check = document.createElement('i');
      icon_check.classList.add('fa-solid', 'fa-check');
      let icon_times = document.createElement('i');
      icon_times.classList.add('fa-solid', 'fa-xmark');
      let container = document.createElement('div');
      container.id = "edit-cell-" + tdId;
      container.style.display = 'flex';
      container.style.justifyContent = 'center';
      let input = void 0;
      let selectInput = void 0;
      if (type === 'select') {
        let selectList = void 0;
        if (global.selectItems === undefined) {
          console.log('Error: ', 'no select items found');
          selectList = [];
        } else selectList = global.selectItems[key];
        container.classList.add('form-group', 'text-center');
        container.style.margin = '0 0 30px 30px';
        container.style.width = '60%';
        selectInput = document.createElement('input');
        selectInput.id = "input-" + tdId;
        selectInput.value = oldValue;
        selectInput.classList.add('form-control', 'form-control-sm');
        selectInput.setAttribute('list', "data-list");
        input = document.createElement('datalist');
        input.id = "data-list";
        input.insertAdjacentHTML('afterbegin', "<option selected>" + oldValue + "</option>\n" + this.getOptionsForSelect(selectList, oldValue));
      } else {
        if (type === 'number') {
          input = document.createElement('input');
          input.value = oldValue;
          input.type = 'number';
        } else if (type === 'telephone') {
          input = document.createElement('input');
          input.value = oldValue;
          input.placeholder = "Telephone Number";
          input.type = "text";
          input.addEventListener("keyup", function (e) {
            return _this.validateNumber(e);
          });
        } else if (type === 'date') {
          input = document.createElement('input');
          input.value = oldValue;
          input.placeholder = "Date";
          input.type = "date";
        } else {
          input = document.createElement('textarea');
          input.value = oldValue;
          input.setAttribute('rows', '1');
        }
        input.classList.add('form-control', 'in-line-cell');
        input.id = "input-" + tdId;
        input.setAttribute('value', oldValue);
        input.setAttribute('name', key);
        input.style.maxWidth = '300px';
        input.style.minWidth = '100px';
      }
      saveButton.appendChild(icon_check);
      cancelButton.appendChild(icon_times);
      if (type === 'select') {
        container.appendChild(selectInput);
      }
      container.appendChild(input);
      container.appendChild(saveButton);
      container.appendChild(cancelButton);
      if (td != null) td.style.justifyContent = 'center';
      td === null || td === void 0 ? void 0 : td.appendChild(container);
    } else {
      let container2 = document.getElementById("edit-cell-" + tdId);
      if (container2 != null) if (this.condition) container2.style.display = 'flex'; else container2.style.display = 'none';
      if (this.condition) container1.style.display = 'none'; else container1.style.display = 'block';
    }
  };

  toggleContainer(td, condition) {
    let container1 = td?.firstElementChild;
    if (container1) {
      container1.style.display = condition ? 'none' : 'block';
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
    if (global.regexTelephone === undefined) global.regexTelephone = "^0[0-9]{9}$";
    if (!new RegExp(global.regexTelephone).test(event.target.value)) {
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
