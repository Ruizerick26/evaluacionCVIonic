import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LadingPage } from './lading.page';

describe('LadingPage', () => {
  let component: LadingPage;
  let fixture: ComponentFixture<LadingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
