interface StartEvent {
  currentIndex: number;
  currentPhraseElement: HTMLSpanElement;
}

interface StopEvent {
  currentIndex: number;
  currentPhraseElement: HTMLSpanElement;
}

interface RotationEvent {
  previousIndex: number;
  previousPhraseElement: HTMLSpanElement;
  nextIndex: number;
  nextPhraseElement: HTMLSpanElement;
}

interface WidthUpdateEvent {
  currentIndex: number;
  currentPhraseElement: HTMLSpanElement;
  previousWidth: number;
  nextWidth: number;
}

export interface EventMap {
  "start": StartEvent;
  "stop": StopEvent;
  "rotation": RotationEvent;
  "widthUpdate": WidthUpdateEvent;
}
