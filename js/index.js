/**
 * Created by lx on 2016/10/1.
 */
$(function () {
    $('.lb-2').hide();//第二个轮播图隐藏
    showText();
    //$('.lb-1').show().addClass('lb1-active');//第二个轮播图隐藏
    $('.dot li').eq(0).css('background', '#fff').siblings().css('background', '#333');//小圆圈活动状态
    $('.dot li').click(function () { //点击时，对应的图片出来
        var idx = $(this).index();
        $('.lb').eq(idx).show().siblings().hide();
        $('.dot li').eq(idx).css('background', '#fff').siblings().css('background', '#333')
    });

    var i = 1;//轮播
    setInterval(function () {
        if (i == 0) {
            $('.lb-1 strong').eq(1).show();
            showText();//出现打字效果
        }
        $('.lb').eq(i).show().siblings().hide();
        $('.dot li').eq(i).css('background', '#fff').siblings().css('background', '#333');
        i++;
        if (i == 2)i = 0;
    }, 6000);
    //打字效果
    function showText() {
        var text = "身份证＋手机号，3分钟极速到账！";
        var j = 1;
        var mytimer = setInterval(function () {
            string = text.substring(0, j);
            $('#ad').html(string);
            if (j > text.length) {
                $('.lb-1 strong').eq(1).hide();
                clearInterval(mytimer);
            }
            j++;
        }, 300);
    }


    //首页起始活动状态
    //$('.sideBar a').eq(0).addClass('side-active').siblings().removeClass('active');
    $('.sideBar a').eq(0).find('span').addClass('side-active');
    $('.navbar-nav li').eq(0).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
//导航栏点击事件
    $('.sideBar a').click(function () {
        var viewH = window.innerHeight;
        var idx = $(this).index();
        $(this).find('span').addClass('side-active').parent().siblings().find('span').removeClass('side-active');
        $('body').animate({'scrollTop': viewH * idx}, 1000, startAnimate(idx));
    });
    $('.navbar-nav li').click(function () {
        var viewH = window.innerHeight;
        var idx = $(this).index();
        $('.sideBar a').eq(idx).find('span').addClass('side-active').parent().siblings().find('span').removeClass('side-active');
        $('body').animate({'scrollTop': viewH * idx}, 1000, startAnimate(idx));
    });
    //滚动屏幕
    var inner=document.querySelector('#scroll-inner').scrollHeight;//804
    //var outer=document.querySelector('.scroll-new').innerHeight;//784
    setInterval(function(){
        var outTop=document.querySelector('.scroll-new').scrollTop+=1;
        //console.log(outTop);//541
        if(outTop>=270){
            document.querySelector('.scroll-new').scrollTop=0;
            //console.log(1)
        }
    },30);

    //sliphover
    $('.parnter').sliphover({
        caption: 'data-caption'
    });
    //点击logo魔法现金回首页
    $('.navbar-brand').click(function () {
        $('body').animate({'scrollTop': 0}, 1000, function () {
            $('.fixed-top').animate({'top': '-80px'});
        })
    });
//滚动翻页
    document.body.addEventListener('wheel', fullpage);
//rainday滴水效果
//    run();
});
//滚动翻页
function fullpage(e) {
    var viewH = window.innerHeight;
    var currentH = document.body.scrollTop;
    var index = parseInt(currentH / viewH);
    if (e.deltaY > 0) {//向下翻页
        console.log('向下' + index);
        $('.sideBar a').eq((index+1)).find('span').addClass('side-active').parent().siblings().find('span').removeClass('side-active');
        //body相应的向上运动的距离
        $('body').animate({'scrollTop': (viewH * (index + 1))}, 1000, function () {
            //固定的滚动条出现，同时，相应的活动状态
            $('.fixed-top li').eq((index + 1)).find('a').addClass('active').parent().siblings().find('a').removeClass('active')
            $('.fixed-top').stop().animate({'top': '0px'}, 500);
            startAnimate((index + 1));
        });
    }
    else {//向上翻页
        console.log('向上' + index);
        $('.sideBar a').eq((index-1)).find('span').addClass('side-active').parent().siblings().find('span').removeClass('side-active');
        if (index != 0) {
            $('body').animate({'scrollTop': (viewH * (index - 1))}, 1000, function () {
                $('.fixed-top li').eq(index - 1).find('a').addClass('active').parent().siblings().find('a').removeClass('active')
                startAnimate((index - 1));
            });
        }
    }
}
//每次进入该页面出现动画
function startAnimate(index) {
    if (index == 1) {//每次向下滑动到该页面，火箭升空
        $('.rocket').addClass('rocket-up');
        $('.alading-icon').addClass('alading-ro')
    } else {
        $('.rocket').removeClass('rocket-up');
        $('.alading-icon').removeClass('alading-ro')
    }
    if (index == 2) {//每次向下滑动到该页面，摇晃手机
        $('.iphone').addClass('shake');
        $('.inner3 ul').addClass('show-ewm')
        $('.inner3 .sub-text').addClass('p-show')
    } else {
        $('.iphone').removeClass('shake');
        $('.inner3 ul').removeClass('show-ewm')
        $('.inner3 .sub-text').removeClass('p-show')
    }
    if (index == 5) {//每次向下滑动到该页面，合作伙伴旋转出现
        $('.parnter .col-sm-3').addClass('parnter-show');
    } else {
        $('.parnter .col-sm-3').removeClass('parnter-show');
    }
    if (index == 6) {//每次向下滑动到该页面，联系信息出现
        $('#contact .col-sm-4').addClass('contact-show');
    } else {
        $('#contact .col-sm-4').removeClass('contact-show');
    }
}
//rainday
/*function run() {
    var image = document.getElementById('background');
    image.onload = function () {
        var engine = new RainyDay({
            image: this
        });
        engine.rain([[3, 2, 2]], 100);
    };
    image.crossOrigin = 'anonymous';
    image.src = 'http://i.imgur.com/U1Tqqdw.jpg';
    //image.src = './src/bg5.jpg';
}*/

/*百度地图*/

//创建和初始化地图函数：
function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMarker();//向地图中添加marker
}

//创建地图函数：
function createMap(){
    var map = new BMap.Map("ditu");//在百度地图容器中创建一个地图
    var point = new BMap.Point(121.412002,31.182487);//定义一个中心点坐标
    map.centerAndZoom(point,16);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:0});
    map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_TOP_RIGHT});
    map.addControl(ctrl_sca);
}

//标注点数组
var markerArr = [{title:"魔法现金",content:"3分钟申请，极速放款",point:"121.409253|31.179769",isOpen:0,icon:{w:23,h:25,l:0,t:21,x:9,lb:12}}
];
//创建marker
function addMarker(){
    for(var i=0;i<markerArr.length;i++){
        var json = markerArr[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0,p1);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point,{icon:iconImg});
        var iw = createInfoWindow(i);
        var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
            borderColor:"#808080",
            color:"#333",
            cursor:"pointer"
        });

        (function(){
            var index = i;
            var _iw = createInfoWindow(i);
            var _marker = marker;
            _marker.addEventListener("click",function(){
                this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open",function(){
                _marker.getLabel().hide();
            })
            _iw.addEventListener("close",function(){
                _marker.getLabel().show();
            })
            label.addEventListener("click",function(){
                _marker.openInfoWindow(_iw);
            })
            if(!!json.isOpen){
                label.hide();
                _marker.openInfoWindow(_iw);
            }
        })()
    }
}
//创建InfoWindow
function createInfoWindow(i){
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
    return iw;
}
//创建一个Icon
function createIcon(json){
    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
    return icon;
}

initMap();//创建和初始化地图






