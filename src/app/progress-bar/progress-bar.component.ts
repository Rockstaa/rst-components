import { Component, Input, OnInit } from '@angular/core';

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
  _Zones = [
    { zone: 33, color: 'green' },
    { zone: 66, color: 'yellow' },
    { zone: 100, color: 'red' },
  ];

  constructor() {}

  @Input()
  set Value(Value: number) {
    if (Value === null || typeof Value === 'undefined') {
      this.onValueChange(0);
    } else {
      this.onValueChange(Value);
    }
  }
  @Input() MaxValue = 100;
  @Input() UseZones = false;
  @Input()
  set Color(Color: string) {
    this._CurrentColor = Color;
  }
  ngOnInit() {
    if (this.MaxValue !== 100) {
      this._StandardMaxValue = false;
    }
  }

  onValueChange(Value) {
    this._Value = Value;
    this.setProgressBarWidth(Value);
    if (this.UseZones) {
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
    if (Value >= 0 && Value <= this._Zones[0].zone) {
      this._CurrentColor = this._Zones[0].color;
    } else if (Value > this._Zones[0].zone && Value <= this._Zones[1].zone) {
      this._CurrentColor = this._Zones[1].color;
    } else {
      this._CurrentColor = this._Zones[2].color;
    }
  }
}
