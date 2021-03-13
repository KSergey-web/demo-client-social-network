import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayOrganizationsComponent } from './array-organizations.component';

describe('ArrayOrganizationsComponent', () => {
  let component: ArrayOrganizationsComponent;
  let fixture: ComponentFixture<ArrayOrganizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayOrganizationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
