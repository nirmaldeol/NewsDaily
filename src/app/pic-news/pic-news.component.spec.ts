import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicNewsComponent } from './pic-news.component';

describe('PicNewsComponent', () => {
  let component: PicNewsComponent;
  let fixture: ComponentFixture<PicNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
