var Controller = function (root, json, renderer) {
  var thead = root.querySelectorAll("thead tr th");
  var sortable = json.sortable;
  var that = this;
  //set sort click
  sortable.forEach(function (item, index, array) {
    var currArrow = thead[index].getElementsByTagName("img")[0];
    var currQuery = thead[index].getElementsByTagName("span")[0];
    if (currArrow !== undefined) {
      currArrow.addEventListener("click", function () {
        json.data.currQuery = currQuery.innerHTML;
        that.sortData(item, json.data);
        //render body again
        renderer.renderRow();
      })
    }
  });
  //set freeze
  var table = thead.parentNode;
  this.freezeHead(root.getElementsByTagName("table")[0]);
}

//sort data
Controller.prototype.sortData = function (item, data) {
  // console.log(item.currQuery);
  var bindedSort = sortAlgorithm.bind(data);
  if (data.sortOrder === undefined) {
    data.sortOrder = -1;
  } else {
    data.sortOrder *= -1;
  }
  // console.log()
  data.sort(bindedSort);
  // console.log(data)
}

//sort algorithm
function sortAlgorithm(v1, v2) {
  // console.log(this.currQuery);
  return (v1[this.currQuery] - v2[this.currQuery]) * this.sortOrder;
}

Controller.prototype.freezeHead = function (table) {
  // console.log(thead.parentNode);
  var thead = table.getElementsByTagName("thead")[0];
  var cloneHead = thead.cloneNode(true);
  cloneHead.id = "cloneHead";
  cloneHead.style.display = "none";
  table.insertBefore(cloneHead, thead);


  window.addEventListener("scroll", function () {
    table.isFreezing = table.isFreezing === undefined ? false : table.isFreezing;
    // unfreeze
    if (document.body.scrollTop - table.offsetTop < 0 ||
      document.body.scrollTop - table.offsetTop - table.clientHeight > 0) {
      if (table.isFreezing === true) {
        console.log("out");
        table.isFreezing = false;
        cloneHead.style.display = "none";
        thead.classList.remove("freezed-head");
      }
    } else { //freeze
      if (table.isFreezing === false) {
        table.isFreezing = true;
        console.log("into");
        cloneHead.style.display = "table-header-group";
        //set thead css
        thead.classList.add("freezed-head");
        thead.style.width = document.defaultView.getComputedStyle(cloneHead).getPropertyValue("width");
        thead.style.left = cloneHead.parentNode.offsetLeft + "px";
        // thead.getElementsByTagName("th")[0].style.width = document.defaultView.getComputedStyle(cloneHead.firstChild).getPropertyValue("width");
        console.log(thead.style.left);
      }
    }
  })
}