const { CellEdit } = require('../lib/main.js');
const { JSDOM } = require('jsdom');

describe('CellEdit', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html lang="en"><body>' +
      '<table class="table table-bordered table-hover">' +
      '        <thead>' +
      '        <tr>' +
      '          <th class="text-center">Name [Text]</th>' +
      '          <th class="text-center">Age [Number]</th>' +
      '        </tr>' +
      '        </thead>' +
      '        <tbody>' +
      '        <tr>' +
      '          <td class="text-center cell-edit"' +
      '              data-key="name"' +
      '              data-type="text"' +
      '              id="row.id.1">name</td>' +
      '          <td class="text-center cell-edit"' +
      '              data-key="age"' +
      '              data-type="number"' +
      '              id="row.id.2">age' +
      '          </td>' +
      '        </tr>' +
      '        </tbody>' +
      '      </table>' +
      '</body></html>');
    Object.defineProperty(global, 'document', {
      value: dom.window.document,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(global, 'document', {
      value: undefined,
      writable: true,
    });
    dom.window.close();
  });

  describe('createEditableCell', () => {
    it('should create an editable cell with a pencil icon', () => {
      // create a dummy cell element
      const cellToEdit = document.createElement('td');
      cellToEdit.innerHTML = 'test';
      cellToEdit.setAttribute('data-key', 'testKey');
      cellToEdit.setAttribute('id', 'testId');
      cellToEdit.setAttribute('data-type', 'text');

      // create a spy function to pass to createEditableCell
      const saveCellValue = jest.fn();

      // call createEditableCell and get the cell's contents
      new CellEdit().createEditableCell(cellToEdit, saveCellValue)
      const cellContents = cellToEdit.innerHTML;

      // expect the cell to have a button with a pencil icon
      expect(cellContents).toContain('<button');
      expect(cellContents).toContain('fa-pencil');
    });
  });

  // describe('edit', () => {
  //   it('should call the save function with the new value when the save button is clicked', () => {
  //     // create a dummy cell element
  //     const cellToEdit = document.createElement('td');
  //     cellToEdit.innerHTML = 'test';
  //     cellToEdit.setAttribute('td-id', 'testTdId');
  //     cellToEdit.setAttribute('data-key', 'testKey');
  //     cellToEdit.setAttribute('id', 'testId');
  //     cellToEdit.setAttribute('data-type', 'text');
  //
  //     // create a spy function to pass to edit
  //     const saveCellValue = jest.fn();
  //
  //     // call createEditableCell and get the save button
  //     new CellEdit().createEditableCell(cellToEdit, saveCellValue);
  //     var buttonId = "#edit_button" + cellToEdit.getAttribute("td-id");
  //     const saveButton = document.querySelector(buttonId);
  //     // click the save button
  //     if(saveButton!=null) saveButton.click();
  //
  //     // expect the save function to have been called with the new value
  //     expect(saveCellValue).toHaveBeenCalledWith(
  //       '',
  //       'testKey',
  //       'testId',
  //       undefined
  //     );
  //   });
  // });
});
