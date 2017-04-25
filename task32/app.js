//根据框框的内容生成form
function generateForm(id) {
  var jsonStr = document.getElementById(id).value;
  var wrapperIndex = /-(\d+)/.exec(id)[1];
  var wrapper = document.getElementById("wrapper-" + wrapperIndex);
  try {
    var model = JSON.parse(jsonStr);
  } catch (ex) {
    alert("JSON is invalid!");
  }
  var eleFactory = new Render(wrapper); //生成dom
  var validator = new Validator();//验证器
  var controller = new Controller();
  for (var key in model) {
      eleFactory.appendEle(model[key]);
      validator.checkTheValidity(model[key]);
      controller.addControl(model[key]);
  }
}


//初始化
function init() {
  generateForm("input-1");
}

init();