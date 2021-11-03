import {TextRotator} from "../../src/main";


window.addEventListener('DOMContentLoaded', () => {
  const textRotatorFirstElement = document.getElementById('text-rotator-first');
  if (textRotatorFirstElement) {
    const textRotator = new TextRotator({
      element: textRotatorFirstElement,
      interval: 2000
    });
    textRotator.start();
  }

  const textRotatorSecondElement = document.getElementById('text-rotator-second');
  if (textRotatorSecondElement) {
    const textRotator = new TextRotator({
      element: textRotatorSecondElement,
      interval: 2000,
      widthTransitionDuration: 450,
      widthTransitionTimingFunction: 'cubic-bezier(0.43,-0.6, 0.29, 1.71)',
      fadeTransitionDuration: 250,
      fadeTransitionTimingFunction: 'ease-in-out'
    });
    textRotator.start();
  }

  const textRotatorThirdElement = document.getElementById('text-rotator-third');
  if (textRotatorThirdElement) {
    const textRotator = new TextRotator({
      element: textRotatorThirdElement,
      interval: 2000,
    });

    textRotator.addEventListener('start', () => {
      textRotatorThirdElement.closest('.demo')?.classList.remove('paused');
    });

    textRotator.addEventListener('stop', () => {
      textRotatorThirdElement.closest('.demo')?.classList.add('paused');
    });

    textRotator.start();
  }

  const textRotatorFourthElement = document.getElementById('text-rotator-fourth');
  if (textRotatorFourthElement) {
    const fonts = ["Roboto", "Open Sans", "Bitter"];
    const sizes = ["24px", "18px", "32px", "45px"];

    const textRotator = new TextRotator({
      element: textRotatorFourthElement,
      interval: 2000,
    });

    textRotator.start();

    window.setInterval(() => {
      if (textRotatorFourthElement.parentElement) {
        textRotatorFourthElement.parentElement.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
      }
    }, 2652);

    window.setInterval(() => {
      if (textRotatorFourthElement.parentElement) {
        textRotatorFourthElement.parentElement.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
      }
    }, 1525);
  }
});
