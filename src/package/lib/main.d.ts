export declare class CellEdit {
  createEditableCell(cell: HTMLElement, saveCellValue: any, selectList?: any): void ;

  edit(tdId: any, oldValue: any, key: any, save: any, type: any, status: any) : void ;
}

export declare class OnUpdateCell {
  constructor();
  saveCellValue(value: any, key: string, rowId: number, row: any): void;
}
