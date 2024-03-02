import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDialogComponent } from './search-dialog.component';

describe('SearchDialogComponent', () => {
  let component: SearchDialogComponent;
  let fixture: ComponentFixture<SearchDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchDialogComponent]
    });
    fixture = TestBed.createComponent(SearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
