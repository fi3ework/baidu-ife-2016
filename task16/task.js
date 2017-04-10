/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityEle = document.getElementById("aqi-city-input");
var valueEle = document.getElementById("aqi-value-input");
var tableELe = document.getElementById("aqi-table");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var validity = checkValidity(cityEle.value, valueEle.value);
  !validity.nameValidity && alert("name error");
  (validity.nameValidity && !validity.valueValidity) && (alert("value error"));
  if (!(validity.nameValidity && validity.valueValidity)) {
    return;
  }
  aqiData[cityEle.value] = valueEle.value;
}

function checkValidity(name, value) {
  var name = name.trim();
  var value = value.trim();
  var bNameValid = /^[\u4e00-\u9fa5a-zA-Z]+$/.test(name);
  var bValueValid = /^\d+$/.test(value);
  return {
    nameValidity: bNameValid,
    valueValidity: bValueValid
  }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var fragmentHTML = "";
  console.log(aqiData);
  if (Object.getOwnPropertyNames(aqiData).length) {
    console.log("init")
    fragmentHTML += "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
  }

  for(var key in aqiData){
    var currHTML = "<tr><td>" + key + "</td><td>" + aqiData[key] + "</td><td><button class=\"del\">删除</button></td></tr>";
    fragmentHTML += currHTML;
  }

  tableELe.innerHTML = fragmentHTML;
  var dels = document.getElementsByClassName("del");

  // setTimeout("console.log(renderAqiList.dels)", 1000);
  // console.log(dels);
  for (var i = 0; i < dels.length; i++){
    console.log(i);
    dels[i].onclick = delBtnHandle;
  }
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  delete aqiData[this.parentNode.parentNode.firstChild.innerHTML];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  // console.log(document.getElementById("add-btn"));
  document.getElementById("add-btn").onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();