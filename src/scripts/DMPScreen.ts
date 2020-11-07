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

    setInterval(() => {
      const data = this.audio.getAnalyzer().bFrequencyData;

      const waveCoordinates = dmp.calc_wave(data);

      const path = []

      for (let i in data) {
        // @ts-ignore
        path.push(waveCoordinates[i * 2] + ',' + waveCoordinates[i * 2 + 1]);
      }

      const wavePath = `M${path.join('L')}Z`

      const eq = document.getElementById('equalizer');

      if (eq instanceof SVGElement) {
        eq.setAttribute('d' , wavePath);
      }
    }, 10);

    setInterval(() => {
      const data = this.audio.getAnalyzer().bFrequencyData;

      const waveCoordinates = dmp.calc_wave_2(data);

      const path = []

      for (let i in data) {
        // @ts-ignore
        path.push(waveCoordinates[i * 2] + ',' + waveCoordinates[i * 2 + 1]);
      }

      const wavePath = `M${path.join('L')}Z`

      const eq = document.getElementById('equalizer2');

      if (eq instanceof SVGElement) {
        eq.setAttribute('d' , wavePath);
      }
    }, 10);

    setInterval(() => {
      const data = this.audio.getAnalyzer().bFrequencyData;

      const waveCoordinates = dmp.calc_wave_3(data);

      const path = []

      for (let i in data) {
        // @ts-ignore
        path.push(waveCoordinates[i * 2] + ',' + waveCoordinates[i * 2 + 1]);
      }

      const wavePath = `M${path.join('L')}Z`

      const eq = document.getElementById('equalizer3');

      if (eq instanceof SVGElement) {
        eq.setAttribute('d' , wavePath);
      }
    }, 10);
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
      this.audio.element.play().then(() => {
        this.showRightButton();
      });
    } else {
      this.audio.element.pause();
      this.showRightButton();
    }
  }
}
