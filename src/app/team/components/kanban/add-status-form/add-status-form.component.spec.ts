import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatusFormComponent } from './add-status-form.component';

describe('AddStatusFormComponent', () => {
  let component: AddStatusFormComponent;
  let fixture: ComponentFixture<AddStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStatusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
