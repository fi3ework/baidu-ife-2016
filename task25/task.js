//constructor
function NodeTree(obj) {
  this.data = obj.data;
  this.childs = [];
  this.selfDom = obj.selfDom;
  this.parentDom = obj.parent;
  this.selfDom.nodeTree = this;
}

//toggle
NodeTree.prototype.toggle = function (eve) {
  eve.stopPropagation();
  // console.log(this.nodeTree.childs.length)
  // console.log(window.getComputedStyle(this.nodeTree.childs[0].selfDom).display);
  if (!this.nodeTree.childs.length)
    return true;
  if (window.getComputedStyle(this.nodeTree.childs[0].selfDom).display == "block") {
    for (var i = 0; i < this.nodeTree.childs.length; i++) {
      this.nodeTree.childs[i].selfDom.style.display = "none";
    }
  } else {
    for (var i = 0; i < this.nodeTree.childs.length; i++) {
      this.nodeTree. childs[i].selfDom.style.display = "block";
    }
  }
}

//render
NodeTree.prototype.render = function () {
  // console.log(this.toggle)
  this.selfDom.onclick = this.toggle;
}

//delete node
NodeTree.prototype.deleteNode = function () {

}

//add child
NodeTree.prototype.addChild = function (data) {
  var newDom = document.createElement("div");
  newDom.appendChild(document.createTextNode(data));
  this.selfDom.appendChild(newDom);
  var obj = {
    data: data,
    childs: [],
    parent: this,
    selfDom: newDom
  }
  var childTree = new NodeTree(obj);
  this.childs.push(childTree);
  childTree.render();
}

//demo
var rootEle = document.getElementById("root");
var root = new NodeTree({
  data: "前端工程师",
  childs: [],
  selfDom: rootEle,
  parentDom: null,
  nodeTree : root
});

root.addChild("HTML");
root.addChild("CSS")
root.addChild("Javascript")
root.childs[2].addChild("框架")
root.childs[2].addChild("库")
root.childs[2].childs[0].addChild("Vue")
root.childs[2].childs[0].addChild("Angular")
root.childs[2].childs[0].addChild("React")
root.childs[2].childs[1].addChild("jQuery")
root.childs[2].childs[1].addChild("d3")