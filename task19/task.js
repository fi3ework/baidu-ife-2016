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
      render(this.data.splice(index, 1));
    }
  },
  input: document.getElementById("input"),
  leftIn: document.getElementById("leftIn"),
  leftOut: document.getElementById("leftOut"),
  rightIn: document.getElementById("rightIn"),
  rightOut: document.getElementById("rightOut"),
  wrapperEle: document.getElementById("wrapper"),
  random: document.getElementById("random"),
  bubble: document.getElementById("bubble")
}

function inputValid(input) {
  if (!/^\d+$/.test(gVars.input.value)) {
    return false;
  }
  if (gVars.input.value < 10 || gVars.input.value > 100) {
    return false;
  }
  if (gVars.deque.data.length > 60) {
    return false;
  }
  return true;
}

function render(popValue) {
  //render
  gVars.wrapperEle.innerHTML = "";
  gVars.deque.data.forEach(function (value) {
    var ele = document.createElement("div");
    ele.style.height = value * 2 + "px";
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

//click listener
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

gVars.rightOut.onclick = function () {
  inputValid() && gVars.deque.rightPop();
}

gVars.random.onclick = function () {
  gVars.deque.data = generateRandomNum();
  render();
}

gVars.bubble.onclick = function () {
  var flag = bubbleSort(gVars.deque.data);
}

//swap two num
function swapNode(index1, index2) {
  var ele1 = gVars.wrapperEle.childNodes[index1];
  var ele2 = gVars.wrapperEle.childNodes[index2];
  var tempNode = ele2.cloneNode(true);
  ele1.parentNode.insertBefore(tempNode, ele1);
  ele1.parentNode.replaceChild(ele1, ele2);
  ele1 = null;
}

//randomize
function generateRandomNum() {
  var tempArr = [];
  for (var i = 0; i < 20 + Math.floor(Math.random() * 20); i++) {
    tempArr.push(Math.floor(Math.random() * 101));
  }
  return tempArr;
}

//bubble sort
function bubbleSort(arr) {
  var i = j = 0;
  var timer = setInterval(run, 30);

  function run() {
    if (i < arr.length - 1) {
      if (j < arr.length - i - 1) {
        if (arr[j] > arr[j+1]) {
          var temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
          // render();
          swapNode(j+1, j);
        }
        j++;
      } else {
        i++;
        j = 0;
      }
    } else {
      clearInterval(timer);
      console.log("finish bubble");
    }
  }
}