import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserFormToGroupComponent } from './add-user-form-to-group.component';

describe('AddUserFormToGroupComponent', () => {
  let component: AddUserFormToGroupComponent;
  let fixture: ComponentFixture<AddUserFormToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserFormToGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserFormToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
