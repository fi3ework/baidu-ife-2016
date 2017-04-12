var gVars = {
  // var leftIn = 
  deque: {
    data: [],
    rightPush: function (value) {
      this.data.push(value);
      render();
    },

    leftPush: function (value) {
      this.data.unshift(value);
      render();
    },

    leftPop: function () {
      render(this.data.shift());
    },

    rightPop: function () {
      render(this.data.pop());
    },

    deleteIndex: function (index) {
      console.log("deling...." + index);
      render(this.data.splice(index, 1));
    }
  },
  input: document.getElementById("input"),
  leftIn: document.getElementById("leftIn"),
  leftOut: document.getElementById("leftOut"),
  rightIn: document.getElementById("rightIn"),
  rightOut: document.getElementById("rightOut"),
  wrapperEle: document.getElementById("wrapper")
}

function inputValid(input) {
  return /^\d+$/.test(gVars.input.value);
}

function render(popValue) {
  //render
  gVars.wrapperEle.innerHTML = "";
  gVars.deque.data.forEach(function (value) {
    var ele = document.createElement("div");
    ele.appendChild(document.createTextNode(value));
    gVars.wrapperEle.appendChild(ele);
  });
  //alert
  if (popValue) {
    alert(popValue);
  } else {
    //clear input
    gVars.input.value = "";
  }
  initClickDel();
}

//set click del
function initClickDel() {
  console.log("length" + gVars.wrapperEle.childElementCount);
  for (var i = 0; i < gVars.wrapperEle.childElementCount; i++) {
    //good
    gVars.wrapperEle.childNodes[i].onclick = function (index) {
      return function () {
        gVars.deque.deleteIndex(index);
      }
    }(i);
    //good

  }
}

gVars.rightIn.onclick = function () {
  inputValid() && gVars.deque.rightPush(parseInt(gVars.input.value));
}

gVars.leftIn.onclick = function () {
  inputValid() && gVars.deque.leftPush(parseInt(gVars.input.value));
}

gVars.leftOut.onclick = function () {
  inputValid() && gVars.deque.leftPop();
}

gVars.rightOut.onclick = function () {
  inputValid() && gVars.deque.rightPop();
}