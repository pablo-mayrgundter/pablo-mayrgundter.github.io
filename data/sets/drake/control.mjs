export class Control {
  constructor(model) {
    this.model = model;
  }
  calculateDrakeNumber() {
    this.model.N = Math.round(
      this.model.Rs * this.model.Fp * this.model.Ne *
      this.model.Fl * this.model.Fi * this.model.Fc *
      this.model.L);
  }
}
