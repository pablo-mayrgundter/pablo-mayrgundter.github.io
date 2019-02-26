import {getHashParams,setHashParams} from '/net/web/hashparams.js';
import {dom} from '/net/web/dom.js';
import {fetch} from '/net/web/xhr.js';
import {Dataset} from './dataset.js';

function num(input) {
  return parseFloat(input.value);
}

function numberWithCommas(x) {
  if (x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '';
}

class Form {
  constructor(form) {
    this.form = form;
    this.button = dom('button');
    this.button.onclick = update;
  }
  fromModel(m) {
    for (let i in m)
      this.form[i].value = parseFloat(m[i]);
  }
  toModel(m) {
    for (let i in m)
      m[i] = parseFloat(this.form[i].value);
  }
}

let M;
let C;
let D;
let F;

function update() {
  F.toModel(M);
  C.calculateDrakeNumber();
  F.fromModel(M);
  setHashParams(M);
}

function loadData() {
  const dataset = new Dataset();
  fetch('/data/sets/drake/index.csv', (rsp) => {
      dataset.fromCsv(rsp);
      dataset.show(dom('dataset'), (row) => {
          F.fromModel(row);
          update();
        });
    });
  return dataset; // TODO(pablo): promise?
}

function onLoad(model, control) {
  if (location.hash) {
    // TODO: clean and reify params.
    getHashParams(model);
  }
  C = control;
  F = new Form(document.forms.default);
  F.fromModel(model);
  D = loadData();
  console.log(F);
}

function init() {
  fetch('/data/sets/drake/model.json', (rsp) => {
      M = JSON.parse(rsp);
      (async () => {
        const module = await import('/data/sets/drake/control.mjs');
        console.log(module.Control);
        const c = new module.Control(M);
        onLoad(M, c);
      })();
    });
}

init();
