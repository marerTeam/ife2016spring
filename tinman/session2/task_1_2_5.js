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
  //想改成text 而非 index 想想算了，无论怎样都要处理 只是位置不同罢了
  //设置默认为0 默认按天
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(){
  //获得列表数据
  var chartWarp = document.getElementsByClassName("aqi-chart-wrap");
  var cityElement = document.getElementById("city-select");
  var cityName = cityElement.options[pageState["nowSelectCity"]].text;
  var dateType = pageState["nowGraTime"];
  var maxValue = chartData[cityName][dateType]["maxValue"];
  var countValue = chartData[cityName][dateType]["countValue"];
  var contentWarp = document.createElement("div");
  var content = document.createElement("div");
  var leftLine = document.createElement("div");
  var underLine = document.createElement("div");
  var widthValue = 0;
  var baseValue = 0;
  var count = 0;
  //绘制元素
  chartWarp[0].innerHTML="";
  chartWarp[0].cssText = "overflow:auto;";
  contentWarp.style.cssText = "height: 650px;width: 1229px; overflow:auto;position:absolute;left:47px;";
    switch(dateType)
    {
      case "day":
        widthValue = ((countValue*25)+50);
        baseValue = 25;
        content.style.cssText = "width: "+widthValue+"px;height: 592px; overflow:auto;position:absolute;";
        leftLine.style.cssText = "position:realtive;float:left;border-right: 1px solid #ccc;width: 46px;height: 550px; margin: 0 auto;";
        underLine.style.cssText = "border-top: 1px solid #ccc;width: "+widthValue+"px;height: 40px; margin: 0 auto;";
      break;
      case "week":
        widthValue = ((countValue*100)+50);
        baseValue = 100;
        content.style.cssText = "width: "+widthValue+"px;height: 590px;";
        leftLine.style.cssText = "position:realtive;float:left;border-right: 1px solid #ccc;width: 46px;height: 550px; margin: 0 auto;";
        underLine.style.cssText = "border-top: 1px solid #ccc;width: "+widthValue+"px;height: 40px; margin: 0 auto;";
      break;
      case "month":
        widthValue = ((countValue*200)+50);
        baseValue = 200;
        content.style.cssText = "width: "+widthValue+"px;height: 590px;";
        leftLine.style.cssText = "position:realtive;float:left;border-right: 1px solid #ccc;width: 46px;height: 550px; margin: 0 auto;";
        underLine.style.cssText = "border-top: 1px solid #ccc;width: "+widthValue+"px;height: 40px; margin: 0 auto;";
      break;
    }

  //添加纵向标尺  
  for (var i = 1; i < 11; i++) {
      var leftLineChild = document.createElement("div");
          if(widthValue < 1260){
            widthValue = 1260;
          }
          leftLineChild.style.width = widthValue+"px";
          leftLineChild.style.height = "50px";
          leftLineChild.style.position = "absolute";
          leftLineChild.style.top = (50 * i) + "px";
          leftLineChild.style.left = "15px";
          leftLineChild.style.zIndex = "-9999"
          if(i == 1){
            leftLineChild.style.borderTop = "1px solid #ccc"
          }
          leftLineChild.style.borderBottom = "1px solid #ccc"
          leftLineChild.innerHTML = '<span style="font-size:12px; color:#666666;text-align: center;"> ' + Math.round(50*(11-i)) + '</span>';
          leftLine.appendChild(leftLineChild);
  }

  chartWarp[0].appendChild(leftLine);
  //应该还需要两个数据，一个是所有元素的最大值 一个是元素数量合计。
  for(var date in chartData[cityName][dateType]){

    if(date !== "maxValue" && date !== "countValue"){
    var line = document.createElement("div");
    var oldStyle = line.style.cssText;
    switch(dateType)
    {
    case "day":
      line.style.cssText = "display: inline-block; *display:inline; *zoom:1; width: 20px; height:"+chartData[cityName][dateType][date]+"px ;margin-left: 5px; margin-top: "+(550-chartData[cityName][dateType][date])+"px ; background: #ff4124;" + oldStyle;
      line["title"] = cityName+" "+ date +" 空气质量指数: " + chartData[cityName][dateType][date];
    break;
    case "week":
      line.style.cssText = "display: inline-block; *display:inline; *zoom:1; width: 80px; height:"+chartData[cityName][dateType][date]+"px ;margin-left: 20px; margin-top: "+(550-chartData[cityName][dateType][date])+"px ;background: #ff4124;" + oldStyle;
      line["title"] = cityName+" 第"+ date +"周 平均空气质量指数: " + chartData[cityName][dateType][date];
    break;
    case "month":
      line.style.cssText = "display: inline-block; *display:inline; *zoom:1; width: 160px; height:"+chartData[cityName][dateType][date]+"px ;margin-left: 40px; margin-top: "+(550-chartData[cityName][dateType][date])+"px  ; background: #ff4124;" + oldStyle;
      line["title"] = cityName+" 第"+ date +"月 平均空气质量指数: " + chartData[cityName][dateType][date];
    break;
    }
    
    //添加横向标尺
    var underLineChild = document.createElement("div");
    underLineChild.style.width = (baseValue*0.8)+"px";
    underLineChild.style.height = "40px";
    underLineChild.style.position = "absolute";
    underLineChild.style.margin = "0 0 0 "+(baseValue*0.2)+"px";
    underLineChild.style.left = (baseValue * count) + "px";
    underLineChild.style.zIndex = "-9999"
    if(count%2===1){
      underLineChild.innerHTML = '<span style="font-size:'+(baseValue/20+7)+'px; color:#666;text-align:center;float:left;line-height:'+(baseValue/20+7)+'px"></br>' + date.replace("2016","").replace("-","").replace("-","") + '</span>';      
    }else{
    underLineChild.innerHTML = '<span style="height:40px;width:'+(baseValue/20+7)+'px;font-size:'+(baseValue/20+7)+'px; color:#666;text-align:center;float:left;line-height:'+(baseValue/20+7)+'px">' + date.replace("2016","").replace("-","").replace("-","") + '</span>';
    }
    underLine.appendChild(underLineChild);
    //添加数据块
    content.appendChild(line);
    count++;
    }

  }
  content.appendChild(underLine);
  contentWarp.appendChild(content);
  chartWarp[0].appendChild(contentWarp);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  var graTimeElements = document.getElementsByName("gra-time");
  var nowValue;
  for(var radio in graTimeElements){
    if(graTimeElements[radio].checked){
      nowValue = graTimeElements[radio].value;
      break;
    }
  }
  if(nowValue != pageState["nowGraTime"]){
  // 设置对应数据
  pageState["nowGraTime"] = nowValue;
  // 调用图表渲染函数
  renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var cityElement=document.getElementById("city-select");
  if(cityElement.selectedIndex != pageState["nowSelectCity"]){
  // 设置对应数据
    pageState["nowSelectCity"] = cityElement.selectedIndex;
  // 调用图表渲染函数
    renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm(){
  var graTime = document.getElementsByName("gra-time");
  for(var i = 0 ; i < graTime.length ; i++){
    graTime[i].onchange = graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector(){
// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cityElement=document.getElementById("city-select");
  for(var cityName in aqiSourceData){
      var cityOption = document.createElement("option");
      cityOption.innerHTML = cityName;
  try{
      cityElement.add(cityOption,null); //除了IE的写法
    }catch(ex){
      cityElement.add(cityOption); //去它的IE兼容
    }
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  cityElement.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // chartData{} 
  // 结构如下{"city":{"dateType(day,week,month)":{dateValue(这里只是注释：1 2 3 week or 1 2 3 月)":"value"}}
  // 不太信任这个无序对象。后来查是hash表遍历时还是有一定顺序的。
  // 如果乱序可以将开始日期和结束日期 之间的日期作为参数循环取数据。然后使用array或自定数组
  var nowcity;
  var dateType;
  var dayList;
  var weekList;
  var monthList;
  var nextDate;
  var cityList = {};
  var sumWeek = 0;
  var sumMonth = 0;
  var dayCountWeek = 0;
  var dayCountMonth = 0;
  var dayMaxValue;
  var weekMaxValue;
  var monthMaxValue;
  var dayCountValue = 1;
  //跨年周有不同的算法，姑且就当作跨年周是第一周。
  var weekCount = 1;
  var dateValue;

    //循环第一层：城市 得到每天的数据
    for(var cityName in aqiSourceData){
      //初始化相关对象
      if(nowcity !== cityName){
         nowcity = cityName;
         dateType = {};
         dayList = {};
         weekList = {};
         monthList = {};
         weekCount = 1;
         dayCountValue = 0;
         dayMaxValue = 0;
         dayMaxValue = 0;
         weekMaxValue = 0;
         monthMaxValue = 0;
      }
      //循环第二层：每天的数据 并计算 周和月 数据
      for(var datStr in aqiSourceData[cityName]){
        //处理每天的数据
        dayList[datStr] = aqiSourceData[cityName][datStr];
        if(dayList[datStr]>dayMaxValue){
          dayMaxValue = dayList[datStr];
        }
        //处理周和月数据
        dateValue = new Date(datStr);

        //累计week数值
        sumWeek += aqiSourceData[cityName][datStr];
        //累计week天数
        dayCountWeek++;
        //如果是一周的最后一天
        if(dateValue.getDay() === 0){
          //计算得出每周数据放入weekList 因为是污染报告向上取整。
          weekList[weekCount] = Math.ceil(sumWeek/dayCountWeek);
          if(weekList[weekCount]>weekMaxValue){
            weekMaxValue = weekList[weekCount];
          }
          //累计有几个周 开始不足1周的按1周计算。
          weekCount++;
          //重新初始化每周累计数值和累计天数
          sumWeek = 0;
          dayCountWeek = 0;
        }

        //累计月数值
        sumMonth += aqiSourceData[cityName][datStr];
        //累计月天数
        dayCountMonth++;
        nextDate = new Date(dateValue.getTime()+86400000);
        if(nextDate.getMonth() !== dateValue.getMonth()){
            //计算出每月数据放入weekList 因为是污染报告向上取整。
            monthList[dateValue.getMonth()+1] = Math.ceil(sumMonth/dayCountMonth);
          if(monthList[dateValue.getMonth()+1]>monthMaxValue){
            monthMaxValue = monthList[dateValue.getMonth()+1];
          }
            //重新初始化每月累计数值和累计天数
            dayCountMonth = 0;
            sumMonth = 0;
        }
        dayCountValue++;
      }

      //处理周不满一周的末尾数据
      if(dateValue.getDay()!== 0){
        weekList[weekCount] = Math.ceil(sumWeek/dayCountWeek);
        //重新初始化每周累计数值和累计天数
          if(monthList[dateValue.getMonth()+1]>weekMaxValue){
            weekMaxValue = monthList[dateValue.getMonth()+1];
          }
        sumWeek = 0;
        dayCountWeek = 0;
      }
      //处理不超过一月的末尾数据
      //
      if(nextDate.getMonth() === dateValue.getMonth()){
        monthList[dateValue.getMonth()+1] = Math.ceil(sumMonth/dayCountMonth);
        //重新初始化每月累计数值和累计天数
        if(monthList[dateValue.getMonth()+1]>monthMaxValue){
            monthMaxValue = monthList[dateValue.getMonth()+1];
        }
        dayCountMonth = 0;
        sumMonth = 0;
      }
      dayList["maxValue"] = dayMaxValue;
      dayList["countValue"] = dayCountValue;
      weekList["maxValue"] = weekMaxValue;
      weekList["countValue"] = weekCount;
      monthList["maxValue"] = monthMaxValue;
      monthList["countValue"] = dateValue.getMonth()+1;
      dateType["day"] = dayList;
      dateType["week"] = weekList;
      dateType["month"] = monthList;
      cityList[cityName] = dateType;
    }

  // 处理好的数据存到 chartData 中
   chartData = cityList;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}
//再次注意这里有坑 那个JS加载 在页面之前 运行起来啥都找不到的。
//要加windows.onload 或者放到页尾去，流行的做法是都放到页尾不管处不处理用不用JQ的ready。
window.onload=init;
