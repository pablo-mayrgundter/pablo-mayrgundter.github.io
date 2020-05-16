import {dom} from '../net/web/dom.js';

export class Form {
  constructor(form, updateCb) {
    this.form = form;
    this.button = dom('button');
    this.button.onclick = updateCb;
  }
  fromModel(m) {
    const model = m.json;
    for (let i in model) {
      const parsed = parseFloat(model[i]);
      console.log(i);
      this.form[i].value = isNaN(parsed) ? model[i] : parsed;
    }
  }
  toModel(m) {
    const model = m.json;
    for (let i in model) {
      console.log(i);
      const formVal = this.form[i].value;
      const parsed = parseFloat(formVal);
      model[i] = isNaN(parsed) ? formVal : parsed;
    }
  }
}
