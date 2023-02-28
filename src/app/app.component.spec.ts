import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should create editable cells for each td with cell-edit class name', () => {
    // arrange
    const cellEditSpy = jest.spyOn(component, 'ngAfterViewInit').mockImplementation(() => {});

    // act
    component.ngAfterViewInit();

    // assert
    expect(cellEditSpy).toHaveBeenCalled();
  });

  it('should update the value of the cell', () => {
    // arrange
    const rowId = '4af5a284-14c7-11ed-861d-0242ac120002';
    const key = 'name';
    const value = 'Test Name';

    // act
    component.saveCellValue(value, key, rowId);

    // assert
    expect(component.rows[0].name).toEqual(value);
  });
});
