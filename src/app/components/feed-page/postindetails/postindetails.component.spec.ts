import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostindetailsComponent } from './postindetails.component';

describe('PostindetailsComponent', () => {
  let component: PostindetailsComponent;
  let fixture: ComponentFixture<PostindetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostindetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostindetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});