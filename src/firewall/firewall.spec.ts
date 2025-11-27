import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Firewall } from './firewall';

describe('Firewall', () => {
  let component: Firewall;
  let fixture: ComponentFixture<Firewall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Firewall]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Firewall);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
