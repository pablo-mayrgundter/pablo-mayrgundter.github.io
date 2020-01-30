import Op from './op.js';

export const N = 128;
export const Pi = Math.PI;
export const Tau = 2 * Pi;
export const fromX = -2 * Tau;
export const width = 4 * Tau;
export const pixelSize = 0.02;

export function axes(c) {
  // X-axis
  line(c,  fromX,   0,   width,   0);
  // Y-axis
  line(c,   0,  fromX,   0,   width);
}

export function clear(c) {
  c.fillStyle = 'white';
  c.fillRect(0, 0, xToC(Tau * 2), yToC(Tau * 2));
}

export function line(c, x1, y1, x2, y2) {
  begin(c);
  c.moveTo(xToC(x1), yToC(y1));
  c.lineTo(xToC(x2), yToC(y2));
  end(c);
}

export function xToC(x) {
  return x / (Tau * 2) + 1;
}

export function yToC(y) {
  return y / (Tau * 2) + 1;
}

export function begin(c) {
  c.beginPath();
  c.lineWidth = '0.01';
  c.strokeStyle = 'black';
}

export function end(c) {
  c.stroke();
}
