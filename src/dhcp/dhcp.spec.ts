import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dhcp } from './dhcp';

describe('Dhcp', () => {
  let component: Dhcp;
  let fixture: ComponentFixture<Dhcp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dhcp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dhcp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
