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
  console.log(this)
}

Observer.prototype.walk = function (obj) {
  for (let prop in obj) {
    if (!obj.hasOwnProperty(prop)) {
      continue;
    }
    var val = obj[prop];
    if (typeof val === "object") {
      new Observer(val);
    }
    this.vueBind(prop, val)
  }
}

Observer.prototype.vueBind = function (prop, val) {
  // let _value = val;
  Object.defineProperty(this.data, prop, {
    get: function () {
      console.log("你访问了" + prop);
      return val;
    },

    set: function (value) {
      val = val;
      console.log("你设置了" + prop + ",新的值为" + value);
    }
  })
}

var t1 = {
  name: 'youngwind',
  age: 25,
  family : {
    father: {
      name: "wj",
      age : 50
    },
    mother: {
      name: "hy",
      age : 49
    }
  }
}
let app1 = new Observer(t1);
// console.log(app1)
// console.log(t1)

// console.log(app1)
console.log(app1.data.name) // 你访问了 name
app1.data.age = 100; // 你设置了 age，新的值为100
app1.data.family.father.name