extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use web_sys::{ console };
use wasm_bindgen::__rt::core::f64::consts::PI;

#[wasm_bindgen]
pub fn calc_wave(size: &[u8]) -> Vec<f64> {
    let mut s = size.iter();
    let mut size = size.to_vec();

    let s = s.rev();
    size.extend(s);

    let part_in_degrees: f64 = 360.0 as f64 / size.len() as f64;
    let part_in_radians: f64 = part_in_degrees * (PI / 180.0);

    let mut i = 0;
    let mut wave = vec![];

    while i < size.len() {
        let angle = part_in_radians * (i + size.len() / 4) as f64;

        let cos = angle.cos();
        let sin = angle.sin();

        let size_i = (if i % 2 == 0 {
            size[i] as f64 * 1.5
        } else {
            size[i] as f64 * -2.0
        });

        let value = 49 as f64 + size_i;

        let x = 500 as f64 - value * cos;
        let y = 500 as f64 - value * sin;

        wave.push(x);
        wave.push(y);

        i += 1;
    }

    return wave
}
