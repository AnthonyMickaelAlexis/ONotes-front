import getRandomInt from "../getRandomInt";

export class ModifyHalo {
  #interval;
  #currentLeft = 0;
  #currentTop = 0;
  #initialScale = 1;
  #currentScale = 1;
  #initialBlur = 30;
  #currentBlur = 30;

  constructor(halo) {
    this.halo = halo;
  }

  start() {
    this.#interval = setInterval(() => {
      const leftModifier = getRandomInt(-10, 10);
      let newLeft = this.#currentLeft + leftModifier;
      if (newLeft < -25) newLeft = -25;
      if (newLeft > 25) newLeft = 25;

      const topModifer = getRandomInt(-10, 10);
      let newTop = this.#currentTop + topModifer;
      if (newTop < -25) newTop = -25;
      if (newTop > 25) newTop = 25;

      const blurModifier = getRandomInt(-1, 1) / 2;
      let newBlur = this.#currentBlur + blurModifier;
      if (newBlur < this.#initialBlur - 5) newBlur = this.#initialBlur - 5;
      if (newBlur > this.#initialBlur + 5) newBlur = this.#initialBlur + 5;

      const scaleModifier = getRandomInt(-1, 1) / 10;
      let newScale = this.#currentScale + scaleModifier;
      if (newScale < this.#initialScale - 0.5) newScale = this.#initialScale - 0.5;
      if (newScale > this.#initialScale + 0.5) newScale = this.#initialScale + 0.5;

      this.halo.animate(
        [
          {
            transform: `translate(${this.#currentLeft}px, ${this.#currentTop}px) scale(${this.#currentScale})`,
            filter: `blur(${this.#currentBlur}px)`
          },
          {
            transform: `translate(${newLeft}px, ${newTop}px) scale(${newScale})`,
            filter: `blur(${newBlur}px)`
          }
        ],
        {
          duration: 1000,
          iterations: 1,
          fill: 'forwards',
          easing: 'linear'
        }
      );

      this.#currentLeft = newLeft;
      this.#currentTop = newTop;
      this.#currentScale = newScale;
      this.#currentBlur = newBlur;
    }, 3000);
  }

  stop() {
    clearInterval(this.#interval);
  }
}
