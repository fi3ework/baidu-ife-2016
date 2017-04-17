window.onload = function () {
  var root = document.getElementById("root");
  var bf = document.getElementById("bf");
  var df = document.getElementById("df");
  var queryEle = document.getElementById("query");
  var wrapperEle = document.getElementById("wrapper");
  var delEle = document.getElementById("del");
  var insertEle = document.getElementById("insert");
  var input = document.getElementById("insertInput");
  var stack = [];
  var timer;

  //深度优先
  function DF(node) {
    if (node != null) {
      show(node, query);
      for (var i = 0; i < node.childNodes.length; i++) {
        node.childNodes[i].nodeType == 1 && DF(node.childNodes[i]);
      }
    }
  }

  var BFindex = 0;
  //广度优先
  function BF(node) {
    if (node) {
      show(node);
      BF(node.nextElementSibling);
      node = stack[BFindex++];
      BF(node.firstElementChild);
    }
  }

  //show
  function show(node) {
    stack.push(node);
  }

  //clear state
  function clearBgc() {
    document.getElementsByClassName("search")[0] && (document.getElementsByClassName("search")[0].className = "");
    document.getElementsByClassName("selected")[0] && (document.getElementsByClassName("selected")[0].className = "");
  }

  bf.onclick = function () {
    clearBgc();
    stack = [];
    BFindex = 0;
    BF(root);
    startAnimation();
  }

  df.onclick = function () {
    clearBgc();
    stack = [];
    DF(root);
    console.log(stack)
    startAnimation();
  }

  bfSearch.onclick = function () {
    clearBgc();
    stack = [];
    BFindex = 0;
    BF(root);
    startAnimation(query);
  }

  dfSearch.onclick = function () {
    clearBgc();
    stack = [];
    DF(root);
    startAnimation(query);
  }

  //search judge
  function judge(node, query) {
    var text;
    if (node.childElementCount) {
      for (var i = 0; i < node.childElementCount; i++) {
        node.childNodes[i].nodeType == 3 && (text = node.childNodes[i].nodeValue.trim(), console.log(text));
      }

    } else {
      text = node.innerHTML.trim();
      console.log(node.innerHTML)
    }
    // console.log(text)
    if (text == query) {
      node.className = "search";
      clearInterval(timer);
      stack = [];
    }
  }

  //animation
  function startAnimation(query) {
    clearInterval(timer);
    timer = setInterval(function () {
      stack.length == 0 && clearInterval(timer);
      var currMovingEle = document.getElementsByClassName("moving")[0];
      currMovingEle && currMovingEle.classList.remove("moving");
      var curr = stack.shift();
      if (curr) {
        curr.classList.add("moving");
      }
      if (curr && query) {
        judge(curr, queryEle.value)
      }
    }, 111)
  }

  // set click
  function setClick() {
    var divs = wrapperEle.getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
      divs[i].onclick = function (eve) {
        var oldSelcted = document.getElementsByClassName("selected")[0];
        oldSelcted && (oldSelcted.className = "");
        this.className = "selected";
        eve.stopPropagation();
      }
    }
  }

  // del function
  function delNode() {
    var currSelectedEle = document.getElementsByClassName("selected")[0];
    if (!currSelectedEle)
      return;
    currSelectedEle.remove();
    currSelectedEle = null;
  }

  //set del
  delEle.onclick = function () {
    delNode();
  }

  // insert function
  function insertNode() {
    var currSelectedEle = document.getElementsByClassName("selected")[0];
    if (currSelectedEle) {
      var insertChild = document.createElement("div");
      insertChild.appendChild(document.createTextNode(input.value));
      currSelectedEle.appendChild(insertChild);
      setClick();
    }
  }

  //set insert
  insertEle.onclick = function () {
    insertNode();
  }

  setClick();

}