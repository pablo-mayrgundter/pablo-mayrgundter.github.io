import {dom} from '/net/web/dom.js';

export class Form {
  constructor(form, updateCb) {
    this.form = form;
    this.button = dom('button');
    this.button.onclick = updateCb;
  }
  fromModel(m) {
    for (let i in m) {
      const parsed = parseFloat(m[i]);
      this.form[i].value = isNaN(parsed) ? m[i] : parsed;
    }
  }
  toModel(m) {
    for (let i in m) {
      const formVal = this.form[i].value;
      const parsed = parseFloat(formVal);
      m[i] = isNaN(parsed) ? formVal : parsed;
    }
  }
}
