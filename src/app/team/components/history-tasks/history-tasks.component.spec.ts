import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTasksComponent } from './history-tasks.component';

describe('HistoryTasksComponent', () => {
  let component: HistoryTasksComponent;
  let fixture: ComponentFixture<HistoryTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
