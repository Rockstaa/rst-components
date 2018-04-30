import { Component, Input, OnInit } from '@angular/core';
import { RSTPBarZone } from './interface_progress-bar';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  _Value = 0;
  _StandardMaxValue = true;
  _StandardProgressBarColor = 'lightblue';
  _StandardProgressBarFontColor = 'white';
  _ProgressWidth = 0;
  _CurrentProgressBarColor = this._StandardProgressBarColor;
  _CurrentProgressBarFontColor = this._StandardProgressBarFontColor;
  _Zones: RSTPBarZone[];
  _ZonesInUse: RSTPBarZone[];

  constructor() {}

  @Input() Name = 'rst-progressbar';
  @Input()
  set Value(Value: number) {
    if (Value === null || typeof Value === 'undefined' || isNaN(Value)) {
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
  set ProgressBarColor(Color: string) {
    this._CurrentProgressBarColor = Color;
  }
  @Input()
  set ProgressBarFontColor(Color: string) {
    this._CurrentProgressBarFontColor = Color;
  }
  ngOnInit() {
    if (this.MaxValue !== 100) {
      if (this.MaxValue > 0) {
        this._StandardMaxValue = false;
      } else {
        throw new Error('Your Maxlevel is 0 and causes Divison 0 ERROR');
      }
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
        if (Value >= 0 && Value <= zone.ProgressValue) {
          this._CurrentProgressBarColor = zone.ProgressColor;
          this._CurrentProgressBarFontColor = zone.ProgressFontColor;
          return;
        }
      } else {
        if (
          Value > this._ZonesInUse[ind - 1].ProgressValue &&
          Value <= this._ZonesInUse[ind].ProgressValue
        ) {
          this._CurrentProgressBarColor = zone.ProgressColor;
          this._CurrentProgressBarFontColor = zone.ProgressFontColor;
          return;
        }
      }
    });
  }

  generateStandardZones() {
    this._Zones = [
      { ProgressValue: 33, ProgressColor: 'green', ProgressFontColor: 'black' },
      {
        ProgressValue: 66,
        ProgressColor: 'yellow',
        ProgressFontColor: 'black',
      },
      {
        ProgressValue: this.MaxValue,
        ProgressColor: 'red',
        ProgressFontColor: 'white',
      },
    ];
    this._ZonesInUse = this._Zones;
  }

  generateCustomZones(CustomZones: RSTPBarZone[]) {
    if (CustomZones !== null && typeof CustomZones !== 'undefined') {
      if (CustomZones[CustomZones.length - 1].ProgressValue !== this.MaxValue) {
        CustomZones[CustomZones.length - 1].ProgressValue = this.MaxValue;
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
