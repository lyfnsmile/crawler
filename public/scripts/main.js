function timeFormat() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();

    var date = year + "-" + month + "-" + day;
    return date;
}

function getYesterday(date) {
    //date形式  '2016-5-19'
    //特殊情形 '2016-1-1'

    var dateArr = date.split('-');
    var year = dateArr[0],
        month = dateArr[1],
        day = dateArr[2];

    if (month == 1 && day == 1) {
        //表示一年的第一天
        //不考虑2000-01-01这种特殊情形
        year -= 1;
        month = 12;
        var days = new Date(year, month, 0);
        day = days.getDate();
        date = year + '-' + month + '-' + day;
        return date;
    } else if (month != 1 && day == 1) {
        //表示一月的第一天
        month -= 1;
        var days = new Date(year, month, 0);
        day = days.getDate();
        date = year + '-' + month + '-' + day;
        return date;

    } else {
        day = day - 1;
        date = year + '-' + month + '-' + day;

        return date;
    }

}


var date = timeFormat();


function listenscroll() {
    window.onscroll = function() {　　
        //console.log(getScrollHeight(), getScrollTop())
        //判断滚动条的高度，当滚动条的告诉超过视口高度时就显示返回顶部的按钮
        //否则隐藏
        var returnTop = document.getElementsByClassName('returnTop')[0];
        if (getScrollTop() > getWindowHeight()) {
            returnTop.style.display = 'block';
        } else {
            returnTop.style.display = 'none';
        };

        if (getScrollTop() + getWindowHeight() >= getScrollHeight() - 300) {　　　　
            //alert("you are in the bottom!");
            //只能一次发起一次ajax请求　
            window.onscroll = null;
            date = getYesterday(date);
            request(date);

        }
    };
}

listenscroll();

function request(data) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { //先绑定事件后再open
        if (this.readyState === 4 && this.status === 200) {
            //var div=document.createElement('div');
            var daily = document.getElementById('daily');
            var div = document.createElement('div');
            div.innerHTML = this.responseText;
            daily.appendChild(div);

            //每次在请求成功后重新监听window.onscroll事件
            listenscroll();
        }

    };
    xhr.open("get", "http://localhost:1337/news?date=" + date, true);

    //设置请求头的相关参数
    xhr.setRequestHeader("X-Request-With", "XMLHttpRequest");
    xhr.send();
}


//原生ajax请求
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() { //先绑定事件后再open
    if (this.readyState === 4 && this.status === 200) {
        //var div=document.createElement('div');
        var daily = document.getElementById('daily');
        var div = document.createElement('div');
        div.innerHTML = this.responseText;
        daily.appendChild(div);

        var loadMore = document.getElementsByClassName('loadmore');
        loadMore[0].style.display = "block";
    }

};

xhr.open("get", "http://localhost:1337/news?date=" + date, true);

//设置请求头的相关参数
xhr.setRequestHeader("X-Request-With", "XMLHttpRequest");
xhr.send();


//获取滚动条的高度
function getScrollTop() {　　
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;　　
    if (document.body) {　　　　
        bodyScrollTop = document.body.scrollTop;　　
    }
    if (document.documentElement) {　　　　
        documentScrollTop = document.documentElement.scrollTop;　　
    }　　
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
    return scrollTop;
}
//文档的总高度
function getScrollHeight() {　　
    var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;　　
    if (document.body) {　　　　
        bodyScrollHeight = document.body.scrollHeight;　　
    }
    if (document.documentElement) {　　　　
        documentScrollHeight = document.documentElement.scrollHeight;　　
    }　　
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
    return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight() {　
    var windowHeight = 0;　　
    if (document.compatMode == "CSS1Compat") {　　　　
        windowHeight = document.documentElement.clientHeight;　　
    } else {　　　　
        windowHeight = document.body.clientHeight;　　
    }　　
    return windowHeight;
}

function backTop() {
    var scrollTop = getScrollTop();
    var speed = Math.ceil(scrollTop / 10);
    var timer = null;
    //alert(scrollTop);
    timer = setInterval(function() {
        if (document.body.scrollTop == 0) {
            clearInterval(timer);
        } else {
            document.body.scrollTop = document.body.scrollTop - speed;
        }
    }, 30)
};
var returnTop = document.getElementsByClassName('returnTop')[0];
returnTop.addEventListener('click', function() {
    //返回顶部做成一个动画的效果
    backTop()
}, false)


