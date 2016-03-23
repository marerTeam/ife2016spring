window.onload = function(){
	function $(obj){
		return document.getElementById(obj);
	}	
	//前序遍历
	function preOrder(node){
		result.push(node);
		nodeContent.push(node.firstChild.nodeValue)//获取当前节点的第一个子文本节点的内容
		var childs = node.children;//只获取元素节点
		for(var j = 0,len = childs.length;j<len;j++){
			preOrder(childs[j]);
		}
	}
	//动画效果
	function animation(arr,content){
		var i = 0;
		t = setInterval(function(){
			if(i>0){
				arr[i-1].style.background = '#fff';
			}		
			if(i == arr.length){
				clearInterval(t);
				if(content != null){
					alert('未找到');
				}
			}else{
				//匹配当前元素内容
				if(nodeContent[i] == content){
					arr[i].style.background = 'yellow';
					clearInterval(t);
				}else{
					arr[i].style.background = 'red';
					i++;
				}
			}		
		},400);

	}
	//事件处理
	function addHandler(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,handler);
		}else{
			element['on'+type] = handler;
		}
	}
	var rootObj = $('root');
	var result = [];
	var nodeContent = [];
	var t = null;
	//开始遍历
	addHandler($("preOrder"),'click',function(){
		result = [];
		clearInterval(t);
		preOrder(rootObj);
		animation(result);
	});
	//查找
	addHandler($("submit"),'click',function(){
		nodeContent = [];//每次点击都清空
		var content = $('content').value;
		if(content){
			preOrder(rootObj);
			animation(result,content);
		}else{
			alert("请输入查找的内容");
		}
	});
	
}