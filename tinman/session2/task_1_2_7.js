/* 
* @Author: liujinyan
* @Date:   2016-04-03 00:42:40
* @Last Modified by:   liujinyan
* @Last Modified time: 2016-04-04 03:53:47
*/
$ = function(id){return document.getElementById(id);};
var list =[];
var timer;
var nowIndex;
//防止快速点击导致多个事件冲突。
//将事件集中管理，最后更新显示列表。
//可用回调函数来处理
function clickManager(e){
  var formTask19 = $("form-taks19");
  formTask19.disabled = true;
  var targetId = e.target.id;
  window.clearInterval(timer);
  switch (targetId){
    case "leftIn":
      addListLeft();
    break;
    case "rightIn":
      addListRight();
    break;
    case "leftOut":
      delListLeft();
    break;
    case "rightOut":
      delListRight();
    break;
    case "sortList":
      sortList();
    break;
    case "randomList":
      randomList();
    break;
    default:
      if(targetId.indexOf("child-") != -1){
        delChild(targetId);
      }
    break;
  }
  renderList();
  formTask19.disabled = false;
}

//渲染列表
function renderList(){
  var listElement = $("list");
  var listWarp = document.createElement("div");
      listElement.innerHTML = "";
  if(list.length>0){
      listElement.innerHTML = "";
    for(var i = 0; i < list.length ;i++ ){
      var listChild = document.createElement("div");
      listChild.id = "child-"+length;
      listChild.style.position = "relative";
      listChild.style.top = (130-list[i]*2)+"px";
      listChild.style.width = "12px";
      listChild.style.height = list[i]*2;
      listChild.style.display = "inline-block";
      listChild.style.color = "white";
      if(i == nowIndex || i == (nowIndex+1)){
        listChild.style.background = "#1685a9";
      }else{
        listChild.style.background = "#ff4124";
      }
      listChild.style.border = "1px solid #ccc";
      listChild.style.fontSize = "8px";
      listChild.style.textAlign = "center";
      listChild.innerHTML = list[i]+"";
      listWarp.appendChild(listChild);
    }
    listElement.appendChild(listWarp);
  }
}
//左添加按钮事件
function addListLeft(){
  var inputValue = $("inputText").value;
  if(list.length>59){
    alert("请删除元素后，再增加!");
    return;
  }
  if(validate(inputValue)){
    list.unshift(inputValue);
    return;
  }
  alert("请输入10-60之间的数字!");
}
//右添加按钮事件
function addListRight(){
  var inputValue = $("inputText").value;
  if(list.length>59){
    alert("请删除元素后，再增加!");
    return;
  }
  if(validate(inputValue)){
    list.push(inputValue);
    return;
  }
  alert("请输入10-60之间的数字!");
}
//左删除按钮事件
function delListLeft(){
   var leftValue= list.shift();
   alert("删除了："+leftValue);
}
//右删除按钮事件
function delListRight(){
  var rightValue= list.pop();
  alert("删除了："+rightValue);
}
//点击删除元素事件
function delChild(targetId){
  var index = targetId.replace("child-","");
  list.splice(index,1);
}
//排序元素事件
function sortList(){
var i = 0;
var j = 0;
var formTask19 = $("form-taks19");
timer = setInterval(function (){
  nowIndex = j;
  if(list[j+1]<list[j]){
    var tmp = list[j];
    list[j] = list[j+1];
    list[j+1] = tmp;
  }
  renderList();
  //console.log(i+":"+j);
  if (i == (list.length-1) && j == (list.length-1)){ 
    window.clearInterval(timer);
  }
  if(j==(list.length-1)){
    i++;
    j=0;
  }else{
    j++;  
  }
  }, 25);
}



 //var handler = setInterval("alladdroleshouquanusers()",1000);
 //clearInterval(handler);//关闭定时

//随机生成元素按钮事件
function randomList(){
  var listTmp = [];
  for(var i=0 ;i<60;i++){
    listTmp.push(Math.round(Math.random()*50,0)+10);
  }
  list = listTmp;
}
//校验输入
function validate(str){
  if(/^[1-9]\d*$/.test(str)){
    if(str>=10 && str<=60){
      return true;
    }else{
      return false;
    }
  }
}
//添加冒泡事件
function init(){
  var formTask19 = $("form-taks19");
  if (typeof document.addEventListener != "undefined") { 
        formTask19.addEventListener("click",clickManager,false); 
  } else { 
        formTask19.attachEvent("onclick",clickManager); 
  }
}
window.onload = init;