function Controller() {

}

Controller.prototype.validator = new Validator();

Controller.prototype.focusChange = function (model) {
  model.hintDom.innerHTML = model.rule;
  model.hintDom.classList.add("hint-focus");
}

Controller.prototype.blurChange = function(model){
  if(!model.selfDom.value){
    model.hintDom.innerHTML = "";
    model.hintDom.classList.remove("hint-show");
    model.hintDom.classList.remove("hint-focus");
  }
}

Controller.prototype.typeChange = function (model) {
  if (!model.selfDom.value) {
    this.classList.remove("invalid");
    this.classList.remove("valid");
    model.hintDom.classList.remove("hint-show");
    return;
  }

  if (model.validity) {
    this.classList.remove("invalid");
    this.classList.add("valid");
    model.hintDom.classList.add("hint-show");
    model.hintDom.innerHTML = model.success;
  } //合法
  else {
    this.classList.remove("valid");
    this.classList.add("invalid");
    model.hintDom.classList.remove("hint-valid");
    model.hintDom.innerHTML = model.rule;
  } //非法
  // console.log(this);
}

Controller.prototype.addControl = function (model) {
  console.log(model.selfDom);
  var that = this;
  model.selfDom.addEventListener("keyup", function () {
    that.validator.checkTheValidity(model); //validate
    that.typeChange.call(this, this.model);
  });
  model.selfDom.addEventListener("focus", function () {
    that.focusChange.call(this, this.model);
  })
  model.selfDom.addEventListener("blur", function(){
    that.blurChange.call(this, this.model);
  })
}