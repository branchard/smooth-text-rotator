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
fadeTransitionDuration | `number` | `200` | The duration of the opacity transition
fadeTransitionTimingFunction | `string` | `ease` | The timing function of the opacity transition
widthTransitionDuration | `number` | `350` | The duration of the width transition
widthTransitionTimingFunction | `string` | `ease` | The timing function of the width transition

## Methods

Methods that can be called on `TextRotator` instance.

- `start()`: Start the text rotation or restart to the first phrase
- `stop()`: Stop the text rotation and display the first phrase
- `pause()`: Pause the text rotation
- `resume()`: Resume the text rotation
- `next()`: Rotate to the next phrase
- `previous()`: Rotate to the previous phrase
- `select(index)`: Go to a specific phrase
- `prepend(phrase)`: Prepend a phrase
- `append(phrase)`: Append a phrase
- `insert(phrase, index)`: Insert a phrase at a specific index
- `remove(index)`: Remove a phrase

## Events

Specific events can be listened with `addEventListened(name: string, callback: (event) => void)`.

Name | Callback event object | Description
:--- | :---------------- | :----------
start | `{currentIndex: number, currentPhraseElement: HTMLSpanElement}` | Occur when the phrases rotation starts
stop | `{currentIndex: number, currentPhraseElement: HTMLSpanElement}` | Occur when the phrases rotation stops
rotation | `{previousIndex: number, previousPhraseElement: HTMLSpanElement, nextIndex: number, nextPhraseElement: HTMLSpanElement}` | Occur when the text is rotating
widthUpdate | `{currentIndex: number, currentPhraseElement: HTMLSpanElement, previousWidth: number, nextWidth: number}` | Occur when the parent width is updated


## Development

- `yarn install`
- `yarn dev`
