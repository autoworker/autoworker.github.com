function getStyle(obj,sName){
	return (obj.currentStyle||getComputedStyle(obj,false))[sName];
}
function move(obj,json,options){
	options=options||{};
	options.type=options.type||'ease-out';
	options.time=options.time||800;
	var dis={};
	var start={};
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		if(isNaN(start[name])){
			switch(name){
				case 'width':
					start[name]=obj.offsetWidth;
				break
				case 'height':
					start[name]=obj.offsetHeight;
				break
				case 'top':
					start[name]=obj.offsetTop;
				break
				case 'left':
					start[name]=obj.offsetLeft;
				break
				case 'opacity':
					start[name]=1;
				break
				case 'borderWidth':
					start[name]=0;
				break
			}
		}
		dis[name]=json[name]-start[name];
		var n=0;
	var count=Math.floor(options.time/30);
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			switch(options.type){
				case 'linear': 
					var cur=start[name]+dis[name]*n/count;
				break;
				case 'ease-in': 
					var a=n/count;
					var cur=start[name]+dis[name]*(Math.pow(a,3));
				break;
				case 'ease-out': 
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-Math.pow(a,3));
				break;
			} 
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';
			}
		}
		if(count==n){
			clearInterval(obj.timer);
			options.end&&options.end();
		}
	},30);
	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}