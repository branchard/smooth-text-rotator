import {TextRotator} from './text-rotator'

// Mock resize observer
const mockResizeObserver = jest.fn();
mockResizeObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
global.ResizeObserver = mockResizeObserver;

// Mock intersection observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
global.IntersectionObserver = mockIntersectionObserver;

const domBody =
  '<h1>' +
  '  Super' +
  '  <span id="text-rotator" data-phrases=\'["Smooth","Simple","Light Weight","Easy"]\'>Smooth</span>' +
  '  Text Rotator' +
  '</h1>';

test('should be instantiable', () => {
  document.body.innerHTML = domBody;
  const textRotatorElement = document.getElementById('text-rotator');

  if(textRotatorElement === null){
    throw "textRotatorElement is null";
  }

  const textRotator = new TextRotator({element: textRotatorElement});
  expect(textRotator).toBeInstanceOf(TextRotator);
});
