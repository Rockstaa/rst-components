import { Component, Input, OnInit } from '@angular/core';
import { RST_PBar_Zone } from './interface_progress-bar';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  _Value = 0;
  _StandardMaxValue = true;
  _ProgressWidth = 0;
  _CurrentColor = 'green';
  _Zones: RST_PBar_Zone[];
  _ZonesInUse: RST_PBar_Zone[];

  constructor() {}

  @Input() Name = 'rst-progressbar';
  @Input()
  set Value(Value: number) {
    if (Value === null || typeof Value === 'undefined') {
      this.onValueChange(0);
    } else {
      this.onValueChange(Value);
    }
  }
  @Input() MaxValue = 100;
  @Input() UseDefaultZones = false;
  @Input() UseCustomZones = false;
  @Input() CustomZones;
  @Input()
  set Color(Color: string) {
    this._CurrentColor = Color;
  }
  ngOnInit() {
    if (this.MaxValue !== 100) {
      this._StandardMaxValue = false;
    }
    if (this.UseCustomZones) {
      this.generateCustomZones(this.CustomZones);
    } else {
      this.generateStandardZones();
    }
  }

  onValueChange(Value) {
    this._Value = Value;
    this.setProgressBarWidth(Value);
    if (this.UseCustomZones || this.UseDefaultZones) {
      this.setColor(Value);
    }
  }

  setProgressBarWidth(Value) {
    if (!this._StandardMaxValue) {
      this._ProgressWidth = Value / this.MaxValue * 100;
    } else {
      this._ProgressWidth = Value;
    }
  }

  setColor(Value) {
    this._ZonesInUse.forEach((zone, ind) => {
      if (ind === 0) {
        if (Value >= 0 && Value <= zone.value) {
          this._CurrentColor = zone.color;
          return;
        }
      } else {
        if (
          Value > this._ZonesInUse[ind - 1].value &&
          Value <= this._ZonesInUse[ind].value
        ) {
          this._CurrentColor = zone.color;
          return;
        }
      }
    });
  }

  generateStandardZones() {
    this._Zones = [
      { value: 33, color: 'green' },
      { value: 66, color: 'yellow' },
      { value: this.MaxValue, color: 'red' },
    ];
    this._ZonesInUse = this._Zones;
  }

  generateCustomZones(CustomZones: RST_PBar_Zone[]) {
    if (CustomZones !== null && typeof CustomZones !== 'undefined') {
      if (CustomZones[CustomZones.length - 1].value !== this.MaxValue) {
        CustomZones[CustomZones.length - 1].value = this.MaxValue;
        console.warn(
          'RST-COMPONENTS-PROGRESS-BAR: Your last configured Zone is not equal to the MaxValue, ' +
            'we changed the value to MaxLevel, please adjust your Zones',
        );
      }
      this._ZonesInUse = CustomZones;
    } else {
      this.UseCustomZones = false;
    }
  }
}
