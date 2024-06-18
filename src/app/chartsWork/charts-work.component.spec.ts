import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsWorkComponent } from './charts-work.component';

describe('ChartsWorkComponent', () => {
  let component: ChartsWorkComponent;
  let fixture: ComponentFixture<ChartsWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartsWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartsWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
