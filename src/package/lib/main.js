"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnUpdateCell = exports.CellEdit = void 0;
var CellEdit = /** @class */ (function () {
    function CellEdit() {
    }
    CellEdit.prototype.createEditableCell = function (cellToEdit, saveCellValue, selectList) {
        var _a;
        window.selectItems = [];
        cellToEdit.setAttribute("td-id", this.createId());
        var oldValue = cellToEdit.innerHTML;
        var rowId = cellToEdit.getAttribute("id");
        var tdId = cellToEdit.getAttribute("td-id");
        var key = cellToEdit.getAttribute("data-key");
        var regex = cellToEdit.getAttribute("data-regex");
        var type = (_a = cellToEdit.getAttribute("data-type")) !== null && _a !== void 0 ? _a : undefined;
        if (regex)
            window.regexTelephone = regex;
        if (key != null && rowId != null && oldValue != null) {
            if (type === 'select')
                window.selectItems[key] = selectList;
            var icon_pencil = document.createElement('i');
            icon_pencil.classList.add('fa-solid', 'fa-pencil');
            var button = document.createElement('button');
            button.classList.add('btn', 'btn-link');
            button.addEventListener('click', function (e) {
                new CellEdit().edit(tdId, oldValue, key !== null && key !== void 0 ? key : '', saveCellValue, type, '');
            });
            button.appendChild(icon_pencil);
            var div = document.createElement('div');
            div.appendChild(button);
            cellToEdit.appendChild(div);
        }
    };
    CellEdit.prototype.edit = function (tdId, oldValue, key, save, type, status) {
        var _this = this;
        var td = document.querySelectorAll('[td-id="' + tdId + '"]')[0];
        var container1 = td === null || td === void 0 ? void 0 : td.firstElementChild;
        if (this.condition)
            container1.style.display = 'none';
        else
            container1.style.display = 'block';
        if (status === "save") {
            var newValue = void 0, extras = void 0;
            if (type == 'select') {
                var select = document.getElementById("input-" + tdId);
                newValue = select.value;
                var opt = document.querySelector('option[value="' + newValue + '"]');
                if (opt != null)
                    extras = opt.getAttribute('data-id');
            }
            else {
                newValue = document.getElementById("input-" + tdId).value;
            }
            save(newValue, key, td.id, extras);
            this.condition = false;
        }
        else if (status === "cancel") {
            document.getElementById("input-" + tdId).value = oldValue;
            this.condition = false;
        }
        else
            this.condition = !this.condition;
        if (this.condition)
            container1.style.display = 'none';
        else
            container1.style.display = 'block';
        if (this.isNotEditing(tdId)) {
            var saveButton = document.createElement("button");
            saveButton.classList.add('btn', 'btn-link');
            saveButton.setAttribute('type', "button");
            saveButton.addEventListener("click", function (e) { return _this.edit(tdId, oldValue, key, save, type, "save"); });
            saveButton.id = "save_button" + tdId;
            var cancelButton = document.createElement("button");
            cancelButton.classList.add('btn', 'btn-link');
            cancelButton.setAttribute('type', "button");
            cancelButton.addEventListener("click", function (e) { return _this.edit(tdId, oldValue, key, save, type, "cancel"); });
            cancelButton.id = "cancel_button" + tdId;
            var icon_check = document.createElement('i');
            icon_check.classList.add('fa-solid', 'fa-check');
            var icon_times = document.createElement('i');
            icon_times.classList.add('fa-solid', 'fa-xmark');
            var container = document.createElement('div');
            container.id = "edit-cell-" + tdId;
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            var input = void 0;
            var selectInput = void 0;
            if (type == 'select') {
                var selectList = void 0;
                if (window.selectItems == undefined) {
                    console.log('Error: ', 'no select items found');
                    selectList = [];
                }
                else
                    selectList = window.selectItems[key];
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
            }
            else {
                if (type == 'number') {
                    input = document.createElement('input');
                    input.value = oldValue;
                    input.type = 'number';
                }
                else if (type == 'telephone') {
                    input = document.createElement('input');
                    input.value = oldValue;
                    input.placeholder = "Telephone Number";
                    input.type = "text";
                    input.addEventListener("keyup", function (e) { return _this.validateNumber(e); });
                }
                else if (type == 'date') {
                    input = document.createElement('input');
                    input.value = oldValue;
                    input.placeholder = "Date";
                    input.type = "date";
                }
                else {
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
            if (type == 'select') {
                container.appendChild(selectInput);
            }
            container.appendChild(input);
            container.appendChild(saveButton);
            container.appendChild(cancelButton);
            if (td != null)
                td.style.justifyContent = 'center';
            td === null || td === void 0 ? void 0 : td.appendChild(container);
        }
        else {
            var container2 = document.getElementById("edit-cell-" + tdId);
            if (container2 != null)
                if (this.condition)
                    container2.style.display = 'flex';
                else
                    container2.style.display = 'none';
            if (this.condition)
                container1.style.display = 'none';
            else
                container1.style.display = 'block';
        }
    };
    CellEdit.prototype.getOptionsForSelect = function (data, oldValue) {
        var htmlString = "";
        data.forEach(function (row) {
            if (row.name !== oldValue)
                htmlString += '<option data-id="' + row.id + '" value="' + row.name + '">\n' + row.name + '</option>\n';
        });
        return htmlString;
    };
    CellEdit.prototype.getInput = function (tdId) {
        return document.getElementById("input-" + tdId);
    };
    CellEdit.prototype.saveButton = function (tdId) {
        return document.getElementById("save_button" + tdId);
    };
    CellEdit.prototype.cancelButton = function (tdId) {
        return document.getElementById("cancel_button" + tdId);
    };
    CellEdit.prototype.isEditing = function (tdId) {
        return document.getElementById("edit-cell-" + tdId) !== null;
    };
    CellEdit.prototype.isNotEditing = function (tdId) {
        return document.getElementById("edit-cell-" + tdId) === null;
    };
    CellEdit.prototype.validateNumber = function (event) {
        if (window.regexTelephone == undefined)
            window.regexTelephone = "^0[0-9]{9}$";
        if (!new RegExp(window.regexTelephone).test(event.target.value)) {
            event.target.classList.add("is-invalid");
        }
        else
            event.target.classList.remove("is-invalid");
    };
    CellEdit.prototype.createId = function () {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    };
    return CellEdit;
}());
exports.CellEdit = CellEdit;
var OnUpdateCell = /** @class */ (function () {
    function OnUpdateCell() {
        this.saveCellValue = function (value, key, rowId, row) { return void {}; };
    }
    return OnUpdateCell;
}());
exports.OnUpdateCell = OnUpdateCell;
