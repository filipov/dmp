import { DMP } from '@/scripts/DMP.ts';

import { DMPAudio } from '@/scripts/DMPAudio';

export class DMPScreen {
  private element: SVGElement;

  private button: SVGElement;
  private imagePlay: SVGElement;
  private imagePause: SVGElement;

  private audio: DMPAudio;

  constructor(audio: DMPAudio, element: SVGElement, dmp: DMP) {
    this.element = element;

    this.audio = audio;

    const button = element.getElementsByClassName(`${element.classList.item(0)}__button`).item(0);

    if (button instanceof SVGElement) {
      this.button = button;

      const imagePlay = button.getElementsByClassName('play').item(0);
      const imagePause = button.getElementsByClassName('pause').item(0);

      button.onclick = () => this.toggle();

      if (
        imagePlay instanceof SVGElement &&
        imagePause instanceof SVGElement
      ) {
        this.imagePlay = imagePlay;
        this.imagePause = imagePause;
      } else {
        throw 'Element not found!';
      }
    } else {
      throw 'Element not found!';
    }

    this.showRightButton();

    this.audio.element.addEventListener('click', () => {
      setTimeout(() => {
        this.audio.element.setAttribute('style', 'display: none');
        this.toggle();
      }, 100);
    })

    const render = (_?: number, num?: number, data?: Uint8Array) => {
      data = data || this.audio.getAnalyzer().bFrequencyData;
      num = num || 1;

      const waveCoordinates = dmp.calc_wave(data);

      const path = [];

      for (let i = 0; i < waveCoordinates.length / 2; i++) {
        path.push(waveCoordinates[i * 2] + ',' + waveCoordinates[i * 2 + 1]);
      }

      const wavePath = `M${path.join('L')}Z`

      const eq = document.getElementById(num === 1 ? 'equalizer' : `equalizer-${num}`);

      if (eq instanceof SVGElement) {
        eq.setAttribute('d' , wavePath);
      }

      const tx = document.getElementById('current')

      if (tx instanceof SVGElement) {
        tx.innerHTML = `${this.audio.currentSource + 1}/${this.audio.sources.length}`;
      }

      switch (num) {
        case 1: setTimeout(() => render(undefined, 2, data), 110);
        case 2: setTimeout(() => render(undefined, 3, data), 110);
      }

      // num === 1 ? requestAnimationFrame(render) : null;
    };

    setInterval(() => render(), 110);

    // requestAnimationFrame(render);
  }

  private showRightButton() {
    if (this.audio.element.paused) {
      this.showPlay();
    } else {
      this.showPause();
    }
  }

  private showPlay() {
    this.imagePlay.setAttribute('style', 'opacity: 1');
    this.imagePause.setAttribute('style', 'opacity: 0');
  }

  private showPause() {
    this.imagePlay.setAttribute('style', 'opacity: 0');
    this.imagePause.setAttribute('style', 'opacity: 1');
  }

  private toggle() {
    if (this.audio.element.paused) {
      this.audio.nextSource();

      this.audio.element.play().then(() => {
        this.showRightButton();
      });
    } else {
      this.audio.element.pause();
      this.showRightButton();
    }
  }
}
