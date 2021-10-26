import {TextRotator} from "../src/main";

const fonts = ["Forte", "Comic Sans MS", "Arial", "Calibri", "Segoe UI"];
const sizes = ["16px", "24px", "12px", "18px", "32px"];

window.addEventListener('DOMContentLoaded', () => {
  const textRotator1Element = document.getElementById('text-rotator-1');
  if (textRotator1Element) {
    const textRotator = new TextRotator({element: textRotator1Element, interval: 2000});
    textRotator.start();
  }


  const textRotator2Element = document.getElementById('text-rotator-2');
  if (textRotator2Element) {
    const textRotator = new TextRotator({element: textRotator2Element, interval: 4000});
    textRotator.start();
    window.setInterval(() => {
      if (textRotator2Element.parentElement) {
        textRotator2Element.parentElement.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
      }
    }, 2650);
  }

  const textRotator3Element = document.getElementById('text-rotator-3');
  if (textRotator3Element) {
    const textRotator = new TextRotator({element: textRotator3Element, interval: 4200});
    textRotator.start();
    window.setInterval(() => {
      if (textRotator3Element.parentElement) {
        textRotator3Element.parentElement.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
      }
    }, 2830);
  }

  const textRotator4Element = document.getElementById('text-rotator-4');
  if (textRotator4Element) {
    const textRotator = new TextRotator({element: textRotator4Element, interval: 4500});
    textRotator.start();
    window.setInterval(() => {
      if (textRotator4Element.parentElement) {
        textRotator4Element.parentElement.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
      }
    }, 2720);
    window.setInterval(() => {
      if (textRotator4Element.parentElement) {
        textRotator4Element.parentElement.style.fontSize = fonts[Math.floor(Math.random() * fonts.length)];
      }
    }, 2920);
  }
});
