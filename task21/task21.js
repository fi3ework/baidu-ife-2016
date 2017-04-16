window.onload = function () {
  var hobbyWrapperEle = document.getElementById("hobbyWrapper");
  var tagWrapperEle = document.getElementById("tagWrapper");
  var submitHobbyEle = document.getElementById("submitHobby");
  var hobbyInputEle = document.getElementById("hobbyInput");
  var tagInputEle = document.getElementById("tagInput");
  var hobby = {
    data: [],
    concat: function (value) {
      commonPush.call(this, value);
      this.render();
    },
    render: function () {
      hobbyWrapperEle.innerHTML = "";
      commonRender.call(hobbyWrapperEle, this.data);
    }
  };

  var tag = {
    data: [],
    push: function (value) {
      commonPush.call(this, value);
      console.log(this.data)
      this.render();
    },

    render: function () {
      tagWrapperEle.innerHTML = "";
      commonRender.call(tagWrapperEle, this.data);
    }
  }

  //common push
  function commonPush(value) {
    // console.log(value)
    if (typeof value == "object") {
      for (let i = 0; i < value.length; i++) {
        //去重
        if (this.data.indexOf(value[i]) != -1)
          continue;
        if (this.data.length < 10) {
          this.data.push(value[i]);
        } else {
          this.data.shift();
          this.data.push(value[i]);
        }
      }
    } else {
      // console.log(this.data)
      if (this.data.indexOf(value) != -1)
        return;
      if (this.data.length < 10) {
        this.data.push(value);
      } else {
        this.data.shift();
        this.data.push(value);
      }
    }

  }

  //submit hobby
  submitHobbyEle.addEventListener("click", function () {
    var currStr = hobbyInputEle.value;
    var querys = currStr.split(/[^\da-zA-Z\u4e00-\u9fa5]/);
    var querys = querys.filter(function (item) {
      return item != ""
    })
    hobby.concat(querys);
    hobbyInputEle.value = "";
  })

  //submit tag
  tagInputEle.addEventListener("keydown", function (eve) {
    var keyCode = eve.keyCode;
    // console.log(this.value)
    var submitArr = [13, 32, 188]
    if (submitArr.indexOf(keyCode) != -1) {
      (this.value != "") &&
      (tag.data.indexOf(this.value) == -1) &&
      tag.push(this.value.trim());
      eve.preventDefault();
      this.value = "";
    }
  })

  //common append
  // function appendRender(data) {
  //   var tempEle = document.createElement("div");
  //   tempEle.appendChild(document.createTextNode(data));
  //   this.appendChild(tempEle);
  // }

  //common render
  function commonRender(data) {
    console.log(this)
    console.log(data)
    var fragment = document.createDocumentFragment();
    for (let i = 0; i < data.length; i++) {
      var currEle = document.createElement("div");
      currEle.appendChild(document.createTextNode(data[i]));
      fragment.appendChild(currEle);
    }
    this.appendChild(fragment);
  }
}