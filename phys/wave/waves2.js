import Op from './op.js';
import {N,fromX,width,xToC,yToC,pixelSize} from './utils.js'

export default class Waves2 extends Op {
  run(c, pD) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const x = fromX + i / N * width;
        const y = fromX + j / N * width;

        const x1 = this.c1 * Math.cos(x + pD + this.f2);
        const y1 = this.c2 * Math.sin(y + pD + this.f1);

        const x2 = x1 + this.c3 * Math.cos(pD + this.f3);
        const y2 = y1 + this.c4 * Math.sin(pD + this.f4);

        const x3 = x2 + this.c5 * Math.cos(pD + this.f5);
        const y3 = y2 + this.c6 * Math.sin(pD + this.f6);

        const a1 = x1 + y1;
        const a2 = x2 + y2;
        const a3 = x3 + y3;

        const r = this.i2 * a2 + this.i1 * a1;
        const g = this.i2 * a3 + this.i1 * a2;
        const b = this.i2 * a1 + this.i1 * a3;
        c.fillStyle = `rgb(${r}, ${g}, ${b})`;
        c.fillRect(xToC(x), yToC(y), pixelSize, pixelSize);
      }
    }
  }
}
