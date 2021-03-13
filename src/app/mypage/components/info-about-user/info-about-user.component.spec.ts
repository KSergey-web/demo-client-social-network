import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAboutUserComponent } from './info-about-user.component';

describe('InfoAboutUserComponent', () => {
  let component: InfoAboutUserComponent;
  let fixture: ComponentFixture<InfoAboutUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAboutUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAboutUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
