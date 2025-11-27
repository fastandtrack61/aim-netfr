import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WanLan } from './wan-lan';

describe('WanLan', () => {
  let component: WanLan;
  let fixture: ComponentFixture<WanLan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WanLan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WanLan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
