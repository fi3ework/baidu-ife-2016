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
    let nextObserver;
    if (typeof _val === "object") {
      nextObserver = new Observer(_val);
      nextObserver.parent = this;
      nextObserver.eventName = prop;
    }
    this.vueBind(prop, _val)
  }
}

//绑定
Observer.prototype.vueBind = function (prop, _val) {
  let that = this;

  Object.defineProperty(this.data, prop, {
    configurable: true,
    enumerable: true,
    get: function () {
      console.log("你访问了" + prop);
      return _val;
    },

    set: function (value) {
      _val = value;

      if (typeof value === "object") {
        let newObserver = new Observer(value);
        newObserver.parent = that.parent || that;
        newObserver.eventName = prop;
      }

      console.log("你设置了" + prop + ",新的值为" + value);
      that.publisher.pub(prop, value);

      let parent = that.parent;
      while (typeof parent === "object"){// && typeof parent.eventName == "string") {
        parent.publisher.pub(that.eventName, value);
        parent = parent.parent;
      }
    }
  })
}


Observer.prototype.$watch = function (prop, func) {
  var parentValue = this[prop];
  this.publisher.sub(prop, func);
}

//Observer
function SubPub() {
  this.handlers = {};
}

//sub
SubPub.prototype.sub = function (eventType, handler) {
  if (!(eventType in this.handlers)) {
    this.handlers[eventType] = [];
  }
  this.handlers[eventType].push(handler);
}

//pub
SubPub.prototype.pub = function (eventType, value) {
  if (eventType in this.handlers) {
    let args = Array.prototype.slice.call(arguments, 1);
    for (let i = 0; i < this.handlers[eventType].length; i++) {
      this.handlers[eventType][i].apply(this, args);
    }
  }
}

var t1 = {
  name: {
    firstName: "f",
    lastName: "j"
  },
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

let app1 = new Observer(t1);

app1.$watch('name', function (name) {
  console.log(`名字改变了!!!!!`)
});

app1.data.name.firstName = "QQQ";
// app1.data.name.lastName = "UUU";
// app1.data.name = "XXX";
// app1.data.age = "29";
// app1.data.name = "xxo";
app1.data.name = {
  f: "xx",
  l: "ww"
}

app1.data.name.f = "haha";