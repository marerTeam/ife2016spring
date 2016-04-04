/* 
* @Author: liujinyan
* @Date:   2016-04-03 00:42:40
* @Last Modified by:   liujinyan
* @Last Modified time: 2016-04-03 19:55:43
*/

$ = function(id){return document.getElementById(id);};
var list =[];

function addListLeft(){
  var inputValue = $("inputText").value;
  if(validate(inputValue)){
    list.unshift(inputValue);
    return;
  }
  alert("格式有误!");
}

function addListRight(){
  var inputValue = $("inputText").value;
  if(validate(inputValue)){
    list.push(inputValue);
    return;
  }
  alert("格式有误!");
}

function delListLeft(){
   var leftValue= list.shift();
   alert("删除了："+leftValue);
}

function delListRight(){
  var rightValue= list.pop();
  alert("删除了："+rightValue);

}

function delChild(targetId){
  var index = targetId.replace("child-","");
  list.splice(index,1);
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
      listChild.style.width = "50px";
      listChild.style.height = "25px";
      listChild.style.display = "inline-block";
      listChild.style.color = "white";
      listChild.style.marginLeft ="20px";
      listChild.style.background = "red";
      listChild.style.border = "1px solid #ccc";
      listChild.style.textAlign = "center";
      listChild.innerHTML = list[i]+"";
      listWarp.appendChild(listChild);
    }
    listElement.appendChild(listWarp);
  }
}
//防止快速点击导致多个事件冲突。
//将事件集中管理，最后更新显示列表。
function clickManager(e){
  var targetId = e.target.id;
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
    default:
      if(targetId.indexOf("child-") != -1){
        delChild(targetId);
      }
    break;
  }
  renderList();
}
//校验
function validate(str){
  return /^[1-9]\d*$/.test(str);
}
//添加冒泡事件
function init(){
  var formTask18 = $("form-taks18")
  if (typeof document.addEventListener != "undefined") { 
        formTask18.addEventListener("click",clickManager,false); 
  } else { 
        formTask18.attachEvent("onclick",clickManager); 
  }
}
window.onload = init;