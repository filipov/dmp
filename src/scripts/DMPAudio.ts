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

  currentSource = -1;

  constructor () {
    this.element = document.createElement('audio');

    this.element.volume = 0.6;
    this.element.preload = "none";

    this.nextSource();

    this.element.onended = () => {
      this.nextSource();

      this.play();
    }

    document.body.append(this.element);
  }

  public pause() {
    this.element.pause();
  }

  public play() {
    this.element.play();
  }

  public getAnalyzer() {
    if (!this.element.paused) {
      if (!this.analyzer && !this.context) {
        this.context = new AudioContext();
        this.analyzer = this.context.createAnalyser();

        let source = this.context
          .createMediaElementSource(this.element);

        source.connect(this.context.destination);
        source.connect(this.analyzer);
      }

      if (this.analyzer) {
        // Размерность преобразования Фурье
        // Если не понимаете, что это такое - ставьте 512, 1024 или 2048 ;)
        this.analyzer.fftSize = 8192;

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
