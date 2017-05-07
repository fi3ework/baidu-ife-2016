var Controller = function(root, json, renderer){
  var thead = root.querySelectorAll("thead tr th");
  var that = this;
  thead.forEach(function(item, index, array) {
    item.addEventListener("click", function(){
      json.data.currQuery = item.innerHTML;
      that.sortData(item, json.data);
      //render body again
      renderer.renderRow();
    })
  });
}

Controller.prototype.sortData = function(item, data){
  // console.log(item.currQuery);
  var bindedSort = sortAlgorithm.bind(data);
  data.sort(bindedSort);
  console.log(data)
}

function sortAlgorithm(v1, v2){
  console.log(this.currQuery);
  return (v1[this.currQuery] - v2[this.currQuery]);
}
