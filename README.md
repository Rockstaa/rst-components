# RST-Components

Simple Angular 6 collection of ui-components.

## Getting Started

Feel free to fork or clone the repository and use it in your own projects. At the moment I'm working on the Progress-Bar Component, but there will be more in the future.

The project is build with Angular-CLI 6.0.0

## Running the tests

You can run the implemented test with the Karma Test Runner


# Progress Bar
### How to use it
You can implement it in any component you like, but keep it in a shared module to have more than one instance of this component.

The only necessary Variable of this component is the [Value] Input Variable.
```html
<app-progress-bar [Value]="100"></app-progress-bar>
<app-progress-bar [Value]="MyValue"></app-progress-bar>
<app-progress-bar [Value]="MyObject.Value"></app-progress-bar>
```
### Input Variables
#### Name
You can give the Progress Bar a specific name you want to set the html name attribute
#### Value
Value of the Progress Bar
#### MaxValue
You can set the maximal value of the progress to any value you want to. For example 1000 then the progress bar will have a range between 0 and 1000 %. The initial Value is 100.
### ProgressBarColor
You can set your own progress bar color for example 'blue' or any valid hexcode like '#ededed'.
### ProgressBarFontColor
You can set your own font color for the progress bar for example 'white' or any valid hexcode like '#1def8a'
#### UseStripedProgressbar
When set to true, the progress bar will have a striped background, the initial Value is false.
#### UseStripedAnimation
When set to true, the progress bar is animated the whole time, initial Value is false.
#### UseDefaultZones
You can use zones to mark ranges within your maximal value. When you set the value to true the zones will be used, standard value is false. The default zones are specified in the following way:

```javascript
[
  {
   ProgressValue: 33,
   ProgressColor: 'green', 
   ProgressFontColor: 'black' },
  {
   ProgressValue: 66,
   ProgressColor: 'yellow',
   ProgressFontColor: 'black',
  },
  {
   ProgressValue: this.MaxValue,
   ProgressColor: 'red',
   ProgressFontColor: 'white',
  }
]
```

- From the value range 0 to 33 the progress bar will be green and will have a black font color
- From the value range 33 to 66 the progress bar will be green and will have a black font color
- From the value range 66 to MaxValue (Standard is 100) the progres bar will be red and will have a white font color

### UseCustomZones

You can create your own custom zones which can created with the help of the RSTPBarZone interface, when you set the value to true your custom zones will be used, but keep in mind that you have to pass one in.

```javascript
export interface RSTPBarZone{
  ProgressValue: number;
  ProgressColor: string;
  ProgressFontColor: string;
}
```

For Example you could create the following custom zone

```javascript
[
  {
   ProgressValue: 20,
   ProgressColor: 'green', 
   ProgressFontColor: 'black' },
  {
   ProgressValue: 40,
   ProgressColor: 'yellow',
   ProgressFontColor: 'black',
  },
  {
   ProgressValue: 60,
   ProgressColor: 'red',
   ProgressFontColor: 'white',
  }, 
  {
   ProgressValue: 80,
   ProgressColor: '#ededed',
   ProgressFontColor: 'black',
  },
  {
   ProgressValue: 100,
   ProgressColor: '#000000',
   ProgressFontColor: 'white',
  },
]
```
