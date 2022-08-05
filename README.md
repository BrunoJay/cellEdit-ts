# CellEdit
Have you ever been faced with a challenge of editing cells in tables within angular. 
Worry not, this is project comes with a solution to your challenge.
Provided is a detailed example of how you can use cellEdit to edit data of any type and update your values.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

## Data types supported so far

1. Text
2. Number
3. Date
4. Dropdown Lists
5. Telephone with Regex Validation

## DEMO

https://cell-edit-ts.stackblitz.io/

## How to Use
  1. Import cellEdit into your component

````typescript
import {CellEdit, OnUpdateCell} from "./cell-edit/cell-edit";
````

  2. Implement OnUpdateCell on your component class

````typescript
export class MyCellEditComponent implements OnInit, OnUpdateCell
````

  3. Add method SaveCellValue to your component as shown below

````typescript
saveCellValue: any = (value: string, key: string, rowId: any): void => {
  switch (key) {
    case '1':
       break;
  }
}
````

This is the method where you will be saving your new values using the row id of your record

4. Add a `CellEditor` method to your component to be called on button click

````typescript
 cellEditor(row: any, td_id: any, key: string, oldValue: any, type?: string, selectList?: any) {
    new CellEdit().edit(row.id, td_id, oldValue, key, this.saveCellValue, type, '', selectList);
  }
````

5. Edit your HTML component to add a `div` element as shown below

````html
   <td class='text-center' id="{{row.id + '-name'}}">{{ row.name }}
      <div>
        <button class="btn btn-link" (click)="cellEditor(row, row.id + '-name', 'name', row.name)">
          <i class="fa-solid fa-pencil"></i></button>
      </div>
    </td>
````
## Further help

To get more help on cellEdit, contact @brunoJay on github or reach out to brunojay001@gmail.com
