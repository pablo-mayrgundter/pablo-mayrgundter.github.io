import {getHashParams, setHashParams} from '/net/web/hashparams.js';
import {dom} from '/net/web/dom.js';
import {fetch} from '/net/web/xhr.js';
import {Dataset} from '../../data/dataset.js';
import {N,Pi,Tau,axes,clear,line,xToC,yToC,begin,end} from './utils.js';
import Op from './op.js';
import Waves from './waves.js';
import Waves2 from './waves2.js';

let c;
let i = 0;
let op;

function loadData() {
  const dataset = new Dataset();
  fetch('/phys/wave/index.csv', (rsp) => {
      dataset.fromCsv(rsp);
      dataset.show(dom('dataset'), (row) => {
          F.fromModel(row);
          update();
        });
    });
  return dataset; // TODO(pablo): promise?
}

export function init() {
  const canvas = document.getElementById('canvas');
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.75;
  canvas.width = size;
  canvas.height = size;
  c = canvas.getContext('2d');
  let xS = canvas.width / 2, yS = canvas.height / 2;
  c.scale(xS, yS);
  const params = getHashParams();
  if (params) {
    op = new Waves();
    for (i in params) {
      op[i] = params[i];
    }
    anim();
  } else {
    c.font = '0.25px Arial';
    c.fillStyle = 'blue';
    c.textAlign = 'center';
    c.fillText('Click me', 1, 1);
  }
  document.getElementById('canvas').onclick = opInit;
}

function opInit() {
  const first = op == null;
  //axes(c);
  //op = new SinX().anim();
  //op = new PixelWaves().anim();
  //op = new MergeSplit().anim();
  op = new Waves();
  setHashParams(op);
  //op = new Waves2().anim();
  c.fillStyle = 'black';
  if (first) {
    anim();
  }
}

function anim() {
  clear(c);
  op.anim(c);
  window.requestAnimationFrame(anim);
}

init();