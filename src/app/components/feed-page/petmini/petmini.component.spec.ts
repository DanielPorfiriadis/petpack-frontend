import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetminiComponent } from './petmini.component';

describe('PetminiComponent', () => {
  let component: PetminiComponent;
  let fixture: ComponentFixture<PetminiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetminiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetminiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
