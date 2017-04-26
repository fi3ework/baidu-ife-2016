function Render(wrapper) {
  this.wrapper = wrapper;
}

Render.prototype.appendEle = function (model) {
  var type = model.type;
  if (type == "button") {
    this.appendSubmit(model);
  } else {
    this.appendInput(model);
  }
}

Render.prototype.appendInput = function (model) {
  var currWrapper = document.createElement("div");
  currWrapper.className = "form-wrapper"
  var textEle = document.createElement("input");
  var labelEle = document.createElement("label");
  var hintEle = document.createElement("p");
  hintEle.className = "hint";
  textEle.id = model.id;
  textEle.type = model.type;
  labelEle.innerHTML = model.label;

  currWrapper.appendChild(labelEle);
  currWrapper.appendChild(textEle);
  currWrapper.appendChild(hintEle);
  this.wrapper.appendChild(currWrapper);

  //bind
  model.selfDom = textEle;
  model.hintDom = hintEle;
  textEle.model = model;
}

Render.prototype.appendSubmit = function (model) {
  var buttonEle = document.createElement("button");
  buttonEle.innerHTML = model.value;
  buttonEle.id = model.id;
  this.wrapper.appendChild(buttonEle);

  //bind
  model.selfDom = buttonEle;
  buttonEle.model = model;
}