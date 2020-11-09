import audioFile0 from '@/audio/Burnout.mp3';
import audioFile1 from '@/audio/Come-and-Get-It.mp3';
import audioFile2 from '@/audio/Epic_Trailer.mp3';
import audioFile3 from '@/audio/Future-Bass.mp3';
import audioFile4 from '@/audio/Future-EDM.mp3';
import audioFile5 from '@/audio/Never-Miss-a-Moment.mp3';
import audioFile6 from '@/audio/Smart-Tech.mp3';
import audioFile7 from '@/audio/Soft-Inspiration.mp3';
import audioFile8 from '@/audio/Space-Orbit.mp3';
import audioFile9 from '@/audio/Upbeat__Party.mp3';

const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

export class DMPAudio {
  readonly element: HTMLAudioElement;
  context?: AudioContext;
  analyzer?: AnalyserNode;

  sources = [
    audioFile0,
    audioFile1,
    audioFile2,
    audioFile3,
    audioFile4,
    audioFile5,
    audioFile6,
    audioFile7,
    audioFile8,
    audioFile9,
  ];

  currentSource = 4;

  startConnect = true;

  constructor () {
    this.element = document.createElement('audio');

    this.element.volume = 1.0;
    this.element.preload = 'none';

    this.nextSource();

    this.element.onended = () => {
      this.nextSource();

      this.play();
    }

    this.element.controls = true;

    document.body.append(this.element);

    this.element.addEventListener('click',() => {
      this.context = new AudioContext();
      // const node = this.context.createScriptProcessor(2048, 1, 1);
      this.analyzer = this.context.createAnalyser();

      let source = this.context
        .createMediaElementSource(this.element);

      source.connect(this.analyzer);
      // source.connect(this.context.destination);
      this.analyzer.connect(this.context.destination);
    });
  }

  public pause() {
    this.element.pause();
  }

  public play() {
    this.element.play();
  }

  public getAnalyzer() {
    if (!this.element.paused) {
    //   if (this.startConnect) {
    //     this.startConnect = false;
    //
    //     setTimeout(() => {
    //       this.context = new AudioContext();
    //       // const node = this.context.createScriptProcessor(2048, 1, 1);
    //       this.analyzer = this.context.createAnalyser();
    //
    //       let source = this.context
    //         .createMediaElementSource(this.element);
    //
    //       source.connect(this.analyzer);
    //       // source.connect(this.context.destination);
    //       this.analyzer.connect(this.context.destination);
    //       // node.connect(this.analyzer);
    //       // node.connect(this.context.destination);
    //     }, 100)
    //   }

      if (this.analyzer) {
        this.analyzer.smoothingTimeConstant = 0.3;
        this.analyzer.fftSize = 1024;

        // Создаем массивы для хранения данных
        let fFrequencyData = new Float32Array(this.analyzer.frequencyBinCount);
        let bFrequencyData = new Uint8Array(this.analyzer.frequencyBinCount);
        let bTimeData = new Uint8Array(this.analyzer.frequencyBinCount);

        // Получаем данные
        this.analyzer.getFloatFrequencyData(fFrequencyData);
        this.analyzer.getByteFrequencyData(bFrequencyData);
        this.analyzer.getByteTimeDomainData(bTimeData);

        return {
          fFrequencyData,
          bFrequencyData,
          bTimeData
        }
      }
    }

    return {
      fFrequencyData: new Float32Array(256),
      bFrequencyData: new Uint8Array(256),
      bTimeData: new Uint8Array(256),
    }
  }

  public nextSource() {
    if (this.currentSource + 1 >= this.sources.length) {
      this.currentSource = 0;
    } else {
      this.currentSource += 1;
    }

    this.element.innerHTML = `<source src="${this.sources[this.currentSource]}" />`;
    this.element.load();
  }
}
