import {dom} from '/net/web/dom.js';

export class Dataset {
  constructor() {
    this.fieldNames;
    this.rows = [];
  }

  fromCsv(csv) {
    const lines = csv.split('\n');
    let first = true;
    for (const i in lines) {
      const line = lines[i];
      if (first) {
        first = false;
        if (line.startsWith('#')) {
          this.fieldNames =
            line.substr(1).split(',').map((s) => {return s.trim()});
          continue;
        }
      }
      if (line.trim() == '') {
        continue;
      }
      this.rows[i] = line.split(',');
    }
  }

  /** Detableize the ith row into an object where each cell of the row
   * is the value of the corresponding column name field in the
   * object. */
  getRowObject(i) {
    const row = this.rows[i];
    const obj = {};
    for (const i in this.fieldNames) {
      const fieldName = this.fieldNames[i];
      const fieldValue = row[i];
      obj[fieldName] = fieldValue;
    }
    return obj;
  }

  /** @param tc The table container. */
  show(tc, useCb) {
    const t = dom.elt('table');
    tc.appendChild(t);
    const tr = dom.elt('tr');
    t.appendChild(tr);
    tr.appendChild(dom.elt('td', ''));
    for (let i in this.fieldNames) {
      const fieldName = this.fieldNames[i];
      tr.appendChild(dom.elt('th', fieldName));
    }
    for (let i in this.rows) {
      const row = this.rows[i];
      const tr = dom.elt('tr');
      t.appendChild(tr);
      const td = dom.elt('td');
      tr.appendChild(td);
      const useButton = dom.elt('button', 'Use');
      td.appendChild(useButton);
      useButton.onclick = () => {
        useCb(this.getRowObject(i));
      };
      for (let j in row) {
        tr.appendChild(dom.elt('td', row[j]));
      }
    }
  }
}
