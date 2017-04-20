var nameEle = document.getElementById("name");
var passwordEle = document.getElementById("password");
var repeatEle = document.getElementById("repeatPassword");
var emailEle = document.getElementById("email");
var phoneEle = document.getElementById("phone");
var wrapperEle = document.getElementById("wrapper");

// var x = wrapperEle.getElementsByClassName("hint");
// console.log(x)

nameEle.hint = {
  hint: "必填，长度为4~16位字符",
  right: "名称格式正确",
  wrong: "名称格式有误",
};
passwordEle.hint = {
  hint: "必填，长度为4~16位字符,包含字母和数字",
  right: "密码可用",
  wrong: "密码不可用",
};
repeatEle.hint = {
  hint: "必填，必须与密码相同",
  right: "密码输入一致",
  wrong: "密码输入不一致",
};
emailEle.hint = {
  hint: "填写正确的邮箱格式",
  right: "邮箱格式正确",
  wrong: "邮箱格式错误",
};
phoneEle.hint = {
  hint: "必填，长度为4~16位字符",
  right: "手机格式正确",
  wrong: "手机格式错误",
};



function checkValidity(reg) {
  console.log(typeof reg);
  if (typeof reg == "function") {
    return reg.call(this.value)
  } else {
    return reg.test(this.value)
  }
}

function changeColor(isValid) {
  var hintEle = this.parentNode.parentNode.getElementsByClassName("hint")[0];
  console.log(this)
  console.log(hintEle)
  if (this.value == "") {
    this.classList.remove("invalid");
    this.classList.remove("valid");
    hintEle.style.display = "table-row";
    hintEle.style.color = "black";
    return;
  }

  if (isValid) {
    hintEle.style.display = "table-row";
    this.classList.remove("invalid");
    this.classList.add("valid");
    hintEle.innerHTML = this.hint.right;
    hintEle.style.color = "seagreen";
  } else {
    hintEle.style.display = "table-row";
    hintEle.innerHTML = this.hint.wrong;
    hintEle.style.color = "red"
    this.classList.remove("valid");
    this.classList.add("invalid");
  }
}

var regs = {
  nameReg: function () {
    var currLength = 0;
    for (var i = 0; i < this.length; i++) {
      var uni = parseInt(this.charCodeAt(i));
      if (uni > 0x4e00.toString(10) && uni < 0x9fa5.toString(10)) {
        currLength += 2;
      } else {
        currLength++;
      }
    }
    return currLength <= 12;
  },
  passwordReg: /^\w{6,16}/,
  repeatReg: function () {
    return this == passwordEle.value;
  },
  emailReg: /^[a-zA-Z\d-_]+@[a-zA-Z\d-_]+.[a-zA-Z\d-_]+$/,
  phoneReg: /1\d{10}/
}

//on focus
wrapperEle.onclick = function () {}

nameEle.onfocus = passwordEle.onfocus = repeatEle.onfocus = emailEle.onfocus = phoneEle.onfocus = function (eve) {
  if (eve.target.tagName == "INPUT") {
    var hintEle = eve.target.parentNode.parentNode.getElementsByClassName("hint")[0];
    if (this.value == "") {
      hintEle.innerHTML = this.hint.hint;
      hintEle.style.display = "table-row";
      hintEle.style.color = "black";
      return;
    }
    if (this.isValid) {
      hintEle.style.display = "table-row";
      hintEle.innerHTML = this.hint.right;
      hintEle.style.color = "seagreen";
    } else {
      hintEle.style.display = "table-row";
      hintEle.innerHTML = this.hint.wrong;
      hintEle.style.color = "red"
    }
  }
}

//on blur
nameEle.onblur = passwordEle.onblur = repeatEle.onblur = emailEle.onblur = phoneEle.onblur = function (eve) {
  if (eve.target.tagName == "INPUT") {
    var hintEle = eve.target.parentNode.parentNode.getElementsByClassName("hint")[0];
    if (this.isValid || this.value == "") {
      hintEle.style.color = "black";
      hintEle.style.display = "none";
    }
  }
}

//name
nameEle.addEventListener("keyup", function () {
  this.isValid = checkValidity.call(this, regs.nameReg);
  changeColor.call(this, this.isValid);
})

//password
passwordEle.addEventListener("keyup", function () {
  this.isValid = checkValidity.call(this, regs.passwordReg);
  changeColor.call(this, this.isValid);
})

//repeat
repeatEle.addEventListener("keyup", function () {
  this.isValid = checkValidity.call(this, regs.repeatReg)
  changeColor.call(this, this.isValid);
})

//email
emailEle.addEventListener("keyup", function () {
  this.isValid = checkValidity.call(this, regs.emailReg);
  changeColor.call(this, this.isValid);
})

//phone
phoneEle.addEventListener("keyup", function () {
  this.isValid = checkValidity.call(this, regs.phoneReg);
  changeColor.call(this, this.isValid);
})