import Op from './op.js';

export default class SinX extends Op {
  run(c, phase, offset) {
    offset = offset || 0;
    begin(c);
    for (let i = 0; i <= N; i++) {
      const d = i / N * width;
      const x = fromX + d;
      const y = Math.sin(offset + x + phase);
      c.lineTo(xToC(x), yToC(y));
    }
    end(c);
  }
}
