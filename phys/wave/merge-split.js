import Op from './op.js';

export default class MergeSplit extends Op {
  run(c, pD) {
    const f = 1;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const x1 = fromX + i / N * width;
        const x2 = fromX + j / N * width;
        const y1 = Math.cos(f * x1 + pD) + Math.sin(f * x2 + pD);
        const y2 = Math.cos(f * -x1 + pD) + Math.sin(f * -x2 + pD);
        const intensity = 128 * y1 + 128 * y2;
        c.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
        c.fillRect(xToC(x1), yToC(x2), pixelSize, pixelSize);
      }
    }
  }
}
