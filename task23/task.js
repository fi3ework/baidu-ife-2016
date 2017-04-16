window.onload = function () {
  var root = document.getElementById("root");
  var bf = document.getElementById("bf");
  var df = document.getElementById("df");
  var queryEle = document.getElementById("query");
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

  bf.onclick = function () {
    document.getElementsByClassName("search")[0] && (document.getElementsByClassName("search")[0].className = "");
    stack = [];
    BFindex = 0;
    BF(root);
    startAnimation();
  }

  df.onclick = function () {
    document.getElementsByClassName("search")[0] && (document.getElementsByClassName("search")[0].className = "");
    stack = [];
    DF(root);
    console.log(stack)
    startAnimation();
  }

  bfSearch.onclick = function () {
    document.getElementsByClassName("search")[0] && (document.getElementsByClassName("search")[0].className = "");
    stack = [];
    BFindex = 0;
    BF(root);
    startAnimation(query);
  }

  dfSearch.onclick = function () {
    document.getElementsByClassName("search")[0] && (document.getElementsByClassName("search")[0].className = "");
    stack = [];
    DF(root);
    startAnimation(query);
  }

  //judge
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


  function startAnimation(query) {
    clearInterval(timer);
    timer = setInterval(function () {
      stack.length == 0 && clearInterval(timer);
      var currSelectedEle = document.getElementsByClassName("selected")[0];
      currSelectedEle && currSelectedEle.classList.remove("selected");
      var curr = stack.shift();
      if (curr) {
        console.log(1);
        curr.classList.add("selected");
      }
      if (curr && query) {
        judge(curr, queryEle.value)
      }
    }, 111)
  }



}