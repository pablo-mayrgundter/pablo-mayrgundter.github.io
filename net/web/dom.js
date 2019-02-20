export function dom(id) {
  return document.getElementById(id);
}

dom.elt = function(eltName, opt) {
  const e = document.createElement(eltName);
  if (typeof opt == 'string') {
    e.appendChild(dom.txt(opt));
  }
  return e;
};

dom.txt = function(s) {
  return document.createTextNode(s);
}
