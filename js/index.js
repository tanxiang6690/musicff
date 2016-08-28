$(function(){

	//播放列表
    var musics=[
        {src:'medio/1.mp3',name:'对候鸟的思念',artistan:'佚名',  duration:'02:10'},
        {src:'medio/2.mp3',name:'空灵的寂寞',  artistan:'李鑫',  duration:'02:58'},
        {src:'medio/3.mp3',name:'只愿有你',    artistan:'谭翔',  duration:'04:20'},
        {src:'medio/4.mp3',name:'青春年华',    artistan:'张宇豪',duration:'02:13'},
        {src:'medio/5.mp3',name:'丑八怪',      artistan:'张宇豪',duration:'03:03'},
        {src:'medio/6.mp3',name:'你是我的眼',  artistan:'赵强',  duration:'05:09'},
        {src:'medio/7.mp3',name:'我会好好的',  artistan:'谭翔',  duration:'04:12'},
        {src:'medio/8.mp3',name:'我会好好的',  artistan:'李鑫',  duration:'00:31'},
        {src:'medio/9.mp3',name:'寂寞沙洲冷',  artistan:'张宇豪',duration:'04:13'}
    ]
    $(musics).each(function(i,v){
    	$('<li class="" data-id="'+i+'"><span class="geMing" title="'+v.name+'">'+v.name+'</span><span class="geChangJia" title="'+v.artistan+'">'+v.artistan+'<div class="operate"><div class="delete"></div><div class="add"></div><div class="loading"></div></div></span><span class="shiJian">'+v.duration+'</span></li>').appendTo(".play-list ul"); 
    })
   var currentIndex;
    $(".play-list li").on('click',function(){
    	$(".play-list li").removeClass("boFang");
    	$(this).addClass("boFang");
    	currentIndex=parseInt($(this).attr('data-id'));
    	audio.src=musics[currentIndex].src;
    	audio.play();
    })
    //切到下一首歌
    $(".mini-play-left-listTu1-gouNeng3").on('click',function(){
    	if(currentIndex==undefined){
    		currentIndex=0;
    	}
    	currentIndex+=1;
    	if(currentIndex>=musics.length){
    		currentIndex=0;
    	}
    	audio.src=musics[currentIndex].src;
    	audio.play();
    })

    //切到上一首歌
    $(".mini-play-left-listTu1-gouNeng1").on('click',function(){
    	if(currentIndex==undefined){
    		currentIndex=0;
    	}
    	currentIndex-=1;
    	if(currentIndex<0){
    		currentIndex=musics.length-1;
    	}
    	audio.src=musics[currentIndex].src;
    	audio.play();
    })
  
	var audio=$("#audio").get(0);//DOM对象；
	var $audio=$("#audio");//jQuery对象

	//播放暂停键   添加点击事件
	$(".mini-play-left-listTu1-gouNeng2").on("click",function(){
		//暂时实现功能，不会实现UI；
		if(audio.paused){
            if(currentIndex==undefined){
                currentIndex=0;
            }
            audio.src=musics[currentIndex].src;
			audio.play();
		}else{
			audio.pause();
		}
	})


	$audio.on("play",function(){
		$(".mini-play-left-listTu1-gouNeng2").addClass("zanTingJian");
		$(".play-list ul li").removeClass("boFang").eq(currentIndex).addClass("boFang");
		var huan=musics[currentIndex];
		$(".geQuMingZi").text(huan.name);
		$(".yiShuJia").text(huan.artistan);
		$(".updataTime").text(huan.duration);
        //默认是多少首歌曲；
        $(".mini-play-right-musicNum").text(musics.length);
	})

	$audio.on("pause",function(){
		$(".mini-play-left-listTu1-gouNeng2").removeClass("zanTingJian");
	})

	//音量的控制；
    var $volume=$(".mini-play-left-listTu1-gouNeng5");
    $volume.on("click",function(e){
    	audio.volume=e.offsetX/$(this).width();
    	console.log(audio.volume)
    })
    $audio.on("volumechange",function(){
    	if(audio.volume===0){
	   		$volume.addClass("laba");
	   	}else{
	   		$volume.removeClass("laba");
	   	}
    }) 	
   
	//小圆点的拖动
	$(".yinLiang2").on("mousedown",function(e){
		e.stopPropagation();
		$(document).on("mouseover",function(e){
			var left=e.pageX-$(".mini-play-left-listTu1-gouNeng6").offset().left;
			var v=left/$(".mini-play-left-listTu1-gouNeng6").width();
			v=(v>1)?1:v;
			v=(v<0)?0:v;
			audio.volume=v;
		})
	})
	$(document).on("mouseup",function(e){
		$(document).off("mousemove");
	})

	//最下面进度条的控制；
	var $geQuTiao=$(".geQuTiao");
	var $geQuJinDu=$(".geQuJinDu");
	var $ziDian=$(".ziDian");
	$audio.on('timeupdata',function(){
		var v=(audio.currentTime/audio.duration)*$geQuTiao.width();
		$geQuJinDu.width(v);//width()里面传参可以实时的获取到位置；
		$ziDian.css({left:v-$ziDian.width()/2});
	})
	$geQuTiao.on('click',function(e){
		audio.currentTime=e.offsetX/$(this).width()*audio.duration;
	})
	$ziDian.on('click',function(e){
		e.stopPropagation();
	})
    $ziDian.on('mouseover',function(e){
        e.stopPropagation();
    })
	$ziDian.on('mousedown',function(e){
		var left=$geQuTiao.offset().left;
		var width=$geQuTiao.width();
		$(document).on('mousemove',function(e){
			var v=(e.pageX-left)/width*audio.duration;
			audio.currentTime=v;
		})
	})
	$ziDian.on('mouseup',function(){
		$(document).off('mousemove');
	})
                                          
	//进度条上面的时间的控制；
    $geQuTiao.on('mousemove',function(e){
    	$(".tips").css({
    		display:'block',
    		left:e.offsetX-$(".tips").width()/2
    	})
    	var time=e.offsetX/$(this).width()*audio.duration;
    	var min=parseInt(time/60);
    	var seconeds=parseInt(time%60);
    	min=min<10?'0'+min:min;
    	seconeds=seconeds<10?'0'+seconeds:seconeds;
    	$(".tips").html(min+":"+seconeds);
    })
    $geQuTiao.on("mouseout",function(){
    	$(".tips").css({
    		display:'none'
    	})
    })
    
    //清空列表
    $(".clear-list").on('click',function(){
    	$(".play-list ul li").empty();
    })
    $(".delete").on("click",function(){
    	$(this).closest("li").empty();
    })
	//循环的部分开始：
    $(".mini-play-left-listTu1-gouNeng4").on('click',function(){
    	$(".xunHuan").css('display','block');
    	$(".xunHuan").each(function(){
    		$(".xunHuanBox").on('click',function(){
    			$(".xunHuan").css('display','none');
    		})
    	})
        $(".xunHuanBox3").on('click',function(){
            if(currentIndex==undefined){
                currentIndex=0;
            }
            audio.src=musics[currentIndex].src;
            audio.play();
            $(".mini-play-left-listTu1-gouNeng4").addClass("danQuXuanHuan");
        })
        $(".xunHuanBox2").on('click',function(){
            if(currentIndex==undefined){
                currentIndex=0;
            }
            audio.src=musics[currentIndex].src;
            audio.play();
            $(".mini-play-left-listTu1-gouNeng4").addClass('suiJiBoFang');
        })
        $(".xunHuanBox1").on('click',function(){
            if(currentIndex==undefined){
                currentIndex=0;
            }
            currentIndex+=1;
            if(currentIndex>=musics.length){
                currentIndex=0;
            }
            audio.src=musics[currentIndex].src;
            audio.play();
            $(".mini-play-left-listTu1-gouNeng4").addClass('shunXuBoFang');
        })
    })
    // 单曲播放开始
})

/*1, 空点播放
  2，NaN:NaN;
  3，清空列表
  4，
*/