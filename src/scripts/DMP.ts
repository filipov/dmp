import { calc_wave, calc_wave_2, calc_wave_3 } from '@/../pkg/index';

export interface DMP {
  calc_wave: typeof calc_wave;
  calc_wave_2: typeof calc_wave_2;
  calc_wave_3: typeof calc_wave_3;
}
