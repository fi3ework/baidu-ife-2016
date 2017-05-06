document.getElementById("log-in-btn").addEventListener("click", function () {
  var mask = document.getElementById("mask");
  var wrapper = document.getElementById("log-in-wrapper");
  wrapper.style.display = "block";
  mask.style.display = "block";
})

document.getElementById("mask").addEventListener("click",
  function () {
    var wrapper = document.getElementById("log-in-wrapper");
    this.style.display = "none";
    wrapper.style.display = "none";
  })

document.getElementById("close-window").addEventListener("click",
  function () {
    var wrapper = document.getElementById("log-in-wrapper");
    var mask = document.getElementById("mask");
    mask.style.display = "none";
    wrapper.style.display = "none";
  })

document.getElementById("drag-move").addEventListener("mousedown", function (eve) {
  this.moving = true;
  var parentLeftX = this.offsetLeft;
  var parentTopY = this.offsetTop;
  this.startPos = {
    x: eve.offsetX + parentLeftX,
    y: eve.offsetY + parentTopY
  }
})

document.body.addEventListener("mousemove", function (eve) {
  var dragger = document.getElementById("drag-move");
  if (dragger.moving === true) {
    var wrapper = document.getElementById("log-in-wrapper");
    wrapper.style.left = Math.max(eve.clientX - dragger.startPos.x, 0) + "px";
    wrapper.style.top = Math.max(eve.clientY - dragger.startPos.y, 0) + "px";

    wrapper.style.left = Math.min(parseInt(wrapper.style.left), document.documentElement.clientWidth - wrapper.offsetWidth) + "px";
    wrapper.style.top = Math.min(parseInt(wrapper.style.top), document.documentElement.clientHeight - wrapper.offsetHeight) + "px";
  }
})

document.body.addEventListener("mouseup", function () {
  var dragger = document.getElementById("drag-move");
  dragger.moving && (dragger.moving = false);
  dragger.moving = null;
})