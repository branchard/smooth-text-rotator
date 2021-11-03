import {isArrayOfString} from "./type-guards";
import {EventMap} from "./events";

type Options = {
  element: HTMLSpanElement;
  interval?: number;
  automaticPause?: boolean;
  fadeTransitionDuration?: number;
  fadeTransitionTimingFunction?: string;
  widthTransitionDuration?: number;
  widthTransitionTimingFunction?: string;

  // phrases: string[] TODO
  // shuffle: boolean TODO
}

export class TextRotator {
  private readonly options: Required<Options>;
  private readonly phraseElements: HTMLSpanElement[] = [];
  private index: number = 0;
  private intervalID: number | null = null;
  private started: boolean = false;
  private listeners: { [T in keyof EventMap]: ((event: EventMap[T]) => void)[] } = {
    start: [],
    stop: [],
    rotation: [],
    widthUpdate: []
  };

  constructor(options: Options) {
    this.options = {
      interval: 4000,
      automaticPause: true,
      fadeTransitionDuration: 200,
      fadeTransitionTimingFunction: 'ease',
      widthTransitionDuration: 350,
      widthTransitionTimingFunction: 'ease',
      ...options
    }

    if (this.options.element.dataset.phrases === undefined) {
      throw {
        error: new Error(`The 'phrases' data attribute is not defined in the passed element`),
        element: this.options.element
      };
    }

    const phrases: unknown = JSON.parse(this.options.element.dataset.phrases);

    // Check if the parsed json is an array of string
    if (!isArrayOfString(phrases)) {
      throw {
        error: new Error(`The 'phrases' data attribute in the passed element is not a JSON that is an array of string`),
        element: this.options.element
      };
    }

    this.options.element.innerHTML = "";
    this.options.element.style.display = 'inline-block';
    this.options.element.style.position = 'relative';
    this.options.element.style.transitionProperty = 'width';
    this.options.element.style.transitionDuration = `${this.options.widthTransitionDuration}ms`;
    this.options.element.style.transitionTimingFunction = this.options.widthTransitionTimingFunction;

    phrases.forEach((phrase) => {
      this.append(phrase);
    });

    try {
      this.setupResizeObserver();
    } catch (e) {
      console.error(e);
    }

    if (this.options.automaticPause) {
      try {
        this.setupIntersectionObserver();
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * Start or restart the rotating text
   */
  public start(): void {
    if (this.started) {
      this.stop();
    }

    this.started = true;
    this.index = 0;
    this.startInterval();
  }

  public stop(): void {
    if (this.index != 0) {
      this.setElementHidden(this.phraseElements[this.index]);
      this.setElementVisible(this.phraseElements[0]);
      this.updateWidth(this.phraseElements[0].offsetWidth);
    }

    this.started = false;
    this.index = 0;
    // If the rotator is paused, the interval is already stopped
    if (this.intervalID) {
      this.stopInterval();
    }
  }

  public pause(): void {
    this.stopInterval();
  }

  public resume(): void {
    this.startInterval();
  }

  public next(): void {
    this.select((this.index + 1) % this.phraseElements.length);
  }

  public previous(): void {
    this.select(this.index === 0 ? this.phraseElements.length - 1 : this.index - 1);
  }

  public select(index: number): void {
    if (index < 0 || index >= this.phraseElements.length) {
      throw new Error(`Selected index (${index}) is out of range (${this.phraseElements.length - 1}).`);
    }
    this.listeners.rotation.forEach(rotationListener => rotationListener({
      previousIndex: this.index,
      previousPhraseElement: this.phraseElements[this.index],
      nextIndex: index,
      nextPhraseElement: this.phraseElements[index]
    }));

    this.setElementHidden(this.phraseElements[this.index]);
    this.setElementVisible(this.phraseElements[index]);
    this.updateWidth(this.phraseElements[index].offsetWidth);
    this.index = index;
  }

  public prepend(phrase: string): HTMLSpanElement {
    return this.insert(phrase, 0);
  }

  public append(phrase: string): HTMLSpanElement {
    return this.insert(phrase, this.phraseElements.length);
  }

  /**
   * ["Lorem", "Dolor"] -> insert("Ipsum", 1) -> ["Lorem", "Ipsum", "Dolor"]
   *
   * @param phrase
   * @param index
   */
  public insert(phrase: string, index: number): HTMLSpanElement {
    if (index < 0 || index > this.phraseElements.length) {
      throw new Error(`The index (${index}) to insert at is out of range (${this.phraseElements.length}).`);
    }

    const newElement = document.createElement('span');

    // The first element must not be absolute to reserve height space
    if (index > 0) {
      newElement.style.position = "absolute";
      newElement.style.top = "0";
      newElement.style.left = "0";
    } else if (this.phraseElements.length > 0) {
      this.phraseElements[0].style.position = "";
      this.phraseElements[0].style.top = "";
      this.phraseElements[0].style.left = "";
    }
    newElement.style.display = "inline-block"; // because the resize observer does not work properly on inline elements
    newElement.style.whiteSpace = "nowrap";
    newElement.style.transitionProperty = 'opacity';
    newElement.style.transitionDuration = `${this.options.fadeTransitionDuration}ms`;
    newElement.style.transitionTimingFunction = this.options.fadeTransitionTimingFunction;

    // If this is the first inserted element, we dont have to hide it
    if (this.phraseElements.length > 0) {
      this.setElementHidden(newElement);
    } else {
      this.setElementVisible(newElement);
      this.updateWidth(newElement.offsetWidth);
    }

    newElement.innerText = phrase;

    if (index >= this.phraseElements.length) {
      this.options.element.appendChild(newElement);
    } else {
      this.options.element.insertBefore(newElement, this.phraseElements[index]);
    }

    this.phraseElements.splice(index, 0, newElement);

    if (index <= this.index) {
      this.index++;
    }

    return newElement;
  }

  public remove(index: number): void {
    if (index < 0 || index >= this.phraseElements.length) {
      throw new Error(`The index (${index}) to remove is out of range (${this.phraseElements.length - 1}).`);
    }
    this.options.element.removeChild(this.phraseElements[index]);
    this.phraseElements.splice(index, 1);

    if (index < this.index) {
      this.index--;
    } else if (index === this.index) {
      this.select(this.index % this.phraseElements.length);
    }
  }

  public addEventListener<T extends keyof EventMap>(type: T, listener: (event: EventMap[T]) => void): void {
    (this.listeners[type] as ((event: EventMap[T]) => void)[]).push(listener);
  }

  public removeEventListener<T extends keyof EventMap>(type: T, listener: (event: EventMap[T]) => void): void {
    const index = (this.listeners[type] as ((event: EventMap[T]) => void)[]).indexOf(listener);
    if (index !== -1) {
      this.listeners[type].splice(index, 1);
    }
  }

  private setupResizeObserver() {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === this.phraseElements[this.index]) {
          this.updateWidth(entry.borderBoxSize[0].inlineSize);
        }
      })
    });

    this.phraseElements.forEach((phraseElement) => {
      resizeObserver.observe(phraseElement);
    });
  }

  private setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      if (this.started) {
        if (entries[0].isIntersecting) {
          if (this.intervalID === null) {
            this.resume();
          }
        } else {
          if (this.intervalID !== null) {
            this.pause();
          }
        }
      }
    });

    observer.observe(this.options.element);
  }

  private startInterval() {
    if (this.intervalID !== null) {
      throw new Error(`Cannot start multiple ${window.setInterval.name} function`);
    }

    this.listeners.start.forEach(startListener => startListener({
      currentIndex: this.index,
      currentPhraseElement: this.phraseElements[this.index]
    }));

    this.intervalID = window.setInterval(() => this.next(), this.options.interval)
  }

  private stopInterval() {
    if (this.intervalID === null) {
      throw new Error(`Cannot stop ${window.setInterval.name} that dont exists`);
    }

    this.listeners.stop.forEach(stopListener => stopListener({
      currentIndex: this.index,
      currentPhraseElement: this.phraseElements[this.index]
    }));

    window.clearInterval(this.intervalID);
    this.intervalID = null;
  }

  private setElementHidden(element: HTMLSpanElement) {
    element.style.opacity = '0';
    element.setAttribute("aria-hidden", "true");
    element.style.pointerEvents = "none";
    element.style.userSelect = "none";
  }

  private setElementVisible(element: HTMLSpanElement) {
    element.style.opacity = '1';
    element.removeAttribute("aria-hidden");
    element.style.pointerEvents = '';
    element.style.userSelect = '';
  }

  private updateWidth(width: number) {
    this.listeners.widthUpdate.forEach(widthUpdateListener => widthUpdateListener({
      currentIndex: this.index,
      currentPhraseElement: this.phraseElements[this.index],
      previousWidth: this.options.element.offsetWidth,
      nextWidth: width
    }));
    this.options.element.style.width = `${width}px`;
  }
}
