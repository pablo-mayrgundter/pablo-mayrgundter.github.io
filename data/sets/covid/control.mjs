export class Control {
  constructor(model) {
    this.model = model;
  }
  calculate() {
    this.model.NewBedsNeeded = Math.round(
      this.model.CurrentCases *
      Math.pow(this.model.DailyGrowthRate,
               this.model.DaysOfGrowth) *
      this.model.SevereAndCriticalRate);
  }
}
