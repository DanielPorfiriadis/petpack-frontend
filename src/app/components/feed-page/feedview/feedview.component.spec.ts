import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedviewComponent } from './feedview.component';

describe('FeedviewComponent', () => {
  let component: FeedviewComponent;
  let fixture: ComponentFixture<FeedviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
