function Validator(model) {
  this.model = model;
}

Validator.prototype.types = {
  //not empty
  isNotEmpty: {
    validate: function (value) {
      return value !== "";
    },
  },
  //valid name
  isValidName: {
    validate: function (value) {
      var realLength = 0,
        len = value.length,
        charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = value.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
      }
      return realLength >= 4 && realLength <= 16;
    },
  },
  //valid email
  isValidEmail: {
    validate: function (value) {
      return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]/.test(value);
    },
  }
}

Validator.prototype.addRule = function (rule, inputDom) {
  console.log(rule)
  var func = this.types[rule].validate;
  return func(inputDom.value);
}

Validator.prototype.checkTheValidity = function (model) {
  var rules = model.validators;
  if (!rules) {
    return;
  }
  var inputDom = model.selfDom;
  var that = this;
  var result = rules.every(function (item, index, array) {
    return that.addRule(item, inputDom);
  });
  model.validity = result ? true : false;
}