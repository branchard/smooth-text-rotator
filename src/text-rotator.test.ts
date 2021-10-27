import {TextRotator} from './text-rotator'

// function mockObservers() {
//   // Mock resize observer
//   const mockResizeObserverObserve = jest.fn();
//   global.ResizeObserver = jest.fn().mockReturnValue({
//     observe: mockResizeObserverObserve,
//     unobserve: () => null,
//     disconnect: () => null
//   });
//
//   // Mock intersection observer
//   const mockIntersectionObserverObserve = jest.fn();
//   const mockIntersectionObserverTrigger= jest.fn();
//   global.IntersectionObserver = jest.fn().mockImplementation((callback: ConstructorParameters<typeof IntersectionObserver>[0]) => {
//     mockIntersectionObserverTrigger.caller = () => {
//       callback([]);
//       console.log('loooool')
//     }
//     // mockIntersectionObserverCallback = callback;
//     // console.log(args)
//     return {
//       observe: mockIntersectionObserverObserve,
//       unobserve: () => null,
//       disconnect: () => null
//     }
//   });
//
//   return {
//     mockResizeObserverObserve,
//     mockIntersectionObserverObserve,
//     mockIntersectionObserverTrigger
//   }
// }

function getTextRotatorElement() {
  const textRotatorElement = document.getElementById('text-rotator');

  if (textRotatorElement === null) {
    throw "textRotatorElement is null";
  }

  return textRotatorElement;
}

beforeEach(() => {
  class ResizeObserverMock implements ResizeObserver {
    static instances: ResizeObserverMock[] = [];
    private readonly targets: Element[] = [];

    constructor(private readonly callback: ResizeObserverCallback) {
      ResizeObserverMock.instances.push(this);
    }

    disconnect() {
      //
    }

    observe(target: Element) {
      this.targets.push(target)
    }

    unobserve() {
      //
    }

    static callAllInstances() {
      ResizeObserverMock.instances.forEach((instance) => {
        instance.callback(instance.targets.map((target) => ({
          borderBoxSize: [],
          contentBoxSize: [],
          contentRect: {
            bottom: 5,
            height: 5,
            left: 5,
            right: 5,
            top: 5,
            width: 5,
            x: 5,
            y: 5,
            toJSON() {
              return '';
            }
          },
          target: target,
        })), instance);
      });
    }
  }

  global.ResizeObserver = ResizeObserverMock;

  global.IntersectionObserver = class {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];

    disconnect() {
      //
    }

    observe() {
      //
    }

    takeRecords() {
      return [];
    }

    unobserve() {
      //
    }
  }

  document.body.innerHTML =
    '<h1>' +
    '  Super' +
    '  <span id="text-rotator" data-phrases=\'["Smooth","Simple","Light Weight","Easy"]\'>Smooth</span>' +
    '  Text Rotator' +
    '</h1>';
});

test('is instantiable', () => {
  const textRotator = new TextRotator({element: getTextRotatorElement()});
  expect(textRotator).toBeInstanceOf(TextRotator);
});

test('it pause when is not intersecting', () => {

});


// test('resize observer is setup', () => {
//   // const constructorSpy = jest.spyOn(global, 'ResizeObserver')
//   // const observeSpy = jest.spyOn(global.ResizeObserver.prototype, 'observe')
//   const textRotator = new TextRotator({element: getTextRotatorElement()});
//   textRotator.start();
//   expect(global.ResizeObserver).toHaveBeenCalledTimes(1);
//   // expect(observeSpy).toHaveBeenCalled();
// });


// test('setup resize observer', () => {
//   const {mockResizeObserverObserve} = mockObservers();
//   new TextRotator({element: getTextRotatorElement()});
//   expect(mockResizeObserverObserve).toBeCalled();
// })
//
// test('setup intersection observer', () => {
//   const {mockIntersectionObserverObserve} = mockObservers();
//   new TextRotator({element: getTextRotatorElement()});
//   expect(mockIntersectionObserverObserve).toBeCalled();
// })
