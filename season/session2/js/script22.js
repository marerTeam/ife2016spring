window.onload = function(){
	function $(obj){
		return document.getElementById(obj);
	}
	//前序遍历
	function preOrder(node){
		if(node != null){
			arr.push(node);
			preOrder(node.firstElementChild);
			preOrder(node.lastElementChild);
		}
		
	}
	//中序遍历
	function inOrder(node){
		if(node != null){
			inOrder(node.firstElementChild);
			arr.push(node);
			inOrder(node.lastElementChild);
		}
	}
	//后序遍历
	function postOrder(node){
		if(node != null){
			postOrder(node.firstElementChild);
			postOrder(node.lastElementChild);
			arr.push(node);
			
		}
	}
	//动画效果
	function animation(arr){
		clearInterval(t);
		var eles = document.getElementsByTagName('*');
		for(var k = 0;len = eles.length,k<len;k++){
			eles[k].style.background = '#fff';
		}
		var i = 0;
		t = setInterval(function(){
			if(i>0){
				arr[i-1].style.background = '#fff';
			}		
			if(i == arr.length){
				clearInterval(t);
			}else{
				arr[i].style.background = 'red';
				i++;
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
	
	var rootObj = $("root");
	var t = null;
	addHandler($("preOrder"),'click',function(){
		arr=[];
		preOrder(rootObj);
		animation(arr);
	});
	addHandler($("inOrder"),'click',function(){
		
		arr=[];
		inOrder(rootObj);
		animation(arr);
	});
	addHandler($("postOrder"),'click',function(){
	
		arr=[];
		postOrder(rootObj);
		animation(arr);
	});
}
