var expData = {
    head: ["姓名", "年龄", "俱乐部", "球衣号码"],
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
    ],
    bFroze: true,
    bSort: true,
    headColor: "default"
}

var renderer = new Render(document.getElementById("rooter1"), expData);
var controller = new Controller(document.getElementById("rooter1"), expData, renderer);