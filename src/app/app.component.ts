import {Component, OnInit} from '@angular/core';
import {CellEdit, OnUpdateCell} from "./cell-edit/cell-edit";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnUpdateCell {
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

  //Provide your regex here in case you are going to use telephone
  static regexTelephone = /^0[0-9]{9}$/

  ngOnInit(): void {
  }

  cellEditor(row: any, td_id: any, key: string, oldValue: any, type?: string, selectList?: any) {
    new CellEdit().edit(row.id, td_id, oldValue, key, this.saveCellValue, type, '', selectList);
  }

  saveCellValue: any = (value: string, key: string, rowId: any): void => {
    switch (key) {
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
