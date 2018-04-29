import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { AppComponent } from '../app.component';

let component: ProgressBarComponent;
let fixture: ComponentFixture<ProgressBarComponent>;

describe('ProgressBarComponent', () => {
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

    it('should Render value% when a value is set', () => {
      for (let i = 0; i < 10; i = i + 1) {
        const RandomMaxValue = Math.floor(Math.random() * 10000);
        const RandomValue = Math.floor(Math.random() * RandomMaxValue);
        component.MaxValue = RandomMaxValue;
        component.ngOnInit();
        component.Value = RandomValue;
        fixture.detectChanges();
        expect(
          fixture.nativeElement.querySelector('.progressBar__value').innerText,
        ).toEqual(component._Value + '%');
      }
    });

    it('Value should be 0 when value is set to null', () => {
      component.Value = null;
      console.log(component.Value);
      expect(component._Value).toBe(0);
    });

    it('Value should be 0 when value is set to undefined', () => {
      component.Value = undefined;
      expect(component._Value).toBe(0);
    });

    it('should set _StandardMaxValue to false when Value is higher than 100', () => {
      component.MaxValue = 200;
      component.ngOnInit();
      component.Value = 200;
      expect(component._StandardMaxValue).toBeFalsy();
    });

    it('should have the defined width of  < 100%  when _StandardMaxValue is set to false', () => {
      for (let i = 0; i < 10; i = i + 1) {
        const RandomMaxValue = Math.floor(Math.random() * 10000);
        const RandomValue = Math.floor(Math.random() * RandomMaxValue);
        component.MaxValue = RandomMaxValue;
        component.ngOnInit();
        component.Value = RandomValue;
        expect(component._ProgressWidth).toBeLessThanOrEqual(100);
      }
    });
  });
  describe('Color Tests', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ProgressBarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should have standard color green when no other color is set or default, custom zones are in use', () => {
      component.Value = 9;
      expect(component._CurrentColor).toBe('green');
    });
    it('should have the new color aqua when a new color is set', () => {
      component._Value = 52;
      component.Color = 'aqua';
      expect(component._CurrentColor).toBe('aqua');
    });
    it('color should be yellow when value is set to 40 and default zones are in use', () => {
      component.UseDefaultZones = true;
      component.Value = 40;
      expect(component._CurrentColor).toBe('yellow');
    });
    it('color should be blue when custom zone on position 0 is used and value is 35', () => {
      const Customzones = [
        { value: 50, color: 'blue' },
        { value: 100, color: 'red' },
      ];
      component.UseCustomZones = true;
      component.CustomZones = Customzones;
      component.ngOnInit();
      component.Value = 35;
      expect(component._CurrentColor).toBe('blue');
    });
    it('setColor method shouldnt called when there are no zones in use', () => {
      const spySetColor = spyOn(component, 'setColor');
      component.Value = 33;
      expect(spySetColor).toHaveBeenCalledTimes(0);
    });
    it('setColor method should called when there are zones in use', () => {
      const spySetColor = spyOn(component, 'setColor');
      component.UseDefaultZones = true;
      component.ngOnInit();
      component.Value = 33;
      component.Value = 22;
      component.Value = 99;
      expect(spySetColor).toHaveBeenCalledTimes(3);
    });
  });

  describe('Zone Tests', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ProgressBarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('Custom Zones shouldnt be used when the CustomZones are set to null or undefined', () => {
      const CustomZones = null;
      component.UseCustomZones = true;
      component.CustomZones = CustomZones;
      component.ngOnInit();
      expect(component.UseCustomZones).toBe(false);
    });
    it('_ZonesInUse should use the CustomZones when CustomZones are set', () => {
      const CustomZones = [
        { value: 50, color: 'green' },
        { value: 100, color: 'red' },
      ];
      component.UseCustomZones = true;
      component.CustomZones = CustomZones;
      component.ngOnInit();
      expect(component._ZonesInUse).toEqual(CustomZones);
    });
    it('_ZonesInUse should use the DefaultZones when UseDefaultZones is set to true', () => {
      const DefaultZones = [
        { value: 33, color: 'green' },
        { value: 66, color: 'yellow' },
        { value: component.MaxValue, color: 'red' },
      ];
      component.UseDefaultZones = true;
      component.ngOnInit();
      expect(component._ZonesInUse).toEqual(DefaultZones);
    });
  });
});
