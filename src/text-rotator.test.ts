import {TextRotator} from './text-rotator'
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

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
