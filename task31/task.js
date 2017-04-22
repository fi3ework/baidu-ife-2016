var studentRadio = document.getElementById("student");
var notStudentRatio = document.getElementById("notStudent");
var studentWrapper = document.getElementById("studentWrapper");
var nonStudentWrapper = document.getElementById("notStudentWrapper");
var citySelect = document.getElementById("city");
var schoolSelect = document.getElementById("school");


var initSelect = {
  data: [{
      value: "bj",
      name: "北京",
      schools: [{
          pku: "清华大学"
        },
        {
          thu: "北京大学"
        },
        {
          bit: "北京理工大学"
        }
      ]
    },
    {
      value: "sh",
      name: "上海",
      schools: [{
          sj: "上海交通大学"
        },
        {
          tj: "同济大学"
        },
        {
          fd: "复旦大学"
        }
      ]
    },
    {
      value: "hz",
      name: "杭州",
      schools: [{
        zju: "浙江大学",
      }]
    }
  ],

  initCity: function () {
    for (var i = 0; i < this.data.length; i++) {
      var currCity = document.createElement("option");
      currCity.value = this.data[i].value;
      currCity.innerHTML = this.data[i].name;
      citySelect.appendChild(currCity);
    }
  },

  initSchool: function () {
    schoolSelect.innerHTML = "";
    var currCity = citySelect.value;
    for (var i = 0; i < this.data.length; i++) {
      if (citySelect.value == this.data[i].value) {
        for (var j = 0; j < this.data[i].schools.length; j++) {
          var currSchoolData = this.data[i].schools[j];
          for (var key in currSchoolData) {
            var currSchool = document.createElement("option");
            currSchool.value = key;
            currSchool.innerHTML = currSchoolData[key];
            schoolSelect.appendChild(currSchool);
          }
        }
      }
    }
  }
}

citySelect.addEventListener("change", function(){
  initSelect.initSchool();
})

initSelect.initCity();
initSelect.initSchool();


studentRadio.addEventListener("change", function () {
    studentWrapper.style.display = "block";
    nonStudentWrapper.style.display = "none";
})

notStudentRatio.addEventListener("change", function () {
    studentWrapper.style.display = "none";
    nonStudentWrapper.style.display = "block";
})