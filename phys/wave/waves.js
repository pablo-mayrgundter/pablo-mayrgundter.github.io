import Op from './op.js';
import {N,fromX,width,xToC,yToC,pixelSize} from './utils.js'

export default class RandomWaves extends Op {
  run(c, pD) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const x = fromX + i / N * width;
        const y = fromX + j / N * width;

        const x1 = x + this.c1 * Math.cos(this.f2 * x + pD);
        const y1 = y + this.c2 * Math.sin(this.f2 * y + pD);

        const x2 = x1 + this.c3 * Math.cos(this.f3 * x1);
        const y2 = y1 + this.c4 * Math.sin(this.f3 * y1);

        const x3 = x2 + this.c5 * Math.cos(this.f4 * x2);
        const y3 = y2 + this.c6 * Math.sin(this.f4 * y2);

        const x4 = x3 + this.c7 * Math.cos(this.f5 * x3);
        const y4 = y3 + this.c8 * Math.sin(this.f5 * y3);

        const a1 = x1 + y1;
        const a2 = x2 + y2;
        const a3 = x3 + y3;
        const a4 = x4 + y4;

        const r = this.i3 * a4 + this.i2 * a3 + this.i1 * a2;
        const g = this.i2 * a4 + this.i1 * a3 + this.i3 * a2;
        const b = this.i1 * a4 + this.i3 * a3 + this.i2 * a2;
        c.fillStyle = `rgb(${r}, ${g}, ${b})`;
        c.fillRect(xToC(x), yToC(y), pixelSize, pixelSize);
      }
    }
  }
}
