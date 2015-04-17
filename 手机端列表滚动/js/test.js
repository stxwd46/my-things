var PAGE = 1; //初始化页数
var PAGESIZE = 5; //每页展示几条数据

var $list = $('#list'); //列表

var preRemoveArray = []; //被移除的当前页面之前的页面
var nextRemoveArray = []; //被移除的当前页面后面的页面

var init = function() {
    initPage();
    initEvent();
};

var initPage = function() {
    renderData();
};

var initEvent = function() {
    var $page;
    var length;
    window.onscroll = function() {
        if (isTop()) {
            if (preRemoveArray[0]) {
                length = preRemoveArray.length;
                $page = $($('.page')[$('.page').length - 1]); //获取当前列表中显示的最后一页
                nextRemoveArray.push($page[0].outerHTML); //将最后一页内容数组
                $list.prepend(preRemoveArray.pop(length - 1)); //将上一页内容添加进列表
                document.body.scrollTop = document.body.scrollTop + $($('.page')[0]).height(); //设置滚动条位置
                $page.remove(); //移除最后一页
            }
        } else if (isBottom()) {
            $page = $($('.page')[0]); //获取当前列表中显示的第一页
            preRemoveArray.push($page[0].outerHTML); //将第一页内容数组

            if (nextRemoveArray[0]) { //如果已经浏览过下面的内容
                length = nextRemoveArray.length;
                $list.append(nextRemoveArray.pop(length - 1)); //将下一页内容添加进列表
            } else { //如果没有浏览过下面的内容
                renderSinglePage();
            }

            document.body.scrollTop = document.body.scrollTop - $page.height(); //设置滚动条位置
            $page.remove(); //移除第一页
        }
    };
};

var renderData = function() {
    var innerHTML = '';

    //我设定它永远只显示两页，所以一开始先加载两页数据出来
    for (var i = 0; i < 2; i++) {
        innerHTML += getData();
    }

    $list.append(innerHTML);
};

var renderSinglePage = function() {
    var innerHTML = '';
    innerHTML += getData();
    $list.append(innerHTML);
};

var getData = function() {
    var innerHTML = '';
    innerHTML += '<div class="page page-' + PAGE + '">';

    for (var i = 0; i < PAGESIZE; i++) {
        innerHTML += '<li>' + PAGE + '</li>'; //为方便看的清楚，我们给每行数据标记它是属于第几页的
    }

    innerHTML += '</div>';
    PAGE++;

    return innerHTML;
};

var isBottom = function() {
    return document.body.scrollTop + window.screen.height == document.body.clientHeight;
};

var isTop = function() {
    return document.body.scrollTop === 0;
};

init();