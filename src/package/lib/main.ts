declare global {
  interface Window {
    regexTelephone: string | undefined;
    selectItems: any
  }
}

export class CellEdit {
  condition: boolean | undefined;

  createEditableCell(cellToEdit: HTMLElement, saveCellValue: (newValue: string, key: string, row_id: any, row?: any) => void, selectList?:any) {
    window.selectItems = []
      cellToEdit.setAttribute("td-id", this.createId())

      let oldValue = cellToEdit.innerHTML
      let rowId = cellToEdit.getAttribute("id")
      let tdId = cellToEdit.getAttribute("td-id")
      let key = cellToEdit.getAttribute("data-key")
      let regex = cellToEdit.getAttribute("data-regex")
      let type = cellToEdit.getAttribute("data-type") ?? undefined

      if (regex) window.regexTelephone = regex

      if (key != null && rowId != null && oldValue != null) {
        if (type === 'select') window.selectItems[key] = selectList

        const icon_pencil = document.createElement('i');
        icon_pencil.classList.add('fa-solid', 'fa-pencil');

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-link');
        button.addEventListener('click', (e: Event) => {
          new CellEdit().edit(tdId, oldValue, key ?? '', saveCellValue, type, '');
        });
        button.appendChild(icon_pencil);

        const div = document.createElement('div');
        div.appendChild(button);
        cellToEdit.appendChild(div)
      }
  }

  edit(tdId: any,
       oldValue: any,
       key: string,
       save: (newValue: string, key: string, row_id: any, row?: any) => void,
       type?: string,
       status?: string) {

    const td = document.querySelectorAll('[td-id="' + tdId + '"]')[0] as HTMLTableCellElement;
    const container1 = td?.firstElementChild as HTMLElement;

    if (this.condition) container1.style.display = 'none';
    else container1.style.display = 'block';

    if (status === "save") {
      let newValue, extras;
      if (type == 'select') {
        let select = (document.getElementById("input-" + tdId) as HTMLSelectElement)
        newValue = select.value;
        let opt = document.querySelector('option[value="' + newValue + '"]');
        if (opt != null) extras = opt.getAttribute('data-id');
      } else {
        newValue = (document.getElementById("input-" + tdId) as HTMLTextAreaElement).value;
      }

      save(newValue, key, td.id, extras);
      this.condition = false;
    } else if (status === "cancel") {
      (document.getElementById("input-" + tdId) as HTMLTextAreaElement).value = oldValue;
      this.condition = false;
    } else this.condition = !this.condition;

    if (this.condition) container1.style.display = 'none';
    else container1.style.display = 'block';

    if (this.isNotEditing(tdId)) {

      const saveButton = document.createElement("button");
      saveButton.classList.add('btn', 'btn-link');
      saveButton.setAttribute('type', "button");
      saveButton.addEventListener("click", (e: Event) => this.edit(tdId, oldValue, key, save, type, "save"));
      saveButton.id = "save_button" + tdId;

      const cancelButton = document.createElement("button");
      cancelButton.classList.add('btn', 'btn-link');
      cancelButton.setAttribute('type', "button");
      cancelButton.addEventListener("click", (e: Event) => this.edit(tdId, oldValue, key, save, type, "cancel"));
      cancelButton.id = "cancel_button" + tdId;

      const icon_check = document.createElement('i');
      icon_check.classList.add('fa-solid', 'fa-check');
      const icon_times = document.createElement('i');
      icon_times.classList.add('fa-solid', 'fa-xmark');

      const container = document.createElement('div');
      container.id = "edit-cell-" + tdId;
      container.style.display = 'flex';
      container.style.justifyContent = 'center';

      let input;
      let selectInput: any | undefined;

      if (type == 'select') {
        let selectList : any
        if (window.selectItems == undefined) {
          console.log('Error: ', 'no select items found');
          selectList = [];
        } else selectList = window.selectItems[key]
        container.classList.add('form-group', 'text-center');
        container.style.margin = '0 0 30px 30px';
        container.style.width = '60%';

        selectInput = document.createElement('input');
        selectInput.id = "input-" + tdId;
        selectInput.value = oldValue
        selectInput.classList.add('form-control', 'form-control-sm');
        selectInput.setAttribute('list', "data-list");

        input = document.createElement('datalist');
        input.id = "data-list";
        input.insertAdjacentHTML('afterbegin', "<option selected>" + oldValue + "</option>\n" + this.getOptionsForSelect(selectList, oldValue));
      } else {
        if (type == 'number') {
          input = document.createElement('input');
          input.value = oldValue
          input.type = 'number';
        } else if (type == 'telephone') {
          input = document.createElement('input');
          input.value = oldValue
          input.placeholder = "Telephone Number";
          input.type = "text";
          input.addEventListener("keyup", (e: Event) => this.validateNumber(e));
        } else if (type == 'date') {
          input = document.createElement('input');
          input.value = oldValue
          input.placeholder = "Date";
          input.type = "date";
        } else {
          input = document.createElement('textarea');
          input.value = oldValue
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
      if (type == 'select') {
        container.appendChild(selectInput);
      }
      container.appendChild(input);
      container.appendChild(saveButton);
      container.appendChild(cancelButton);

      if (td != null) td.style.justifyContent = 'center';
      td?.appendChild(container);
    } else {
      const container2 = document.getElementById("edit-cell-" + tdId);
      if (container2 != null) if (this.condition) container2.style.display = 'flex';
      else container2.style.display = 'none';

      if (this.condition) container1.style.display = 'none';
      else container1.style.display = 'block';
    }
  }

  getOptionsForSelect(data: any, oldValue: any): string {
    let htmlString = "";
    data.forEach(function (row: any) {
      if (row.name !== oldValue) htmlString += '<option data-id="' + row.id + '" value="' + row.name + '">\n' + row.name + '</option>\n';
    });
    return htmlString;
  }

  getInput(tdId: string) {
    return document.getElementById("input-" + tdId);
  }

  saveButton(tdId: string) {
    return document.getElementById("save_button" + tdId);
  }

  cancelButton(tdId: string) {
    return document.getElementById("cancel_button" + tdId);
  }

  isEditing(tdId: string) {
    return document.getElementById("edit-cell-" + tdId) !== null;
  }

  isNotEditing(tdId: string) {
    return document.getElementById("edit-cell-" + tdId) === null;
  }

  validateNumber(event: any) {
    if (window.regexTelephone == undefined) window.regexTelephone = "^0[0-9]{9}$"
    if (!new RegExp(window.regexTelephone).test(event.target.value)) {
      event.target.classList.add("is-invalid")
    } else event.target.classList.remove("is-invalid");
  }

  createId(): string {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
}

export abstract class OnUpdateCell {
  saveCellValue: any = (value: string, key: string, rowId: any, row?: any) => void {};
}
