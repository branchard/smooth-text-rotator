import {isArrayOfString} from "./type-guards";

type Options = {
  // TODO
  // transitionAnimation?: string;
  // widthAnimation?: string;
  automaticPause?: boolean
  interval?: number,
  element: HTMLSpanElement
}

export class TextRotator {
  private readonly options: Required<Options>;
  // private readonly phrases: string[];
  private readonly phraseElements: HTMLSpanElement[];
  private index: number;
  private intervalID: number | null = null;
  private started = false;

  constructor(options: Options) {
    this.options = {
      automaticPause: true,
      interval: 4000,
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

    // TODO comment
    this.phraseElements = [];
    this.options.element.innerText = "";
    phrases.forEach((phrase, index) => {
      const child = document.createElement('span');
      // child.style.opacity = index > 0 ? "0" : "1";
      if (index > 0) {
        child.style.opacity = "0";
        child.style.position = "absolute";
        child.style.top = "0";
        child.style.left = "0";
      }
      child.style.display = "inline-block"; // because the resize observer does not work properly on inline elements
      child.style.whiteSpace = "nowrap";
      child.style.transition = 'opacity .5s cubic-bezier(.23,1,.32,1)';

      child.innerText = phrase;
      this.options.element.appendChild(child);
      this.phraseElements.push(child);
    });
    this.options.element.style.display = 'inline-block';
    this.options.element.style.position = 'relative';
    this.options.element.style.transition = 'width .5s cubic-bezier(.23,1,.32,1)';
    this.displayPhrase(0);
    this.setupResizeObserver();
    if(this.options.automaticPause){
      this.setupIntersectionObserver();
    }

    // this.phrases = phrases;
    this.index = 0;
  }

  public start(): void {
    this.started = true;
    this.index = 0;
    this.startInterval();
  }

  public stop(): void {
    this.started = false;
    this.index = 0;
    this.stopInterval();
  }

  public pause(): void {
    this.stopInterval();
  }

  public resume(): void {
    this.startInterval();
  }

  private setupResizeObserver() {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === this.phraseElements[this.index]) {
          this.options.element.style.width = `${entry.borderBoxSize[0].inlineSize}px`;
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

    this.intervalID = window.setInterval(this.doAnimation.bind(this), this.options.interval)
  }

  private stopInterval() {
    if (this.intervalID === null) {
      throw new Error(`Cannot stop ${window.setInterval.name} that dont exists`);
    }

    window.clearInterval(this.intervalID);
    this.intervalID = null;
  }

  private doAnimation() {
    this.displayPhrase(this.index = (this.index + 1) % this.phraseElements.length);
  }

  private displayPhrase(index: number) {
    this.phraseElements[index === 0 ? this.phraseElements.length - 1 : index - 1].style.opacity = '0';
    this.options.element.style.width = `${this.phraseElements[index].offsetWidth}px`;
    this.phraseElements[index].style.opacity = '1';
  }
}
