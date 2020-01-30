function r1(max) {
  max = max || Tau;
  return 2 * max * Math.random() - max;
}

const N = 128, Pi = Math.PI, Tau = 2 * Pi;

export default class Op {
  constructor() {
    this.c1 = r1(); this.c2 = r1(); this.c3 = r1(); this.c4 = r1();
    this.c5 = r1(); this.c6 = r1(); this.c7 = r1(); this.c8 = r1();
    this.f1 = r1(); this.f2 = r1(this.f1); this.f3 = r1(this.f2);
    this.f4 = r1(this.f3); this.f5 = r1(this.f4); this.f6 = r1(this.f5);
    this.i1 = r1(64); this.i2 = r1(64); this.i3 = r1(64); this.i4 = r1(64);
    this.i = 0;
  }

  anim(c) {
    const phaseDelta = this.i++ / (N / 8);
    const fill = c.fillStyle;
    c.fillStyle = fill;
    this.run(c, phaseDelta);
  }

  run(c, pD) {}
}
