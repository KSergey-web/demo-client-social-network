import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskFormComponent } from './update-task-form.component';

describe('UpdateTaskFormComponent', () => {
  let component: UpdateTaskFormComponent;
  let fixture: ComponentFixture<UpdateTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTaskFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
