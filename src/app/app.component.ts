import {AfterViewInit, Component} from '@angular/core';
import {CellEdit, OnUpdateCell} from "./cell-edit/cell-edit";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnUpdateCell {
  title = 'cell-edit';

  rows = [
    {
      id: "4af5a284-14c7-11ed-861d-0242ac120002",
      name: "John Wick",
      age: "45",
      dateOfBirth: "1977-08-18",
      telephone: "2424262626",
      course: "Agriculture",
    },
    {
      id: "4f2bd030-14c7-11ed-861d-0242ac120002",
      name: "Alexandar Dor",
      age: "25",
      dateOfBirth: "1997-09-01",
      telephone: "0773341425",
      course: "Engineering",
    }
  ]

  courses = [
    {id: 'wefwefwef', name: 'Agriculture'},
    {id: 'wefwaegwaqhr', name: 'Engineering'},
    {id: 'fwaefwefwef', name: 'Law'},
    {id: 'wefaweffawf', name: 'Psychology'}
  ]

  ngAfterViewInit(): void {
    //create an instance of cell Edit
    let cellEdit = new CellEdit()

    //pick all td with cell-edit class name
    const cellsToEdit = document.getElementsByClassName('cell-edit');

    //create editable cells
    for (let i = 0; i < cellsToEdit.length; i++) {
      const cell = cellsToEdit[i] as HTMLElement;

      //check for cells with select as type and pass select items
      let type = cell.getAttribute("data-type") ?? undefined
      if (type === 'select') {
        let key = cell.getAttribute("data-name")

        //add the if statements here in case of select cells
        //make sure you pass the list here which
        //your list should have name and id as keys
        if (key === 'course') {
          cellEdit.createEditableCell(cell, this.saveCellValue, this.courses)
        }
      } else {
        //create the other editable cells from here
        cellEdit.createEditableCell(cell, this.saveCellValue)
      }
    }
  }

  saveCellValue: any = (value: string, key: string, rowId: any): void => {
    switch (key) {
      case 'name':
        if (this.rows.some(x => x.id === rowId)) {
          this.rows.forEach(function (item) {
            if (item.id === rowId) {
              item.name = value;
            }
          });
        }
        break;
      case 'age':
        if (this.rows.some(x => x.id === rowId)) {
          this.rows.forEach(function (item) {
            if (item.id === rowId) {
              item.age = value;
            }
          });
        }
        console.log("value", value)
        break;
      case 'dateOfBirth':
        if (this.rows.some(x => x.id === rowId)) {
          this.rows.forEach(function (item) {
            if (item.id === rowId) {
              item.dateOfBirth = value;
            }
          });
        }
        console.log("value", value)
        break;
      case 'telephone':
        if (this.rows.some(x => x.id === rowId)) {
          this.rows.forEach(function (item) {
            if (item.id === rowId) {
              item.telephone = value;
            }
          });
        }
        console.log("value", value)
        break;
      case 'course':
        if (this.rows.some(x => x.id === rowId)) {
          this.rows.forEach(function (item) {
            if (item.id === rowId) {
              item.course = value;
            }
          });
        }
        console.log("value", value)
        break;
    }
  }

}
