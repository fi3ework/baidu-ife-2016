//constructor
function NodeTree(obj) {
  this.data = obj.data;
  this.childs = [];
  this.parent = obj.parent;
  this.selfDom = obj.selfDom;
  this.selfDom.nodeTree = this;
}

//toggle
NodeTree.prototype.toggle = function (eve) {
  if (!eve.target.nodeTree || !eve.target.nodeTree.childs.length || eve.target == rootEle)
    return true;
  if (window.getComputedStyle(eve.target.nodeTree.childs[0].selfDom).display == "block") {
    for (var i = 0; i < eve.target.nodeTree.childs.length; i++) {
      eve.target.nodeTree.childs[i].selfDom.style.display = "none";
    }
  } else {
    for (var i = 0; i < eve.target.nodeTree.childs.length; i++) {
      eve.target.nodeTree.childs[i].selfDom.style.display = "block";
    }
  }
}

//init
NodeTree.prototype.init = function () {
  this.selfDom.onclick = this.toggle;
  // this.selfDom.setHover 
}

//render
NodeTree.prototype.render = function () {
  this.setmouseover();
  this.setmouseout();
}

//set mouseover 
NodeTree.prototype.setmouseover = function () {
  this.selfDom.onmouseover = this.setHoverShow;
}

//set mouseout
NodeTree.prototype.setmouseout = function () {
  // console.log(this)
  this.selfDom.onmouseout = this.setHoverHide;
}

//delete node
NodeTree.prototype.deleteNodeTree = function (eve) {
  eve.stopPropagation();
  console.log(22)
  var currDelButtonItem = this.parentNode.parentNode;
  var index = currDelButtonItem.nodeTree.childs.indexOf(this);
  (index != -1) && currDelButtonItem.nodeTree.childs.splice(index, 1);
  console.log(currDelButtonItem.nodeTree);
  currDelButtonItem.parentNode.remove(currDelButtonItem);
  currDelButtonItem = null;
}

//click to add
NodeTree.prototype.clickToAdd = function () {
  var newName = prompt("新节点名称", "");
  this.parentNode.parentNode.nodeTree.addChild(newName);
}

//rename
NodeTree.prototype.rename = function (eve) {
  //ui
  eve.stopPropagation();
  var newName = prompt("重命名名称", "");
  var currSelfDom = this.parentNode.parentNode;
  for (var i = 0; i < currSelfDom.childElementCount; i++) {
    currSelfDom.childNodes[i].nodeType == 3 && (currSelfDom.childNodes[i].nodeValue = newName);
  }
  //data
  this.parentNode.parentNode.nodeTree.data = newName;
}


//hover show
NodeTree.prototype.setHoverShow = function (eve) {
  //create element
  console.log("in")
  // event.preventDefault()
  // eve.stopPropagation();
  var tipWrapper = document.createElement("div");
  tipWrapper.className = "iconfont";
  this.appendChild(tipWrapper);
  var addButton = document.createElement("span");
  var delButton = document.createElement("span");
  var renameButton = document.createElement("span");
  tipWrapper.appendChild(addButton);
  tipWrapper.appendChild(delButton);
  tipWrapper.appendChild(renameButton);
  addButton.innerHTML = "&#xe610; 新建";
  delButton.innerHTML = "&#xe600; 删除";
  renameButton.innerHTML = "&#xe639; 重命名";
  //set hover and onclick

  console.log(this)
  delButton.onclick = this.nodeTree.deleteNodeTree;
  addButton.onclick = this.nodeTree.clickToAdd;
  renameButton.onclick = this.nodeTree.rename;
}

//hover hide
NodeTree.prototype.setHoverHide = function (eve) {
  // var reltEle = eve.relatedTarget;
  // console.log(this);
  // console.log("out")
  // eve.stopPropagation();
  // var tipWrapper = this.getElementsByClassName("iconfont")[0];
  // this.removeChild(tipWrapper);
  // tipWrapper = null;



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
  childTree.render();
  this.childs.push(childTree);
}

//demo
var rootEle = document.getElementById("root");
var root = new NodeTree({
  data: "前端工程师",
  childs: [],
  selfDom: rootEle,
  parent: null,
  nodeTree: root
});


root.init();
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