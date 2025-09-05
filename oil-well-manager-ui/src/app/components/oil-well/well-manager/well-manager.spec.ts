import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellManager } from './well-manager';

describe('WellManager', () => {
  let component: WellManager;
  let fixture: ComponentFixture<WellManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
