function Observer(obj) {
  if (typeof obj !== "object") {
    console.log("please input a object");
    return obj;
  }
  if (Array.isArray(obj)) {
    console.log("it's an array");
    return obj;
  }

  this.data = obj;
  this.walk(obj);
  this.publisher = new SubPub();
}

//遍历
Observer.prototype.walk = function (obj) {
  for (let prop in obj) {
    if (!obj.hasOwnProperty(prop)) {
      continue;
    }
    let _val = obj[prop];
    if (typeof _val === "object") {
      new Observer(_val);
    }
    this.vueBind(prop, _val)
  }
}

//绑定
Observer.prototype.vueBind = function (prop, _val) {
  let that = this;
  Object.defineProperty(this.data, prop, {
    get: function () {
      console.log("你访问了" + prop);
      return _val;
    },

    set: function (value) {
      _val = value;
      console.log("你设置了" + prop + ",新的值为" + value);
      that.publisher.pub(prop, value);
      if (typeof value == "object") {
        new Observer(_val);
      }
    }
  })
}


Observer.prototype.$watch = function (prop, func) {
  this.publisher.sub(prop, func);
}

var t1 = {
  name: 'youngwind',
  age: 25,
  family: {
    father: {
      name: "wj",
      age: 50
    },
    mother: {
      name: "hy",
      age: 49
    }
  }
}

//Observer
function SubPub() {
  this.handlers = {};
}

SubPub.prototype.sub = function (eventType, handler) {
  if (!(eventType in this.handlers)) {
    this.handlers[eventType] = [];
  }
  this.handlers[eventType].push(handler);
}

SubPub.prototype.pub = function (eventType, value) {
  // console.log(this)
  let args = Array.prototype.slice.call(arguments, 1);
  for (let i = 0; i < this.handlers[eventType].length; i++) {
    this.handlers[eventType][i].apply(this, args);
  }
}

let app1 = new Observer(t1);

app1.$watch('age', function (age) {
  console.log(`我的年纪变了，现在已经是：${age}岁了`)
});

// app1.data.age = 100; // 你设置了 age，新的值为100
// app1.data.family.father.name;
app1.data.age = {
  year: 1992,
  month : 2,
}

console.log(app1.data.age.year);