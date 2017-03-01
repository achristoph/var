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

R: Has controlled component concept. 

```javascript

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

###HTTP Service
V: Vue has no built-in HTTP library. The popular HTTP library is vue-resource. It supports Promise API, URI Templates, interceptors. It also has friendly RESTful methods 

```javascript
//GET /someUrl
this.$http.get('/someUrl').then(response => {
    // get body data
    this.someData = response.body;
  }, response => {
    // error callback
  });
// POST someItem/1
  resource.save({id: 1}, {item: this.item}).then(response => {
    // success callback
  }, response => {
    // error callback
  });
```

A: Angular has a built-in HTTP library that is implemented with RxJs, the default return value is Observable object

```javascript
constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

```
R: React has no built-in HTTP library. The are many HTTP libraries to use like Axios, Fetch 


###Component Interaction
A: Angular has both prop-like mechanism for parent-child communication and event emitter

```javascript
@Component({
  selector: 'hero-child',
  template: `
    <h3>{{hero.name}} says:</h3>
    <p>I, {{hero.name}}, am at your service, {{masterName}}.</p>
  `
})
export class HeroChildComponent {
  @Input() hero: Hero;
  @Input('master') masterName: string;
}

@Component({
  selector: 'hero-parent',
  template: `
    <h2>{{master}} controls {{heroes.length}} heroes</h2>
    <hero-child *ngFor="let hero of heroes"
      [hero]="hero"
      [master]="master">
    </hero-child>
  `
})
export class HeroParentComponent {
  heroes = HEROES;
  master: string = 'Master';
}

```
R: React only uses props mechanism parent to child 

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

V: Vue has both props and event emitter mechanism:

```javascript
Vue.component('child', {
  // declare the props
  props: ['message'],
  // just like data, the prop can be used inside templates
  // and is also made available in the vm as this.message
  template: '<span>{{ message }}</span>'
})
<child message="hello!"></child>

```

#Change Detection
A: Angular Change Detection is done using NgZone( based on Zone.JS) where it provides an execution context for asynchronous operation

```javascript
ObservableWrapper.subscribe(this.zone.onTurnDone, () => {
  this.zone.run(() => {
    this.tick();
  });
});

tick() {
  // perform change detection
  this.changeDetectorRefs.forEach((detector) => {
    detector.detectChanges();
  });
}
```

R: React uses virtual DOM in its change detection. When a component’s state changes, it triggers the re-render of the entire component sub-tree, starting at that component as root. To avoid unnecessary re-renders of child components, you need to implement shouldComponentUpdate everywhere and use immutable data structures

V: component’s dependencies are automatically tracked during its render, so the system knows precisely which components actually need to re-render

`![Vue Change Detection](vue_cd.png)

###Form
V:

```javascript

```
A:

```javascript

```
R:

```javascript

```

#Pipes
V:

```javascript

```
A:

```javascript

```
R:

```javascript

```

