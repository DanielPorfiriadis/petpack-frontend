import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniprofComponent } from './miniprof.component';

describe('MiniprofComponent', () => {
  let component: MiniprofComponent;
  let fixture: ComponentFixture<MiniprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniprofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
