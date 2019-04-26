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
    dots = byId('dots').getElementsByTagName('span'),//按钮组
    menu = byId('menu-content'),
    menuItems = menu.getElementsByClassName('menu-item'),
    subMenu = byId('sub-menu'),
    innerBox = subMenu.getElementsByClassName('inner-box'),
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

    //导航菜单
    //遍历主菜单,绑定事件
    for(var m = 0,menu_length = menuItems.length;m < menu_length;m++)
    {
        //给每一个menu-item定义一个data-index属性
        menuItems[m].setAttribute("data-index",m);
        //给每一个innerBox盒子遍历设置display=none
        menuItems[m].onmouseover = function(){
            var idx = this.getAttribute('data-index');
                //去除subMenu的.hidden,删除隐藏效果
                subMenu.className = 'sub-menu';
                //遍历子菜单,进行display=none设置,同时遍历主菜单background=none
                for(var j = 0;j < menu_length;j++)
                {
                    innerBox[j].style.display = 'none';
                    menuItems[j].style.background = 'none';
                }

                //更改当前选定的主菜单background=rgba,对应的子菜单display=block
                innerBox[idx].style.display = 'block';
                menuItems[idx].style.background = 'rgba(0,0,0,0.2)';

        };
    }

    //离开菜单
    menu.onmouseout = function(){
        subMenu.className = "sub-menu hidden";
    };

    //离开主菜单,进入子菜单,由于两个标签挨着,所以能触发效果
    subMenu.onmouseover = function(){
        this.className = "sub-menu";
    };

    //离开子菜单的时候隐藏子菜单
    subMenu.onmouseout = function(){
        this.className = "sub-menu hidden";
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