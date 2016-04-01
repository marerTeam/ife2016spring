/* 
* @Author: liujinyan
* @Date:   2016-03-30 19:09:22
* @Last Modified by:   liujinyan
* @Last Modified time: 2016-03-31 17:03:39
*
* aqiData，存储用户输入的空气指数数据
* 示例格式：
* aqiData = {
*    "北京": 90,
*    "上海": 40
* };
*/
//报告有坑...这其实是创建了一个空“键值对”对象...而不是数组 {} 是new object();的简写
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityInput = document.getElementById("aqi-city-input").value.replace(" ","");
    var valueInput = document.getElementById("aqi-value-input").value.replace(" ","");
    //正则 匹配中文英文字符
    var patternCity = /^[A-Za-z\u4e00-\u9fa5]+$/;
    //正则匹配开头非零数字
    var patternValue = /^[1-9]+[0-9]*]*$/;
    if(patternCity.test(cityInput) && patternValue.test(valueInput)){
        //存储空气指数数据到aqiData
        aqiData[cityInput] = valueInput;
    }else{
        alert("输入错误，请检查后再次添加！");
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList(){
    var tbale = document.getElementById("aqi-table");
    if(tbale.hasChildNodes()){
        //删除所有子元素...
        tbale.innerHTML = "";
    }
    //创建表格样式
        //IE8以下不支持分号所以拼上原来的Style
        //var oldStyle = tbale.style.cssText;
                                                         //这里的分号
        //tbale.style.cssText="border:1px #f00 solid;color:#0f0"+oldStyle;
        //改用css了...
    //创建表头
    tableTitleInit();
    //遍历aqiData创建表格内容
    for(var attName in aqiData){
        if (aqiData.hasOwnProperty(attName)) {
            //创建表格元素变量
            var trContent = document.createElement("tr");
            var tdCity = document.createElement("td");
            var tdValue = document.createElement("td");
            var tdBtn = document.createElement("td");
            var delBtn = document.createElement("Button");
            //初始bt化子元素内容
            delBtn.innerHTML = "删除";
            //初始td化子元素内容
            tdCity.innerHTML = attName;
            tdValue.innerHTML = aqiData[attName];
            tdBtn.appendChild(delBtn);
            //初始tr化子元素内容
            trContent.appendChild(tdCity);
            trContent.appendChild(tdValue);
            trContent.appendChild(tdBtn);
            tbale.appendChild(trContent);
            //console.log(attName,":",aqiData[attName]);
        };
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle(){
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    // do sth.
    //获取城市输入和数值输入
    console.log(e.target.nodeName+"被点击了");
    /*判断目标事件是否为BUTTON*/
    if(e.target&&e.target.nodeName.toUpperCase()=="BUTTON"){
        //因为是自己创建的元素所以不用理会text元素
        //否则可能childNodes取到的第一个元素是text节点
        var trNode = e.target.parentNode.parentNode;
        if(trNode!=null&&trNode.nodeName.toUpperCase()=="TR"){
            var cityName = trNode.childNodes[0].innerHTML;
            delete aqiData[cityName];
        }
    }
    renderAqiList();    
}
function tableTitleInit(){
    //表头初始化
    var tbale = document.getElementById("aqi-table");

    var trTitle = document.createElement("tr");
    var tdCityTitle = document.createElement("td");
    var tdValueTitle = document.createElement("td");
    var tdBtnTitle = document.createElement("td");

    tdCityTitle.innerHTML = "城市";
    tdValueTitle.innerHTML = "空气指数";
    tdBtnTitle.innerHTML = "操作";
    trTitle.appendChild(tdCityTitle);
    trTitle.appendChild(tdValueTitle);
    trTitle.appendChild(tdBtnTitle);
    tbale.appendChild(trTitle);
}   

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var tableNode = document.getElementById("aqi-table");
    if (typeof document.addEventListener != "undefined") { 
        tableNode.addEventListener("click",delBtnHandle,false); 
    } else { 
        tableNode.attachEvent("onclick",delBtnHandle); 
    }
    tableTitleInit();
}
window.onload=init;