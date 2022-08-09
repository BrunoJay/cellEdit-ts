# CellEdit
Have you ever been faced with a challenge of editing cell data in a table within angular?
Worry not, this package provides the most suitable solution.

Below is a detailed example of how you can use cellEdit to edit cell data in the available data types.

## Data types supported currently

1. `text`
2. `number`
3. `date`
4. `select`  - Editable Dropdown List
5. `telephone` - Phone Number with Regex Validation

## Installation

````
npm i @brunojay/cell-edit
````

## How to Use - Example
1. Import cellEdit into your component

````typescript
import {CellEdit, OnUpdateCell} from "@brunojay/cell-edit";
````

2. Implement AfterViewInit and OnUpdateCell on your component class

````typescript
export class MyComponent implements AfterViewInit, OnUpdateCell {
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
}
````

3. Add an Arrow Function called SaveCellValue to your component as shown below (Please take note of the syntax)

````typescript
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
      //you will add more cases here depending on the cells you are editing
  }
}
````

This is the method where you will be saving your new values using the row id of your record

4. Add function for `ngAfterViewInit` to your component which will be called after the view has been rendered

````typescript
ngAfterViewInit(): void {
  //create an instance of cell Edit
  let cellEdit = new CellEdit();

  //pick all td with cell-edit class name
  const cellsToEdit = document.getElementsByClassName('cell-edit');

  //create editable cells
  for (let i = 0; i < cellsToEdit.length; i++) {
    const cell = cellsToEdit[i] as HTMLElement;
  
    //create the other editable cells from here
    cellEdit.createEditableCell(cell, this.saveCellValue);
  }
}

````

5. Edit your HTML component to add a `div` element as shown below

````html
   <tr *ngFor="let row of rows">
      <td class="text-center cell-edit"
          data-key="name"
          data-type="text"
          id="{{row.id}}">{{ row.name }}</td>
      <td>...//add the rest here</td>
  </tr>
````

### How it looks like

# Text
![Alt text](src/assets/example.png?raw=true "Example Text")

# Date
![Alt text](src/assets/example2.png?raw=true "Example Date")

## Detailed example and DEMO available here

https://cell-edit-ts.stackblitz.io/

## Reach for more help or to contribute

Contact @brunoJay on github or email to brunojay001@gmail.com

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE.md) file for details
