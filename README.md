# Smooth Text Rotator

A simple, smooth and lightweight rotating text library.

## Features
- **No dependencies**: Doesn't depend on any NPM library
- **Transitions effects**: Smooth fade on phrase change
- **Font-family and font-size changes handling**: Adjust the width of the space reserved by the rotating space if a font change occur
- **Automatic pause**: Pause the rotating text when it is no longer visible on the screen
- **Accessibility**: An `aria-hidden` attribute is added to the phrases which are not visible
- **Built-in TypeScript declarations**

## Usage
`npm install smooth-text-rotator` or `yarn add smooth-text-rotator`

### index.html
```html
<h1>My <span data-phrases='["super","beautiful","sensational"]'>super</span> title</h1>
```

### index.js
```js
import {TextRotator} from "smooth-text-rotator";

const textRotator = new TextRotator({element: document.querySelector('span[data-phrases]')});
textRotator.start();
```

## Options

Options can be passed when you instantiate a new `TextRotator`.

Name | Type | Default | Description
:--- | :--- | :------ | :----------
element (_required_) | `HtmlSpanElement` | | The element on which the text must rotate
interval | `number` | `4000` | The time between each rotation in milliseconds
automaticPause | `boolean` | `true` | Pause the rotating text when it is no longer visible on the screen

## Methods

Methods that can be called on `TextRotator` instance.

- `start`: Start the text rotation or restart to the first phrase
- `stop`: Stop the text rotation and display the first phrase
- `pause`: Pause the text rotation
- `resume`: Resume the text rotation

## Development

- `yarn install`
- `yarn dev`
