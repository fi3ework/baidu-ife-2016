window.onload = function () {
  var root = document.getElementById("root");
  var preButton = document.getElementById("pre");
  var inButton = document.getElementById("in");
  var postButton = document.getElementById("post");
  var stack = [];
  var timer;
  //前序遍历
  function preOrder(node) {
    if (node != null) {
      show(node);
      preOrder(node.firstElementChild);
      preOrder(node.lastElementChild);
    }
  }

  //中序遍历
  function inOrder(node) {
    if (node != null) {
      inOrder(node.firstElementChild);
      show(node)
      inOrder(node.lastElementChild);
    }
  }

  //后序遍历
  function postOrder(node) {
    if (node != null) {
      postOrder(node.firstElementChild);
      postOrder(node.lastElementChild);
      show(node);
    }
  }

  //show
  function show(node) {
    stack.push(node)
  }

  preButton.onclick = function () {
    preOrder(root);
    startAnimation();
  }

  inButton.onclick = function () {
    inOrder(root);
    startAnimation();
  }

  postButton.onclick = function () {
    postOrder(root);
    startAnimation();
  }

  function startAnimation() {
    clearInterval(timer);
    timer = setInterval(function () {
      var currSelectedEle = document.getElementsByClassName("selected")[0];
      currSelectedEle && currSelectedEle.classList.remove("selected");
      var curr = stack.shift();
      curr.classList.add("selected");
      stack.length == 0 && clearInterval(timer);
    }, 100)
  }




}