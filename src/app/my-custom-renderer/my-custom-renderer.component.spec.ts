import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomRendererComponent } from './my-custom-renderer.component';

describe('MyCustomRendererComponent', () => {
  let component: MyCustomRendererComponent;
  let fixture: ComponentFixture<MyCustomRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCustomRendererComponent]
    });
    fixture = TestBed.createComponent(MyCustomRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
