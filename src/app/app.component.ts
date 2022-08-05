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
      dateOfBirth: "1977",
      telephone: "24242626267776",
      course: "Agriculture",
    },
    {
      id: "4f2bd030-14c7-11ed-861d-0242ac120002",
      name: "Alexandar Dor",
      age: "25",
      dateOfBirth: "1997",
      telephone: "077334142551",
      course: "Engineering",
    }
  ]

  courses = [
    {id:'wefwefwef',name:'Agriculture'},
    {id:'wefwaegwaqhr',name:'Engineering'},
    {id:'fwaefwefwef',name:'Law'},
    {id:'wefaweffawf',name:'Psychology'}
  ]

  static regexTelephone = /^0[0-9]{9}$/

  ngOnInit(): void {
  }

  cellEditor(row: any, td_id: any, key: string, oldValue: any, type?: string, selectList?: any) {
    new CellEdit().edit(row.id, td_id, oldValue, key, this.saveCellValue, type, '', selectList);
  }

  saveCellValue: any = (value: string, key: string, rowId: any): void => {
  }

}
