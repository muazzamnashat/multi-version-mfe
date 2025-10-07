import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mfe } from './mfe';

describe('Mfe', () => {
  let component: Mfe;
  let fixture: ComponentFixture<Mfe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mfe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mfe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
