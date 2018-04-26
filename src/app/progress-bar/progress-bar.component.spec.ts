import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { AppComponent } from '../app.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ProgressBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Value Tests', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ProgressBarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set a value', () => {
      component.Value = 9;
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('.progressBar__value').innerText,
      ).toEqual('9%');
    });

    it('should set _StandardMaxValue to false when Value is higher than 100', () => {
      component.MaxValue = 200;
      component.ngOnInit();
      component.Value = 200;
      fixture.detectChanges();
      expect(component._StandardMaxValue).toBeFalsy();
    });

    it('should have the defined width of  < 100%  when _StandardMaxValue is set to false', () => {
      const RandomMaxValue = Math.floor(Math.random() * 10000);
      const RandomValue = Math.floor(Math.random() * RandomMaxValue);
      component.MaxValue = RandomMaxValue;
      component.ngOnInit();
      component.Value = RandomValue;

      fixture.detectChanges();
      expect(component._ProgressWidth).toBeLessThanOrEqual(100);
    });
  });
});
