var expData = {
  head: ["姓名", "年龄", "俱乐部", "球衣号码"],
  sortable: [0, 1, 0, 1],
  data: [{
      "姓名": "C罗",
      "年龄": 32,
      "俱乐部": "皇家马德里",
      "球衣号码": 7
    },
    {
      "姓名": "梅西",
      "年龄": 30,
      "俱乐部": "巴塞罗那",
      "球衣号码": 10
    },
    {
      "姓名": "兰帕德",
      "年龄": 39,
      "俱乐部": "切尔西",
      "球衣号码": 8
    },
    {
      "姓名": "伊布",
      "年龄": 36,
      "俱乐部": "曼联",
      "球衣号码": 9
    },
    {
      "姓名": "内马尔",
      "年龄": 25,
      "俱乐部": "巴塞罗那",
      "球衣号码": 11
    },
    {
      "姓名": "法布雷加斯",
      "年龄": 30,
      "俱乐部": "切尔西",
      "球衣号码": 4
    },
    {
      "姓名": "阿扎尔",
      "年龄": 26,
      "俱乐部": "切尔西",
      "球衣号码": 10
    },
  ],
  bFroze: true,
  bSort: true,
}

var renderer = new Render(document.getElementById("rooter1"), expData);
var controller = new Controller(document.getElementById("rooter1"), expData, renderer);

// var renderer = new Render(document.getElementById("rooter2"), expData);
// var controller = new Controller(document.getElementById("rooter2"), expData, renderer);

// var renderer = new Render(document.getElementById("rooter3"), expData);
// var controller = new Controller(document.getElementById("rooter3"), expData, renderer);