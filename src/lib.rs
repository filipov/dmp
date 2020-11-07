extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use web_sys::{ console };
use wasm_bindgen::__rt::core::f64::consts::PI;

#[wasm_bindgen]
pub fn calc_wave(size: &[u8]) -> Vec<f64> {
    let part_in_degrees: f64 = 360.0 as f64 / size.len() as f64;
    let part_in_radians: f64 = part_in_degrees * (PI / 180.0);

    let mut i = 0;
    let mut wave = vec![];

    while i < size.len() {
        let angle = part_in_radians * i as f64;

        let cos = angle.cos();
        let sin = angle.sin();
        let value = 40 as f64 + size[i] as f64 / 5.0;

        let x = 250 as f64 + value * cos;
        let y = 250 as f64 + value * sin;

        wave.push(x);
        wave.push(y);

        i += 1;
    }

    return wave
}

#[wasm_bindgen]
pub fn calc_wave_2(size: &[u8]) -> Vec<f64> {
    let part_in_degrees: f64 = 360.0 as f64 / size.len() as f64;
    let part_in_radians: f64 = part_in_degrees * (PI / 180.0);

    let mut i = 0;
    let mut wave = vec![];

    while i < size.len() {
        let angle = part_in_radians * (i + size.len() / 5) as f64;

        let cos = angle.cos();
        let sin = angle.sin();
        let value = 70 as f64 - size[i] as f64 / 5.0;

        let x = 250 as f64 - value * cos;
        let y = 250 as f64 - value * sin;

        wave.push(x);
        wave.push(y);

        i += 1;
    }

    return wave
}

#[wasm_bindgen]
pub fn calc_wave_3(size: &[u8]) -> Vec<f64> {
    let part_in_degrees: f64 = 360.0 as f64 / (size.len() / 1) as f64;
    let part_in_radians: f64 = part_in_degrees * (PI / 180.0);

    let mut i = 0;
    let mut wave = vec![];

    while i < size.len() / 1 {
        // let angle = part_in_radians * (i + size.len() / 43) as f64;
        let angle = part_in_radians * i as f64;

        let cos = angle.cos();
        let sin = angle.sin();
        let value = 70 as f64 + size[i] as f64 / 5.0;

        let x = 250 as f64 - value * cos;
        let y = 250 as f64 - value * sin;

        wave.push(x);
        wave.push(y);

        i += 1;
    }

    return wave
}
