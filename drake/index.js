import {getHashParams,setHashParams} from '/net/web/hashparams.js';
import {dom} from '/net/web/dom.js';
import {fetch} from '/net/web/xhr.js';
import {Dataset} from './dataset.js';

function num(input) {
  return parseFloat(input.value);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class Model {
  constructor() {
    this.N;
    this.Rs;
    this.Fp;
    this.Ne;
    this.Fl;
    this.Fi;
    this.Fc;
    this.L;
  }
  calculateDrakeNumber() {
    this.N = Math.round(
      this.Rs * this.Fp * this.Ne *
      this.Fl * this.Fi * this.Fc *
      this.L);
  }
}

class Form {
  constructor(model) {
    this.model = model;
    const f = document.forms.default;
    this.N = f.N;
    this.Rs = f.Rs;
    this.Fp = f.Fp;
    this.Ne = f.Ne;
    this.Fl = f.Fl;
    this.Fi = f.Fi;
    this.Fc = f.Fc;
    this.L = f.L;
    this.button = dom('button');
    this.button.onclick = update;
  }
  toModel() {
    this.model.Rs = num(this.Rs);
    this.model.Fp = num(this.Fp);
    this.model.Ne = num(this.Ne);
    this.model.Fl = num(this.Fl);
    this.model.Fi = num(this.Fi);
    this.model.Fc = num(this.Fc);
    this.model.L = num(this.L);
  }
  fromModel(m) {
    this.N.value = numberWithCommas(m.N);
    this.Rs.value = m.Rs;
    this.Fp.value = m.Fp;
    this.Ne.value = m.Ne;
    this.Fl.value = m.Fl;
    this.Fi.value = m.Fi;
    this.Fc.value = m.Fc;
    this.L.value = m.L;
  }
}

const M = new Model();
let D;
let F;

function update() {
  F.toModel();
  M.calculateDrakeNumber();
  F.fromModel(M);
  setHashParams(M);
}

function loadData() {
  const d = new Dataset();
  fetch('/drake/dataset.csv', (rsp) => {
      d.fromCsv(rsp);
      d.show(dom('dataset'), (row) => {
          console.log('use this row: ', row);
          F.fromModel(row);
          update();
        });
    });
  return d; // TODO(pablo): promise?
}

function init() {
  if (location.hash) {
    getHashParams(M);
  }
  F = new Form(M);
  F.fromModel(M);
  update();
  setHashParams(M)
  D = loadData();
}

init();
