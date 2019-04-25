//id获取节点
function byId(id)
{
    return typeof (id) === 'string' ? document.getElementById(id) : id;
}
//全局变量
var index = 0,//动态变换的索引
    pics = byId('banner').getElementsByTagName('div'),//图片组
    prev = byId('prev'),
    next = byId('next'),
    len = pics.length,//图片组长度
    dots = byId('dots').getElementsByTagName('span');//按钮组
    timer = null;//定时器
//默认使用的函数
function slideImg()
{
    var main = byId('main');

    //滑过清楚定时器,离开继续
    main.onmouseover = function(){
        if (timer) clearInterval(timer);
    };

    //离开的时候添加定时器
    main.onmouseout = function(){
        timer = setInterval(function(){
            index++;
            if(index >= len){
                index = 0;
            }
            //切换图片
            changeImg();
        },1000);
        //遍历所有span,并且绑定点击切换图片事件
        for (var d = 0;d < len;d++)
        {
            dots[d].id = d;
            dots[d].onclick = function(){
                index = this.id;
                changeImg();
            };
        }
    };

    //自动在main上触发鼠标离开事件
    main.onmouseout();

    //下一张
    next.onclick = function(){
        index++;
        if (index >= len) index=0;
        changeImg();
    };

    //上一张
    prev.onclick = function(){
        index--;
        if( index < 0) index=len-1;
        changeImg();
    };
}
//切换图片
function changeImg(){
    for (var i=0;i < len; i++)
    {
        pics[i].style.display = 'none';
        dots[i].className = '';
    }
    pics[index].style.display = 'block';
    dots[index].className = 'active';
}
//自动加载的函数
slideImg();