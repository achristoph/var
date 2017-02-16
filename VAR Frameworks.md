### VAR Framework Comparison: Vue, Angular, React

### Overview
* V: Vue is the newest framework that influenced by several major frameworks - Angular, React and Polymer. 40k+ GitHub stars. Developed by Evan You

* Polymer example:

```html
<dom-module id="app">
  <template>
    <style>
    	color: black
    </style>
    <h1>Hello World!</h1>
  </template>
  <script>
    Polymer({
      is: 'app'
    });
  </script>
</dom-module>
```
* A: Angular 2 is released from beta in late 2016. Soon to be called Angular 4 due to npm naming issue. Developed by Google. 20k+ GitHub stars

* R: React released as an open source in 2015. 58k+ GitHub stars. Developed by Facebook.

#### Bundling:

* V: works without Bundling, no specific preference on bundling
* A: SystemJS - dynamic ES module loader, or Webpack,etc - using Typescript highly preferred
* R: Without JSX not needed, with JSX - Webpack,etc - almost always preferred

#### Component Structure
V: Single-file Component Preferred: CSS + JS + HTML - .vue extension

`Header.vue`

```html
<template>
	<h1>Hello World!</h1>
</template>
<script>
	import OtherComponent from './OtherComponent.vue'
	export default {	
	}
</script>
<style scoped>
	color: black;
</style>
```

A: CSS, TS, HTML - separate files for styles, component logic and template

`header.component.css`

```css
color: black;
```

`header.component.html`

```html
<h1>Hello World!</h1>
```

`header.component.ts`

```javascript	
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor() {}
}	
```

R: JSX + JS, CSS separate file , React Native does a combined JSX + CSS

`header.css`

```css
:local(.title) {
  color: black;
}
```

`header.jsx`

```javascript
	import React, {Component} from 'react';
	import styles from './Header.css';
	
	class Header extends Component {
		render(){
			return (
				<h1 class={styles.title}>Hello World!</h1>
			)
		}
	}
	
```


####Component Scope declaration

V: Has global and local component concept: Global components available to any component in the application where as the local ones only visible to the its parent

```javascript
// global registration
Vue.component('my-component', {
})
```

```javascript
// local registration
var Child = {
  template: '<div>I am a child component!</div>'
}
new Vue({
  components: {
    // <child-component> will only be available in parent's template
    'child-component': Child
  }
})
```

A: Has an extensive module-based system. This introduces extra learning curve to understand types of objects in Angular and their interactions. e.g: @Injectable, @NgModule, etc.

* Angular has module concept where there is always a root module along with a root component

```javascript

// app.component.ts serves a the root component
import { Component } from '@angular/core';

@Component({
  selector: 'app-component',
  template: `<div>Hello world!</div>`
})
export class AppComponent {}

// home.module - an additional module for homepage
import {Home} from "./home.component";

@NgModule({
    declarations: [Home],
exports: [Home] // this is required to make Home component available to the module that import this module
})
export class HomeModule {
}

// app.module
import {HomeModule} from "./home.module";

@NgModule({
  declarations: [...],
  imports: [BrowserModule, HomeModule],
  providers: [UserService, LessonsService],
  bootstrap: [AppComponent]
})
export class AppModule {

}

```

R: Has controlled component concept

```javascript
console.log('a')
```

####Event Handling
A: Angular has underscore form or syntatic sugar version

```html
//Binding to regular click event
  <button (click)="onClickMe()">Click me!</button>
//Binding to a custom event called deleteRequest
<hero-detail(deleteRequest)="deleteHero($event)" [hero]="currentHero"></hero-detail>
// two-way data binding
<input [(ngModel)]="heroName">
<input [value]="currentHero.name"
       (input)="currentHero.name=$event.target.value" >
```

R: React uses camelized event name. There's no two-way data binding by default on React. 
```html
<button onClick={activateLasers}>
  Activate Lasers
</button>
<input type="text" value={this.state.value} onChange={this.handleChange} />
```

V:
Vue has a unique event modifier feature that can be added to the event handler such as prevent default action on anchor tag or form submission.
```html
<a v-on:click.once="doThis"></a>
//syntatic sugar form
<a @click.once="doThis"></a>
//two-way data binding
<input v-model="message">
```

####State
V: Data is mutated. When a new object is added to the state.  Vue will walk through all of its properties and convert them to getter and setters. Vue’s reactivity system now keeps track of the state and will automatically re-render the DOM when it is mutated.

```javascript
this.message = this.message.split('').reverse().join('');
```

A: has ChangeDetectionStrategy.OnPush in addition to its default strategy. This combined with ImmutableJS / always passing new objects - will improve change detection performance 

```javascript
this.message = this.message.split('').reverse().join('');
```

R:
State is immutable, cannot be directly changed. Use setState:

```javascript
this.setState({ 
    message: this.state.message.split('').reverse().join('') 
});
```

###Event Passing
Parent Child Communication
Angular: emit
React: props
Vue: props, emit. eventBus (centralized code)

###Service
