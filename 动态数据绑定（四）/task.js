var Vue = function (app) {
  let selector = app.el;
  this.rootNode = document.querySelectorAll(selector)[0];
  this.data = app.data;
  this.walkData(this.data, "");
}

Vue.prototype.walkData = function (data, path) {
  for (let prop in data) {
    let currPath = path !== "" ? path + "." + prop : prop;
    if (typeof data[prop] === "object") {
      this.walkData(data[prop], currPath);
    }
    //process
    this.process(currPath, data[prop]);
  }
};

Vue.prototype.process = function (path, value) {
  let ih = this.rootNode.innerHTML;
  let regStr = "\\{+" + (path) + "\\}+";
  let reg = new RegExp(regStr, "gm");
  let resultIh = ih.replace(reg, value);
  this.rootNode.innerHTML = resultIh;
  // }
}

let app = new Vue({
  el: '#app',
  data: {
    user: {
      age: 25
    }
  }
});