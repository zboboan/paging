/**
 * Created by 大白 on 2017/2/18.
 */

function paging(el){

    var head = document.getElementsByTagName('head')[0];
    var sty =  document.createElement("style"); 

    sty.innerHTML = '.pageNumber{margin-top:30px;}.page{display: inline-block;}.PNP,.pageNumber a{padding:3px 10px;background: #b1dddc;margin-left:5px;border:1px solid #63a5ac;}.pageNumber a.curr{background: #ffe1e4;border:1px solid #c99a9a;}';

    head.appendChild(sty);


    el.innerHTML = '<div class="pageNumber">'+
        '<a class="pageHome" href="javascript:void(0);">首页</a>'+
        '<a class="pageUp" href="javascript:void(0);">上一页</a>'+
        '<div class="page"></div>'+
        '<a class="pageNext" href="javascript:void(0);">下一页</a>'+
        '<a class="pageLast" href="javascript:void(0);">未页</a>'+
    '</div>';
    

    this.pageNumber = el.querySelector('.pageNumber');
    this.page = el.querySelector('.page');

    this.pageIndex = null;

    this.pageHome = el.querySelector('.pageHome');
    this.pageUp = el.querySelector('.pageUp');
    this.pageNext = el.querySelector('.pageNext');
    this.pageLast = el.querySelector('.pageLast');

    this.settings = {
        index:1,
        thisdata : 1,
        url:'javascript:void(0);',
        fu:function(e){
            console.log(e)
        }
    }
}

paging.prototype.init = function (opt){
    var This = this;

    extend(this.settings,opt);

    this.index = this.settings.index;

    this.pageList(this.index,this.settings.thisdata,this.settings.url);
    this.pageHome.onclick = function(){
        This.pageHomeC();
    }

    this.pageLast.onclick = function(){
        This.pageLastC();
    }

    this.pageUp.onclick = function(){
        This.pageUpC();
    }

    this.pageNext.onclick = function(){
        This.pageNextC();
    }
}

paging.prototype.pageList = function(index,ints,url) {
    var int = parseInt(ints);
    var list1 = '';
    var list2 = '';
    var list3 = '';
    var This = this;

    if (int <= 3 && index > 5) {
        if (int == 0) {
            int = 0;
        }
        for (var j = 0; j < 5; j++) {
            list1 += "<a href='"+url+(j + 1)+"' data-index=" + (j + 1) + ">" + (j + 1) + "</a>";
        }
        if (index > 5) {
            list1 += "<span class='PNP'>...</span>";
        }
    } else if (int > 3 && int < index - 2) {
        list1 += "<span class='PNP'>...</span>";
        for (var i = int - 3; i < int - 1; i++) {
            list1 += "<a href='"+url+(i + 1)+"' data-index=" + (i + 1) + ">" + (i + 1) + "</a>";
        }
        list2 = "<a href='"+url+int+"' data-index=" + int + ">" + int + "</a>";
    }
    ;

    if (int < index - 2 && int > 3 && index > 5) {
        list2 = "<a href='"+url+int+"' data-index=" + int + ">" + int + "</a>";
        for (var i = int; i < int + 2; i++) {
            list3 += "<a href='"+url+(i + 1)+"' data-index=" + (i + 1) + ">" + (i + 1) + "</a>";
        }
        list3 += "<span class='PNP'>...</span>";
    } else if (int >= index - 2 || index == 4 || index == 5) {
        var s = 0;
        if (int == index - 2) {
            s = int - 3;
        } else if (int == index - 1) {
            s = int - 4;
        } else if (int >= index) {
            s = index - 5;
        }
        if (s <= 0) {
            s = 0;
        }
        if (index > 5) {
            list3 += "<span class='PNP'>...</span>";
        }

        for (var k = s; k < index; k++) {
            list3 += "<a href='"+url+(k + 1)+"' data-index=" + (k + 1) + ">" + (k + 1) + "</a>";
        }
    }
    this.page.innerHTML = list1 + list2 + list3;

    this.pageIndex = this.page.querySelectorAll('a');

    for (var a = 0; a < this.pageIndex.length; a++) {
        var q = this.pageIndex[a].dataset.index;
        if (q == int) {
            this.pageIndex[a].className = 'curr';
        } else {
            this.pageIndex[a].className = '';
        }
    }
    This.pageClick(this.pageIndex);
};



paging.prototype.pageClick = function (tp){
    var This = this;
    for(var i=0; i<tp.length;i++){
        tp[i].onclick =function () {
            This.pageClickP(this.dataset.index);
        }
    };
};

paging.prototype.pageClickP = function (tp) {
    this.settings.fn(tp);
    
    if (this.settings.thisdata != tp) {
        this.settings.thisdata = tp;
        this.pageList(this.settings.index,tp,this.settings.url);
    }
    
    this.settings.thisdata = tp;
};


paging.prototype.pageHomeC =function(){
    if(this.settings.thisdata != 1){
        this.settings.thisdata = 1;
        this.pageList(this.settings.index,1,this.settings.url);
    };
};

paging.prototype.pageLastC =function(){
    if(this.settings.thisdata != this.settings.index){
        this.settings.thisdata = this.settings.index;
        this.pageList(this.settings.index,this.settings.index,this.settings.url);
    };
};

paging.prototype.pageNextC =function(){
    if(this.settings.thisdata == this.settings.index){
        return;
    }else if(this.settings.thisdata>this.settings.index){
        this.settings.thisdata = this.settings.index-1;
    }
    this.settings.thisdata = parseInt(this.settings.thisdata)+1;
    this.pageList(this.settings.index,this.settings.thisdata,this.settings.url);
};

paging.prototype.pageUpC =function(){
    if(this.settings.thisdata == 1){
        return;
    }else if(this.settings.thisdata<=1){
        this.settings.thisdata = 1;
    }
    this.settings.thisdata = this.settings.thisdata-1;
    this.pageList(this.settings.index,this.settings.thisdata,this.settings.url);
};

function extend(obj1,ojb2) {
    for(var attr in ojb2){
        obj1[attr] = ojb2[attr];
    }
}































