import {getHashParams,setHashParams} from '/net/web/hashparams.js';
import {dom} from '/net/web/dom.js';
import {fetch} from '/net/web/xhr.js';
import {Dataset} from './dataset.js';
import {Form} from './form.js';

function num(input) {
  return parseFloat(input.value);
}

function numberWithCommas(x) {
  if (x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '';
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
  F = new Form(document.forms.default, () => {
      update();
    });
  F.fromModel(model);
  D = loadData();
}

export function init(datasetName) {
  fetch(`/data/sets/${datasetName}/model.json`, (rsp) => {
      M = JSON.parse(rsp);
      (async () => {
        const module = await import(`/data/sets/${datasetName}/control.mjs`);
        const c = new module.Control(M);
        onLoad(M, c);
      })();
    });
}
