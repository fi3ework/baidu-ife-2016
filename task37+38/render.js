function Render(rootNode, json) {
  this.rootNode = rootNode;
  this.head = json.head;
  this.data = json.data;
  this.init();
}

Render.prototype.init = function () {
  var frag = this.renderTable(this.rootNode);
  this.frag = frag;
  //render head
  this.renderHead(frag, this.head);
  //render row
  this.renderRow();
  this.rootNode.appendChild(frag);
}

//render whole table
Render.prototype.renderTable = function (root) {
  root.innerHTML = "";
  var frag = document.createDocumentFragment();
  var table = document.createElement("table");
  var tHead = document.createElement("thead")
  var tBody = document.createElement("tbody");
  table.appendChild(tHead);
  table.appendChild(tBody);
  frag.appendChild(table);
  return frag;
}

//render head
Render.prototype.renderHead = function (frag, headData) {
  var table = frag.querySelector("table");
  var thead = table.tHead;
  thead.insertRow(0);
  headData.forEach(function (item, index, array) {
    thead.rows[0].appendChild(document.createElement("th")).appendChild(document.createTextNode(item));
  });
  // console.log(table);
}

//render row
Render.prototype.renderRow = function () {
  //clear
  console.log(this);
  // var f = this.frag;
  var table = this.frag.querySelector("table") ||this.rootNode.querySelector("table");
  // console.log(table2);
  var tbody = table.tBodies[0];
  tbody.innerHTML = "";
  this.data.forEach(function (item, index, array) {
    // console.log(tbody);
    var currRow = tbody.insertRow(index);
    this.renderEachRow(currRow, item, this.head)
  }, this);
}
//render each row
Render.prototype.renderEachRow = function (currRow, data, head) {
  head.forEach(function (item, index, array) {
    var currText = data[item];
    currText = typeof currText !== "undefined" ? currText : "";
    currRow.insertCell(index).appendChild(document.createTextNode(currText));
  }, this);
}