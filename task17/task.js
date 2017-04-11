/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function randomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

function renderChart() {
  console.log(pageState.nowGraTime)
  // console.log(pageState.nowSelectCity)
  var attr = pageState.nowGraTime + "Data";
  var heights = chartData[pageState.nowSelectCity][attr];
  // console.log(heights);
  //
  var wrapEle = document.getElementsByClassName("aqi-chart-wrap")[0];
  var wrapWidth = parseInt(window.getComputedStyle(wrapEle).width);
  // console.log(wrapWidth);
  var divWidth = Math.floor(wrapWidth / heights.length);
  var fragmentHTML2 = "";
  for (var i = 0; i < heights.length; i++) {
    var tempHTML = "<div style=\"height:" + heights[i] + "px;width:" + divWidth + "px;background-color:" + randomColor() + ";\"></div>"
    fragmentHTML2 += tempHTML;
  }
  wrapEle.innerHTML = fragmentHTML2;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var newTime;
  // 设置对应数据
  var radioEles = document.getElementsByName("gra-time");
  for (var j = 0; j < radioEles.length; j++) {
    radioEles[j].checked && (newTime = radioEles[j].value);
  }
  // 调用图表渲染函数
  if (newTime != pageState.nowGraTime) {
    pageState.nowGraTime = newTime;
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var newCity;
  // 设置对应数据
  newCity = document.getElementById("city-select").value;
  if (newCity != pageState.nowSelectCity) {
    pageState.nowSelectCity = newCity;
    renderChart();
  }
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radioEles = document.getElementsByName("gra-time");
  for (var i = 0; i < radioEles.length; i++) {
    radioEles[i].onclick = graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var selectEle = document.getElementById("city-select");
  var fragmentHTML = "";
  for (var key in aqiSourceData) {
    var tempHTML = "<option>" + key + "</option>";
    fragmentHTML += tempHTML;
  }
  selectEle.innerHTML = fragmentHTML;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  // for (var i = 0; i < selectEle.childElementCount; i++){
  // console.log(selectEle.childNodes[i])
  selectEle.onchange = citySelectChange;
  // }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for (var key in aqiSourceData) {
    chartData[key] = {};
    var currCityDate = initDate(aqiSourceData[key]);
    for (key2 in currCityDate) {
      currCityDate[key2] = qualityToHeight(currCityDate[key2]);
    }
    chartData[key] = currCityDate;
  }

  // console.log(chartData);
}

//
function initDate(currCityDate) {
  var dayData = [];
  var weekDate = [];
  var monthData = [];
  var weekIndex = 0;
  for (var key in currCityDate) {
    var value = currCityDate[key];
    var currDate = new Date(key.replace(/-/g, "/"));
    var firstDate = new Date("2016-1-1");
    var dayIndex = Math.ceil((currDate - firstDate) / (1000 * 60 * 60 * 24));
    currDate.getDay() == 1 && weekIndex++;
    dayData[dayIndex] = value; //push day
    weekDate[weekIndex] = !(weekDate.hasOwnProperty(weekIndex)) ? value : weekDate[weekIndex] + value; //push week
    var monthIndex = currDate.getMonth();
    monthData[monthIndex] = !(monthData.hasOwnProperty(monthIndex)) ? value : monthData[monthIndex] + value;
  }
  return {
    dayData: dayData,
    weekData: weekDate,
    monthData: monthData
  };
}

function qualityToHeight(currCityDate) {
  var transData = currCityDate;
  var max = Math.max.apply(Math, transData);
  var ratio = 400 / max;
  transData = transData.map(function (element) {
    return Math.floor(element * ratio);
  });
  return transData;
}
/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();