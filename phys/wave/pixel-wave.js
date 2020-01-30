import Op from './op.js';

export default class PixelWave extends Op {
  run(c, phase) {
    for (let i = 0; i <= N; i++) {
      const d = i / N * width;
      const x = fromX + d;
      const y = Math.sin(d + phase);
      c.fillRect(xToC(x), yToC(y), pixelSize, pixelSize);
      c.fillRect(xToC(y), yToC(x), pixelSize, pixelSize);
    }
  }
}
